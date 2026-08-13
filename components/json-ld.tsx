import { site, socials } from "@/lib/content";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: `${site.name} — ${site.role}`,
        url: site.url,
        description: site.description,
      },
      {
        "@type": "Person",
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        email: site.email,
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
        sameAs: [socials.github, socials.x, socials.discord, socials.linkedin],
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ProjectJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    author: { "@type": "Person", name: site.name },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
