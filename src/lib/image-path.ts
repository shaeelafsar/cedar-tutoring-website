const basePath = process.env.NODE_ENV === "production" ? "/cedar-tutoring-website" : "";

export function imagePath(src: string): string {
  if (src.startsWith("/") && (!basePath || !src.startsWith(basePath))) {
    return `${basePath}${src}`;
  }

  return src;
}
