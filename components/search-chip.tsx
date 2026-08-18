"use client";

import { Search } from "lucide-react";

export function SearchChip({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      data-chrome
      onClick={onOpen}
      className="print:hidden fixed bottom-5 left-4 z-40 hidden items-center gap-2 rounded-full border border-line/80 bg-panel/70 px-3 py-2 text-xs text-muted backdrop-blur-md md:flex"
    >
      <Search className="size-3.5" />
      Search
      <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
    </button>
  );
}
