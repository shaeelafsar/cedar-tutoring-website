import fs from "node:fs";
import path from "node:path";

import dotenv from "dotenv";
import matter from "gray-matter";
import { z } from "zod";

import {
  homeTestimonialsFrontmatterSchema,
  reviewsPageFrontmatterSchema,
  testimonialSchema,
  testimonialsCollectionFrontmatterSchema,
} from "../src/lib/content/schemas";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env.local");
const HOME_TESTIMONIALS_PATH = path.join(ROOT, "content/pages/home/testimonials.md");
const REVIEWS_COLLECTION_PATH = path.join(ROOT, "content/pages/reviews/testimonials.md");
const REVIEWS_PAGE_PATH = path.join(ROOT, "content/pages/reviews/_page.md");
const HOMEPAGE_GOOGLE_REVIEW_LIMIT = 3;
const GOOGLE_REVIEWS_SOURCE = "google" as const;

const googleReviewSchema = z.object({
  author_name: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().optional().default(""),
  time: z.number().int().nonnegative(),
  profile_photo_url: z.string().optional(),
  relative_time_description: z.string().optional(),
});

const placesDetailsResponseSchema = z.object({
  status: z.string(),
  error_message: z.string().optional(),
  result: z
    .object({
      reviews: z.array(googleReviewSchema).optional(),
    })
    .optional(),
});

type GoogleReview = z.infer<typeof googleReviewSchema>;
type Testimonial = z.infer<typeof testimonialSchema>;

type DryRunOptions = {
  dryRun: boolean;
};

function readEnvFile() {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(
      "Missing .env.local. Copy .env.local.example and set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.",
    );
  }

  dotenv.config({ path: ENV_PATH });

  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    throw new Error(
      "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in .env.local.",
    );
  }

  return { apiKey, placeId };
}

function slugify(value: string) {
  return (
    value
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[-\s]+/g, "-") || "reviewer"
  );
}

function createGoogleReviewId(review: GoogleReview) {
  return `google-${slugify(review.author_name)}-${review.time}`;
}

function relativePath(absolutePath: string) {
  return path.relative(ROOT, absolutePath) || absolutePath;
}

function readFrontmatterFile<T>(filePath: string, schema: z.ZodType<T>) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    data: schema.parse(parsed.data),
    content: parsed.content.trim(),
  };
}

function toMarkdown(body: string, data: object) {
  return matter.stringify(`${body.trim()}\n`, data);
}

function formatAverageRating(testimonials: Testimonial[]) {
  const average =
    testimonials.reduce((total, testimonial) => total + testimonial.rating, 0) /
    testimonials.length;

  return `${average.toFixed(1)} / 5`;
}

function mapGoogleReviewToTestimonial(review: GoogleReview): Testimonial {
  const quote = review.text.trim();

  return testimonialSchema.parse({
    id: createGoogleReviewId(review),
    quote,
    author: review.author_name,
    relation: "Google review",
    location: "Cedar Tutoring Academy",
    rating: review.rating,
    source: GOOGLE_REVIEWS_SOURCE,
    time: review.time,
    profilePhotoUrl: review.profile_photo_url,
  });
}

