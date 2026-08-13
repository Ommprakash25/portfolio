import { experience, projects, site, socials, tech } from "./content";

export type ChatTurn = { q: string; a: string };

export const chatStarters = [
  "What do you work on?",
  "Show me projects",
  "Where have you worked?",
  "How do I reach you?",
];

export const chatFaq: ChatTurn[] = [
  {
    q: "What do you work on?",
    a: `${site.name} is a ${site.role} in ${site.location}. ${site.tagline} Stack includes ${tech.slice(0, 8).join(", ")}.`,
  },
  {
    q: "Show me projects",
    a: projects
      .filter((p) => p.featured)
      .map((p) => `${p.title} (${p.year}) — ${p.summary}`)
      .join(" "),
  },
  {
    q: "Where have you worked?",
    a: experience.map((e) => `${e.role} at ${e.org} (${e.period}).`).join(" "),
  },
  {
    q: "How do I reach you?",
    a: `Email ${site.email}. GitHub ${socials.github}. LinkedIn ${socials.linkedin}.`,
  },
];

export function answerChat(input: string) {
  const q = input.trim().toLowerCase();
  if (!q) return "Ask about skills, projects, experience, or contact.";
  const hit = chatFaq.find(
    (item) =>
      item.q.toLowerCase().includes(q) ||
      q.split(/\s+/).some((w) => w.length > 3 && item.q.toLowerCase().includes(w)),
  );
  if (hit) return hit.a;
  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return `Main tools: ${tech.join(", ")}.`;
  }
  if (q.includes("project") || q.includes("work") || q.includes("build")) {
    return chatFaq[1].a;
  }
  if (q.includes("experience") || q.includes("job") || q.includes("career")) {
    return chatFaq[2].a;
  }
  if (q.includes("email") || q.includes("contact") || q.includes("reach") || q.includes("hello")) {
    return chatFaq[3].a;
  }
  return `I only know a short FAQ — try skills, projects, experience, or contact. Or write ${site.email}.`;
}
