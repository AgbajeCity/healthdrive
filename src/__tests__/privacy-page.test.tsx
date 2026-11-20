import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Privacy from "@/pages/Privacy";
import Footer from "@/components/Footer";

function renderPrivacy() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/privacy"]}>
        <Privacy />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

const HEADINGS = [
  "Data Protection Officer",
  "What we collect",
  "Why we collect it",
  "Legal grounds",
  "Children",
  "Who sees your data",
  "Storage outside Rwanda",
  "How long we keep it",
  "Your rights",
  "Security",
  "Emergencies",
];

describe("Privacy Notice page", () => {
  it("renders the page title and every required heading", () => {
    renderPrivacy();
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Notice" })).toBeTruthy();
    for (const h of HEADINGS) {
      expect(screen.getByRole("heading", { level: 2, name: h })).toBeTruthy();
    }
  });

  it("makes the email addresses mailto links and the DPO phone a tel link", () => {
    renderPrivacy();
    const dpo = screen.getByRole("link", { name: "healthdrive.ltd@gmail.com" });
    expect(dpo.getAttribute("href")).toBe("mailto:healthdrive.ltd@gmail.com");

    const ncsa = screen.getByRole("link", { name: "complaint@dpo.gov.rw" });
    expect(ncsa.getAttribute("href")).toBe("mailto:complaint@dpo.gov.rw");

    const phone = screen.getByRole("link", { name: "+250 793 245 004" });
    expect(phone.getAttribute("href")).toBe("tel:+250793245004");
  });

  it("states the last-updated date", () => {
    renderPrivacy();
    expect(screen.getByText("Last updated: 20 November 2026.")).toBeTruthy();
  });
});

describe("Privacy Notice links", () => {
  it("the site footer links to /privacy", () => {
    render(
      <MemoryRouter initialEntries={["/privacy"]}>
        <Footer />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: "Privacy Notice" });
    expect(link.getAttribute("href")).toBe("/privacy");
  });
});
