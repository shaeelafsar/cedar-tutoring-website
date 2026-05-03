import type { ProgramPageData } from "@/types/content";

export const PROGRAMS: readonly ProgramPageData[] = [
  {
    slug: "reading",
    title: "Reading Tutoring",
    shortTitle: "Reading",
    shortDescription:
      "Support for fluency, comprehension, vocabulary, and confidence when school reading starts to feel frustrating.",
    icon: "book-open",
    grades: "K–8",
    tags: ["core", "literacy"],
    relatedPrograms: ["writing", "homework-help"],
    seo: {
      title: "Reading Tutoring for K-8 Students | Cedar Tutoring Academy",
      description:
        "Personalized reading tutoring for fluency, comprehension, and vocabulary. Small groups, real teachers, measurable progress in Plano, TX.",
    },
    hero: {
      heading: "Reading tutoring that builds fluency, comprehension, and real confidence.",
      subtitle:
        "When reading feels hard, everything else in school gets harder too. Cedar helps students close gaps, build skills, and actually enjoy reading again.",
    },
    problem: {
      heading: "When reading falls behind, everything else follows.",
      paragraphs: [
        "Parents often notice the signs early — guessing at words, avoiding books, struggling with homework that requires reading across subjects. By 3rd grade, these gaps can compound into frustration that affects confidence in every class.",
        "Many families try extra practice at home but hit a wall. Without targeted instruction that meets the student where they actually are, reading struggles tend to grow quietly until they become urgent.",
      ],
    },
    approach: {
      heading: "How Cedar builds stronger readers.",
      paragraphs: [
        "We start with an honest assessment of where each student stands — not where their grade level says they should be. From there, we build a plan that targets the specific skills holding them back.",
      ],
      bullets: [
        "Phonics and decoding for early readers who need foundational support",
        "Fluency practice that builds speed and expression naturally",
        "Comprehension strategies for understanding what they read, not just saying the words",
        "Vocabulary building tied to grade-level expectations and real reading material",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Improved reading fluency and accuracy within the first 8–12 weeks",
        "Stronger comprehension across school subjects",
        "More willingness to read independently",
        "Calmer homework routines involving reading",
        "Regular progress updates with clear next steps",
      ],
    },
    testimonials: [
      {
        quote:
          "My daughter went from avoiding books to reading on her own before bed. Cedar helped her feel capable, not just caught up.",
        author: "Layla H.",
        relation: "Parent of a 4th grader • Plano, TX",
        rating: 5,
        badge: "Reading confidence",
      },
      {
        quote:
          "The tutor identified exactly where my son was stuck and built from there. His teacher noticed the change within a month.",
        author: "David P.",
        relation: "Parent of a 2nd grader • Plano, TX",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "What reading levels do you support?",
        answer:
          "We work with students from pre-reading and early phonics through 8th-grade comprehension and vocabulary. Our assessment identifies the exact starting point.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Most families see noticeable improvement in fluency and confidence within 8–12 weeks of consistent sessions. We provide progress updates along the way.",
      },
      {
        question: "Does Cedar use a specific reading curriculum?",
        answer:
          "We use research-backed approaches tailored to each student. Instruction covers phonics, fluency, comprehension, and vocabulary — adjusted to match their needs, not a rigid program.",
      },
    ],
    cta: {
      heading: "Ready to help your child become a stronger reader?",
      description:
        "Start with a free reading assessment. We'll identify where your child stands and recommend a clear path forward.",
      buttonText: "Book a Free Reading Assessment",
    },
  },
  {
    slug: "math",
    title: "Math Tutoring",
    shortTitle: "Math",
    shortDescription:
      "Step-by-step support from foundational arithmetic to algebra, geometry, and beyond — at the student's real level.",
    icon: "calculator",
    grades: "K–12",
    tags: ["core", "stem"],
    relatedPrograms: ["science", "homework-help"],
    seo: {
      title: "Math Tutoring for K-12 Students | Cedar Tutoring Academy",
      description:
        "Personalized math tutoring from arithmetic to calculus. Small groups, real teachers, measurable progress in Plano, TX.",
    },
    hero: {
      heading: "Math tutoring that meets students where they actually are.",
      subtitle:
        "From foundational arithmetic to algebra and beyond — Cedar builds understanding step by step, so math stops feeling impossible.",
    },
    problem: {
      heading: "When math gaps go unaddressed, frustration grows fast.",
      paragraphs: [
        "Math builds on itself. A shaky foundation in fractions shows up again in algebra. A gap in number sense becomes a wall in geometry. Parents watch their child lose confidence one assignment at a time.",
        "Many students aren't 'bad at math' — they're stuck on concepts that weren't fully understood earlier. Without targeted support that addresses the real gap, the struggle compounds every year.",
      ],
    },
    approach: {
      heading: "How Cedar builds mathematical confidence.",
      paragraphs: [
        "We assess where students actually are — not just their grade level — and build instruction around the specific skills they need. Every session is structured, focused, and designed to move understanding forward.",
      ],
      bullets: [
        "Foundational skills: number sense, operations, and fact fluency for younger students",
        "Concept-based instruction for fractions, decimals, and pre-algebra readiness",
        "Algebra, geometry, and higher math with step-by-step problem solving",
        "Test preparation strategies for math sections of standardized tests",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Stronger problem-solving skills and fewer careless errors",
        "Improved grades and more confidence on math assignments",
        "Less homework-related stress at home",
        "Clear understanding of concepts, not just memorized procedures",
        "Regular progress reports with specific skill tracking",
      ],
    },
    testimonials: [
      {
        quote:
          "My son went from crying over math homework to finishing it independently. Cedar didn't just teach him formulas — they helped him understand why math works.",
        author: "Samir K.",
        relation: "Parent of a 7th grader • Plano, TX",
        rating: 5,
        badge: "Grade improvement",
      },
      {
        quote:
          "Cedar found the gaps nobody else had identified. Within two months, her math confidence completely changed.",
        author: "Jennifer L.",
        relation: "Parent of a 5th grader • Plano, TX",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "What math levels do you cover?",
        answer:
          "We support students from basic arithmetic and number sense through algebra, geometry, pre-calculus, and standardized test math. Our assessment identifies the right starting point.",
      },
      {
        question: "My child is in advanced math but struggling. Can Cedar help?",
        answer:
          "Absolutely. We frequently work with students in honors or pre-AP courses who need support with pacing, concept depth, or test preparation.",
      },
      {
        question: "How do you handle different learning styles in math?",
        answer:
          "Our 1:3 ratio allows tutors to adapt explanations, use visual models, and adjust pacing based on how each student learns best.",
      },
    ],
    cta: {
      heading: "Ready to turn math frustration into confidence?",
      description:
        "Start with a free math assessment. We'll pinpoint the exact gaps and build a plan that moves your child forward.",
      buttonText: "Book a Free Math Assessment",
    },
  },
  {
    slug: "writing",
    title: "Writing Tutoring",
    shortTitle: "Writing",
    shortDescription:
      "Coaching for sentence structure, grammar, organization, and clearer academic writing across grade levels.",
    icon: "pen-tool",
    grades: "2–12",
    tags: ["core", "literacy"],
    relatedPrograms: ["reading", "homework-help"],
    seo: {
      title: "Writing Tutoring for Grades 2-12 | Cedar Tutoring Academy",
      description:
        "Personalized writing tutoring for grammar, structure, and academic writing. Small groups, real teachers in Plano, TX.",
    },
    hero: {
      heading: "Writing tutoring that builds structure, clarity, and confidence on paper.",
      subtitle:
        "When students can organize their thoughts and express them clearly, every subject gets easier. Cedar helps make that happen.",
    },
    problem: {
      heading: "Writing struggles often hide behind other frustrations.",
      paragraphs: [
        "A student who can explain an idea out loud but freezes when it's time to write it down. Homework that takes three times longer than it should. Essays that come back with vague feedback but no clear path to improvement.",
        "Writing is tested in every subject, but it's rarely taught with the structure and repetition students need. Without direct instruction in organization, grammar, and revision, writing anxiety grows quietly.",
      ],
    },
    approach: {
      heading: "How Cedar develops stronger writers.",
      paragraphs: [
        "We focus on the building blocks: sentence structure, paragraph organization, grammar, and the ability to express ideas clearly and completely. Each session builds on the last.",
      ],
      bullets: [
        "Sentence-level instruction for students building foundational writing skills",
        "Paragraph and essay organization with clear frameworks",
        "Grammar and mechanics taught in context, not isolation",
        "Academic writing support for reports, essays, and research assignments",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Clearer, more organized writing across all subjects",
        "Stronger grammar and sentence structure",
        "Less frustration and avoidance around writing assignments",
        "Improved scores on written portions of tests and assignments",
        "Regular samples and progress notes from tutors",
      ],
    },
    testimonials: [
      {
        quote:
          "My daughter used to dread every essay assignment. Now she has a process and actually feels confident starting. The change has been remarkable.",
        author: "Priya M.",
        relation: "Parent of a 6th grader • Plano, TX",
        rating: 5,
        badge: "Writing confidence",
      },
    ],
    faq: [
      {
        question: "What grade levels do you support for writing?",
        answer:
          "We work with students from 2nd grade (sentence and paragraph basics) through 12th grade (academic essays, research writing, and test prep writing).",
      },
      {
        question: "Will my child work on their actual school assignments?",
        answer:
          "When appropriate, yes. We often use real assignments as teaching opportunities while also building the underlying skills that transfer across all writing tasks.",
      },
      {
        question: "How is writing tutoring structured?",
        answer:
          "Sessions follow a consistent cycle: skill instruction, guided practice, independent writing, and feedback. This builds both skill and confidence over time.",
      },
    ],
    cta: {
      heading: "Ready to help your child write with confidence?",
      description:
        "Start with a free assessment. We'll evaluate where your child stands and create a plan for clearer, stronger writing.",
      buttonText: "Book a Free Writing Assessment",
    },
  },
  {
    slug: "science",
    title: "Science Tutoring",
    shortTitle: "Science",
    shortDescription:
      "Concept clarity, study strategies, and skill-building for students who need science to feel less overwhelming.",
    icon: "flask-conical",
    grades: "5–12",
    tags: ["stem"],
    relatedPrograms: ["math", "homework-help"],
    seo: {
      title: "Science Tutoring for Grades 5-12 | Cedar Tutoring Academy",
      description:
        "Personalized science tutoring for biology, chemistry, physics, and more. Small groups, real teachers in Plano, TX.",
    },
    hero: {
      heading: "Science tutoring that turns confusion into clarity.",
      subtitle:
        "When science concepts feel overwhelming, students shut down. Cedar helps them understand, not just memorize — so they can keep up and feel capable.",
    },
    problem: {
      heading: "Science gets harder fast — and catching up feels impossible.",
      paragraphs: [
        "Science courses shift quickly from familiar topics to abstract concepts. A student who did fine in 5th-grade science can suddenly struggle in middle school biology or high school chemistry.",
        "The combination of dense vocabulary, multi-step problem solving, and lab-based application makes science uniquely challenging. Without structured support, many students fall into a pattern of memorizing without understanding.",
      ],
    },
    approach: {
      heading: "How Cedar makes science manageable.",
      paragraphs: [
        "We focus on concept clarity first. When students understand why something works — not just what to memorize — they can apply that understanding across topics and tests.",
      ],
      bullets: [
        "Concept-based instruction that builds real understanding",
        "Study strategies for vocabulary-heavy subjects like biology",
        "Problem-solving frameworks for physics and chemistry",
        "Lab report and scientific writing support when needed",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Stronger understanding of core science concepts",
        "Better study habits and test preparation strategies",
        "Improved grades and less last-minute cramming",
        "More confidence participating in class",
        "Clear communication about progress and next steps",
      ],
    },
    testimonials: [
      {
        quote:
          "Cedar helped my son go from barely passing chemistry to actually understanding it. The tutor broke down complex topics in a way that finally clicked.",
        author: "Michael T.",
        relation: "Parent of a 10th grader • Plano, TX",
        rating: 5,
        badge: "Concept clarity",
      },
    ],
    faq: [
      {
        question: "What science subjects do you cover?",
        answer:
          "We support general science, biology, chemistry, physics, and earth science at middle and high school levels. Our assessment identifies where support is most needed.",
      },
      {
        question: "Can Cedar help with AP science courses?",
        answer:
          "Yes. We work with students in AP Biology, AP Chemistry, and AP Physics, focusing on concept mastery and exam preparation.",
      },
      {
        question: "How do small groups work for science tutoring?",
        answer:
          "Students are grouped by subject and level. Our 1:3 ratio means each student gets personalized attention while benefiting from peer discussion and collaborative problem-solving.",
      },
    ],
    cta: {
      heading: "Ready to help your child master science?",
      description:
        "Start with a free assessment. We'll identify the concepts that need attention and build a focused plan.",
      buttonText: "Book a Free Science Assessment",
    },
  },
  {
    slug: "arabic",
    title: "Arabic Language Tutoring",
    shortTitle: "Arabic",
    shortDescription:
      "Reading, writing, vocabulary, and comprehension support for children learning Arabic with structure and consistency.",
    icon: "languages",
    grades: "K–12",
    tags: ["language"],
    relatedPrograms: ["reading", "writing"],
    seo: {
      title: "Arabic Language Tutoring for K-12 Students | Cedar Tutoring Academy",
      description:
        "Structured Arabic language tutoring for reading, writing, and comprehension. Small groups, caring teachers in Plano, TX.",
    },
    hero: {
      heading: "Arabic tutoring with structure, warmth, and real progress.",
      subtitle:
        "Whether your child is learning Arabic for the first time or strengthening what they know, Cedar provides the consistency and encouragement they need.",
    },
    problem: {
      heading: "Learning Arabic without structure leads to slow, frustrating progress.",
      paragraphs: [
        "Many families want their children to learn Arabic but struggle to find consistent, structured instruction. Weekend programs alone often aren't enough, and practicing at home without a curriculum can feel scattered.",
        "Children need regular exposure, clear skill progression, and patient guidance. Without that structure, motivation fades and progress stalls — even when the desire to learn is strong.",
      ],
    },
    approach: {
      heading: "How Cedar teaches Arabic effectively.",
      paragraphs: [
        "We combine structured curriculum with warm, patient instruction. Students build skills in a logical sequence — from letter recognition and reading through vocabulary, grammar, and conversational comprehension.",
      ],
      bullets: [
        "Letter recognition, reading, and writing foundations for beginners",
        "Vocabulary building tied to practical, age-appropriate contexts",
        "Grammar and sentence structure for intermediate and advanced learners",
        "Comprehension practice through stories, conversation, and guided reading",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Consistent progress in Arabic reading and writing skills",
        "Growing vocabulary and comprehension confidence",
        "A structured learning path that builds week over week",
        "Warm, culturally sensitive instruction",
        "Regular updates on progress and skill development",
      ],
    },
    testimonials: [
      {
        quote:
          "We tried several Arabic programs before Cedar. The structure and patience of the tutors made all the difference. My kids are actually reading Arabic now.",
        author: "Fatima A.",
        relation: "Parent of two students • Plano, TX",
        rating: 5,
        badge: "Language growth",
      },
    ],
    faq: [
      {
        question: "Does my child need prior Arabic knowledge?",
        answer:
          "No. We work with complete beginners through advanced learners. Our assessment places each student at the right starting point.",
      },
      {
        question: "What curriculum do you use for Arabic?",
        answer:
          "We use a structured, skills-based approach covering reading, writing, vocabulary, and comprehension. Materials are selected based on the student's level and goals.",
      },
      {
        question: "Can Cedar help with Quran reading as well?",
        answer:
          "Our Arabic program focuses on Modern Standard Arabic language skills. For Quran-specific instruction, we recommend complementing our program with a dedicated Quran teacher.",
      },
    ],
    cta: {
      heading: "Ready to give your child structured Arabic instruction?",
      description:
        "Start with a free assessment. We'll evaluate their current level and recommend the right path forward.",
      buttonText: "Book a Free Arabic Assessment",
    },
  },
  {
    slug: "homework-help",
    title: "Homework Help",
    shortTitle: "Homework Help",
    shortDescription:
      "Guided accountability, calmer evenings, and structured support for students who need consistency after school.",
    icon: "book-marked",
    grades: "K–12",
    tags: ["support"],
    relatedPrograms: ["reading", "math"],
    seo: {
      title: "Homework Help for K-12 Students | Cedar Tutoring Academy",
      description:
        "Structured homework help with real accountability. Calmer evenings, better routines, and academic support in Plano, TX.",
    },
    hero: {
      heading: "Homework help that builds routines, not just answers.",
      subtitle:
        "Cedar's homework help gives students the structure and support they need to finish work independently — and gives parents calmer evenings.",
    },
    problem: {
      heading: "Homework battles drain families every evening.",
      paragraphs: [
        "The after-school struggle is real: hours spent on homework that should take 30 minutes, tears over assignments, and parents becoming reluctant tutors. The stress affects the whole family.",
        "Most students don't need someone to give them answers — they need someone to help them stay organized, break tasks down, and build the confidence to work through challenges independently.",
      ],
    },
    approach: {
      heading: "How Cedar makes homework manageable.",
      paragraphs: [
        "Our homework help isn't about doing the work for students. It's about building the executive function skills, routines, and confidence that make homework feel achievable.",
      ],
      bullets: [
        "Structured after-school sessions with clear start and end routines",
        "Task prioritization and time management support",
        "Subject-specific help when students get stuck",
        "Accountability and encouragement to build independent work habits",
      ],
    },
    outcomes: {
      heading: "What parents can expect.",
      items: [
        "Calmer, more predictable after-school routines",
        "Homework completed more independently and consistently",
        "Better organizational skills and time management",
        "Reduced parent-child conflict over schoolwork",
        "Regular updates on homework completion and emerging skill gaps",
      ],
    },
    testimonials: [
      {
        quote:
          "Cedar changed our entire after-school routine. My daughter went from dreading homework to confidently finishing it on her own. The communication from her tutor was phenomenal.",
        author: "Layla H.",
        relation: "Parent of a 4th grader • Plano, TX",
        rating: 5,
        badge: "Routine transformation",
      },
    ],
    faq: [
      {
        question: "Is homework help the same as tutoring?",
        answer:
          "Homework help focuses on completing daily assignments with structure and support. If we notice persistent gaps in a subject, we'll recommend adding targeted tutoring sessions to address the root cause.",
      },
      {
        question: "What subjects does homework help cover?",
        answer:
          "Our homework help sessions cover all core subjects — math, reading, writing, science, and social studies. Students bring their actual assignments and we guide them through completion.",
      },
      {
        question: "Can my child do homework help and tutoring together?",
        answer:
          "Absolutely. Many families pair homework help with focused tutoring in a specific subject. We can recommend the right combination based on your child's needs.",
      },
    ],
    cta: {
      heading: "Ready for calmer evenings and better homework routines?",
      description:
        "Start with a free assessment. We'll understand your child's homework challenges and recommend the right level of support.",
      buttonText: "Book a Free Assessment",
    },
  },
] as const satisfies readonly ProgramPageData[];

/** Helper to find a program by slug */
export function getProgramBySlug(slug: string): ProgramPageData | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

/** Get all program slugs for static generation */
export function getAllProgramSlugs(): string[] {
  return PROGRAMS.map((p) => p.slug);
}

/** Get related programs for a given slug */
export function getRelatedPrograms(slug: string): ProgramPageData[] {
  const program = getProgramBySlug(slug);
  if (!program) return [];
  return program.relatedPrograms
    .map((s) => getProgramBySlug(s))
    .filter((p): p is ProgramPageData => p !== undefined);
}
