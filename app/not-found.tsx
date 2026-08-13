import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Missing</h1>
      <p className="mt-4 text-muted">That page is not on the map.</p>
      <p className="mt-6">
        <Link href="/">Home</Link>
      </p>
    </main>
  );
}
