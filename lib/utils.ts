export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function githubUsername(url: string) {
  const fallback =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || process.env.GITHUB_USERNAME || "octocat";
  try {
    return new URL(url).pathname.replaceAll("/", "") || fallback;
  } catch {
    return fallback;
  }
}
