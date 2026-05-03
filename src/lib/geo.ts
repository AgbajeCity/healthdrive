import { hubs, type Hub } from "@/data/hubs";

/** Haversine distance in kilometers between two [lat, lng] pairs. */
export const distanceKm = (a: [number, number], b: [number, number]): number => {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
};

/**
 * Match a coordinate to its nearest Health Hub within a configurable radius.
 * Default radius: 25km. Returns undefined if nothing is close enough.
 */
export const findNearestHub = (
  coords: [number, number],
  radiusKm = 25
): Hub | undefined => {
  let best: { hub: Hub; d: number } | undefined;
  for (const hub of hubs) {
    const d = distanceKm(coords, hub.coords);
    if (d <= radiusKm && (!best || d < best.d)) {
      best = { hub, d };
    }
  }
  return best?.hub;
};

export const findNearestHubSlug = (
  coords: [number, number],
  radiusKm = 25
): string | undefined => findNearestHub(coords, radiusKm)?.slug;