async function fetchGoogleReviews(apiKey: string, placeId: string) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Places request failed with ${response.status} ${response.statusText}.`);
  }

  const payload = placesDetailsResponseSchema.parse(await response.json());

  if (payload.status !== "OK") {
    throw new Error(
      payload.error_message
        ? `Google Places API error (${payload.status}): ${payload.error_message}`
        : `Google Places API error: ${payload.status}`,
    );
  }

  const reviews = (payload.result?.reviews ?? [])
    .filter((review) => review.text.trim().length > 0)
    .sort((left, right) => right.time - left.time);

  if (!reviews.length) {
    throw new Error("No Google reviews with review text were returned for this place.");
  }

  return reviews;
}

function buildUpdatedTestimonials(
  existingTestimonials: Testimonial[],
  googleReviews: GoogleReview[],
) {
  const manualTestimonials = existingTestimonials.filter(
    (testimonial) => testimonial.source !== GOOGLE_REVIEWS_SOURCE,
  );
  const googleTestimonials = googleReviews.map(mapGoogleReviewToTestimonial);

  return {
    combinedTestimonials: [...manualTestimonials, ...googleTestimonials],
    googleTestimonials,
  };
}

function buildUpdatedHomeFeaturedIds(
  existingFeaturedIds: string[],
  existingTestimonials: Testimonial[],
  googleTestimonials: Testimonial[],
) {
  const existingGoogleIds = new Set(
    existingTestimonials
      .filter((testimonial) => testimonial.source === GOOGLE_REVIEWS_SOURCE)
      .map((testimonial) => testimonial.id),
  );
  const manualFeaturedIds = existingFeaturedIds.filter(
    (id) => !existingGoogleIds.has(id) && !id.startsWith("google-"),
  );
  const googleFeaturedIds = googleTestimonials
    .slice(0, HOMEPAGE_GOOGLE_REVIEW_LIMIT)
    .map((testimonial) => testimonial.id);

  return [...new Set([...manualFeaturedIds, ...googleFeaturedIds])];
}

function buildUpdatedReviewsPageData(
  reviewsPageData: z.infer<typeof reviewsPageFrontmatterSchema>,
  testimonials: Testimonial[],
) {
  const nextStats = [...reviewsPageData.stats];

  if (nextStats[0]) {
    nextStats[0] = { ...nextStats[0], value: formatAverageRating(testimonials) };
  }

  if (nextStats[1]) {
    nextStats[1] = { ...nextStats[1], value: String(testimonials.length) };
  }

  return {
    ...reviewsPageData,
    stats: nextStats,
  };
}

function writeIfNeeded(filePath: string, contents: string, { dryRun }: DryRunOptions) {
  if (!dryRun) {
    fs.writeFileSync(filePath, contents, "utf8");
  }
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const { apiKey, placeId } = readEnvFile();
  const googleReviews = await fetchGoogleReviews(apiKey, placeId);

  const reviewsCollectionDoc = readFrontmatterFile(
    REVIEWS_COLLECTION_PATH,
    testimonialsCollectionFrontmatterSchema,
  );
  const homeTestimonialsDoc = readFrontmatterFile(
    HOME_TESTIMONIALS_PATH,
    homeTestimonialsFrontmatterSchema,
  );
  const reviewsPageDoc = readFrontmatterFile(
    REVIEWS_PAGE_PATH,
    reviewsPageFrontmatterSchema,
  );

  const { combinedTestimonials, googleTestimonials } = buildUpdatedTestimonials(
    reviewsCollectionDoc.data.testimonials,
    googleReviews,
  );

  const nextFeaturedIds = buildUpdatedHomeFeaturedIds(
    homeTestimonialsDoc.data.featuredIds,
    reviewsCollectionDoc.data.testimonials,
    googleTestimonials,
  );

  const nextReviewsCollectionData = testimonialsCollectionFrontmatterSchema.parse({
    component: reviewsCollectionDoc.data.component,
    testimonials: combinedTestimonials,
  });
  const nextHomeTestimonialsData = homeTestimonialsFrontmatterSchema.parse({
    component: homeTestimonialsDoc.data.component,
    order: homeTestimonialsDoc.data.order,
    eyebrow: homeTestimonialsDoc.data.eyebrow,
    featuredIds: nextFeaturedIds,
  });
  const nextReviewsPageData = reviewsPageFrontmatterSchema.parse(
    buildUpdatedReviewsPageData(reviewsPageDoc.data, combinedTestimonials),
  );

  const nextReviewsCollectionMarkdown = toMarkdown(
    reviewsCollectionDoc.content,
    nextReviewsCollectionData,
  );
  const nextHomeTestimonialsMarkdown = toMarkdown(
    homeTestimonialsDoc.content,
    nextHomeTestimonialsData,
  );
  const nextReviewsPageMarkdown = toMarkdown(reviewsPageDoc.content, nextReviewsPageData);

  if (dryRun) {
    console.log(
      `[dry-run] Fetched ${googleTestimonials.length} reviews. Would write ${relativePath(REVIEWS_COLLECTION_PATH)}, ${relativePath(HOME_TESTIMONIALS_PATH)}, and ${relativePath(REVIEWS_PAGE_PATH)}.`,
    );
    console.log(
      `[dry-run] Homepage featured IDs: ${nextFeaturedIds.join(", ") || "(none)"}`,
    );
    console.log(
      `[dry-run] Reviews page stats: ${nextReviewsPageData.stats
        .map((stat) => `${stat.label}=${stat.value}`)
        .join(" | ")}`,
    );
    return;
  }

  writeIfNeeded(REVIEWS_COLLECTION_PATH, nextReviewsCollectionMarkdown, { dryRun });
  writeIfNeeded(HOME_TESTIMONIALS_PATH, nextHomeTestimonialsMarkdown, { dryRun });
  writeIfNeeded(REVIEWS_PAGE_PATH, nextReviewsPageMarkdown, { dryRun });

  console.log(
    `Fetched ${googleTestimonials.length} reviews, wrote to ${relativePath(REVIEWS_COLLECTION_PATH)}, ${relativePath(HOME_TESTIMONIALS_PATH)}, and ${relativePath(REVIEWS_PAGE_PATH)}.`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`Google review sync failed: ${message}`);
  process.exitCode = 1;
});
