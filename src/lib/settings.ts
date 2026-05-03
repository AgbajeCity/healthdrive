const KEY = "hd-match-radius-km";
const DEFAULT = 25;

export const getMatchRadiusKm = (): number => {
  if (typeof window === "undefined") return DEFAULT;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT;
};

export const setMatchRadiusKm = (km: number) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, String(km));
  window.dispatchEvent(new CustomEvent("hd-radius-changed", { detail: km }));
};

export const DEFAULT_MATCH_RADIUS_KM = DEFAULT;
