import { describe, it, expect } from "vitest";
import { USSD_SHORTCUTS, ussdServiceMap } from "@/data/ussd-shortcuts";

describe("USSD shortcuts", () => {
  it("exposes the four planned primary-care codes", () => {
    expect(USSD_SHORTCUTS.map((s) => s.code).sort()).toEqual(
      ["*123#", "*456#", "*789#", "*911#"],
    );
  });

  it("maps each code to the correct internal service key", () => {
    expect(ussdServiceMap["*911#"]).toBe("emergency");
    expect(ussdServiceMap["*123#"]).toBe("clinics");
    expect(ussdServiceMap["*456#"]).toBe("health-info");
    expect(ussdServiceMap["*789#"]).toBe("community");
  });

  it("labels each code with copy that matches its planned care flow", () => {
    const byCode = Object.fromEntries(USSD_SHORTCUTS.map((s) => [s.code, s]));
    expect(byCode["*911#"].label.toLowerCase()).toMatch(/emergenc/);
    expect(byCode["*123#"].label.toLowerCase()).toMatch(/clinic|find/);
    expect(byCode["*456#"].label.toLowerCase()).toMatch(/symptom|info|guidance/);
    expect(byCode["*789#"].label.toLowerCase()).toMatch(/community/);
  });

  it("describes every code as planned and not live", () => {
    for (const s of USSD_SHORTCUTS) {
      expect(s.description).toMatch(/^Planned:/);
      expect(s.description).toMatch(/Not live\.$/);
    }
  });
});
