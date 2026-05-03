import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Stop {
  name: string;
  coords: [number, number]; // [lat, lng]
  date?: string;
  type?: string;
  hubSlug?: string;
}

interface Props {
  stops: Stop[];
  country: "Rwanda" | "Nigeria" | "Both";
  highlightIndex?: number;
  onStopClick?: (index: number) => void;
}

// Approximate bounding boxes
const BOUNDS: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
  Rwanda: { minLat: -2.85, maxLat: -1.05, minLng: 28.85, maxLng: 30.9 },
  Nigeria: { minLat: 4.0, maxLat: 14.0, minLng: 2.7, maxLng: 14.7 },
  Both: { minLat: -3.0, maxLat: 14.0, minLng: 2.7, maxLng: 30.9 },
};

const RouteMap = ({ stops, country, highlightIndex, onStopClick }: Props) => {
  const navigate = useNavigate();
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

  const handleClick = (i: number, slug?: string) => {
    onStopClick?.(i);
    if (slug) navigate(`/health-hubs/${slug}`);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/50 bg-muted/20">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${country} mobile clinic route map`}>
        <rect x={0} y={0} width={W} height={H} fill="hsl(var(--muted))" opacity="0.3" />
        <text x={pad} y={20} className="fill-muted-foreground" fontSize="12">
          {country === "Both" ? "Rwanda & Nigeria" : country} — mobile clinic route
        </text>

        {points.length > 1 && (
          <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5}
            strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {points.map((p, i) => {
          const active = i === highlightIndex;
          const clickable = !!p.hubSlug || !!onStopClick;
          return (
            <g
              key={i}
              onClick={() => handleClick(i, p.hubSlug)}
              style={{ cursor: clickable ? "pointer" : "default" }}
            >
              <circle cx={p.x} cy={p.y} r={active ? 9 : 6}
                fill={active ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                stroke="white" strokeWidth={2} />
              <text x={p.x + 10} y={p.y + 4} fontSize="11" className="fill-foreground">
                {i + 1}. {p.name}
              </text>
              {p.hubSlug && <title>Open {p.name} hub details</title>}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RouteMap;
