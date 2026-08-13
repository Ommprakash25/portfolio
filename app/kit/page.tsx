import Image from "next/image";
import { kit } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Kit",
  "Tools and gear Omm actually uses.",
  "/kit",
);

export default function KitPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-20 md:px-6 md:pr-24">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Desk</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">kit</h1>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {kit.map((item) => (
          <li
            key={item.slug}
            className="overflow-hidden rounded-xl border border-line/70 bg-panel/40"
          >
            <div className="flex h-36 items-center justify-center bg-paper/50">
              <Image src={item.image} alt="" width={80} height={80} />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm text-muted">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
