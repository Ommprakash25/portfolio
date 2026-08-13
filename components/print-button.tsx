"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      className="border border-line px-3 py-1"
      onClick={() => window.print()}
    >
      Print
    </button>
  );
}
