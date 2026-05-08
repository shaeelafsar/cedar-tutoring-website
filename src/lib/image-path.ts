const basePath = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages" ? "/cedar-tutoring-website" : "";

export function imagePath(src: string): string {
  if (src.startsWith("/") && (!basePath || !src.startsWith(basePath))) {
    return `${basePath}${src}`;
  }

  return src;
}
