"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Atmosphere } from "./atmosphere";
import { CommandPalette } from "./command-palette";
import { EditorialCursor } from "./editorial-cursor";
import { ScrollProgress } from "./scroll-progress";
import { SearchChip } from "./search-chip";
import { SideDock } from "./side-dock";

export function Overlays() {
  const path = usePathname();
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPalette = useCallback(() => setPalette(true), []);

  if (path === "/cli") return null;

  return (
    <>
      <Atmosphere />
      <ScrollProgress />
      <SideDock />
      <EditorialCursor />
      <SearchChip onOpen={openPalette} />
      <CommandPalette open={palette} onOpenChange={setPalette} />
    </>
  );
}
