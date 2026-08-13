"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { githubUsername } from "@/lib/utils";
import { socials } from "@/lib/content";

const empty = () => () => undefined;

export function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(empty, () => true, () => false);
  const user = githubUsername(socials.github) || "octocat";

  return (
    <div className="overflow-hidden rounded-xl border border-line/70 bg-panel/40 p-4">
      {!mounted ? (
        <div className="h-40 animate-pulse rounded-lg bg-muted/20" />
      ) : (
        <div className="overflow-x-auto">
          <GitHubCalendar
            username={user}
            colorScheme={resolvedTheme === "light" ? "light" : "dark"}
            fontSize={12}
            blockSize={11}
            blockMargin={4}
          />
        </div>
      )}
    </div>
  );
}
