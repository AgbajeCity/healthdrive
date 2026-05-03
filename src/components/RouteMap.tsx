import { useMemo } from "react";

interface Stop {
  name: string;
  coords: [number, number]; // [lat, lng]
  date?: string;
  type?: string;
}

interface Props {
  stops: Stop[];
  country: "Rwanda" | "Nigeria" | "Both";
  highlightIndex?: number;
}

// Approximate bounding boxes
const BOUNDS: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
  Rwanda: { minLat: -2.85, maxLat: -1.05, minLng: 28.85, maxLng: 30.9 },
  Nigeria: { minLat: 4.0, maxLat: 14.0, minLng: 2.7, maxLng: 14.7 },
  Both: { minLat: -3.0, maxLat: 14.0, minLng: 2.7, maxLng: 30.9 },
};

const RouteMap = ({ stops, country, highlightIndex }: Props) => {
  const W = 600;
  const H = 360;
  const pad = 30;
  const b = BOUNDS[country];

  const points = useMemo(
    () =>
      stops.map((s) => {
        const [lat, lng] = s.coords;
        const x = pad + ((lng - b.minLng) / (b.maxLng - b.minLng)) * (W - 2 * pad);
        const y = pad + (1 - (lat - b.minLat) / (b.maxLat - b.minLat)) * (H - 2 * pad);
        return { ...s, x, y };
      }),
    [stops, b]
  );

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/50 bg-muted/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${country} mobile clinic route map`}>
        {/* Country backdrop */}
        <rect x={0} y={0} width={W} height={H} fill="hsl(var(--muted))" opacity="0.3" />
        <text x={pad} y={20} className="fill-muted-foreground" fontSize="12">
          {country === "Both" ? "Rwanda & Nigeria" : country} — mobile clinic route
        </text>

        {/* Route path */}
        {points.length > 1 && (
          <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5}
            strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Stops */}
        {points.map((p, i) => {
          const active = i === highlightIndex;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={active ? 9 : 6}
                fill={active ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                stroke="white" strokeWidth={2} />
              <text x={p.x + 10} y={p.y + 4} fontSize="11" className="fill-foreground">
                {i + 1}. {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RouteMap;
