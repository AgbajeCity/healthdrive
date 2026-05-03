import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import { PRIMARY_CARE_FAQ, buildFaqJsonLd } from "@/data/faq";

function renderHome() {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <HelmetProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Index />
        </MemoryRouter>
      </HelmetProvider>
    </QueryClientProvider>,
  );
}

describe("Homepage FAQ JSON-LD", () => {
  it("emits a valid FAQPage structured-data block", async () => {
    renderHome();
    // react-helmet-async writes to document.head asynchronously.
    await new Promise((r) => setTimeout(r, 0));
    const scripts = Array.from(
      document.head.querySelectorAll('script[type="application/ld+json"]'),
    );
    expect(scripts.length).toBeGreaterThan(0);

    const faqScript = scripts
      .map((s) => JSON.parse(s.textContent || "{}"))
      .find((j) => j["@type"] === "FAQPage");

    expect(faqScript).toBeTruthy();
    expect(faqScript["@context"]).toBe("https://schema.org");
    expect(Array.isArray(faqScript.mainEntity)).toBe(true);
    expect(faqScript.mainEntity.length).toBe(PRIMARY_CARE_FAQ.length);

    for (const entry of faqScript.mainEntity) {
      expect(entry["@type"]).toBe("Question");
      expect(typeof entry.name).toBe("string");
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      expect(typeof entry.acceptedAnswer.text).toBe("string");
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0);
    }

    // Each FAQ source entry must be in the structured data
    const names = new Set(faqScript.mainEntity.map((e: any) => e.name));
    for (const f of PRIMARY_CARE_FAQ) {
      expect(names.has(f.q)).toBe(true);
    }
  });

  it("buildFaqJsonLd produces an exact match of the schema shape", () => {
    const json = buildFaqJsonLd();
    expect(json).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PRIMARY_CARE_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  });
});
