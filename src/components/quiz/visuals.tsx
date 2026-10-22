import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { SeriesPoint, Visual } from "@/lib/quiz/bank";

const PIE_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

function useMotion() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setOn(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return on;
}

function ChartHeading({ title, unit }: { title: string; unit: string }) {
  return (
    <div className="mb-1">
      <h2 className="text-xl text-ink">{title}</h2>
      <p className="text-sm font-bold text-muted">Cantidad de {unit}</p>
    </div>
  );
}

function SeriesText({ points }: { points: SeriesPoint[] }) {
  return <p className="sr-only">{points.map((point) => `${point.label}: ${point.value}`).join(". ")}</p>;
}

function PeopleCards({ visual }: { visual: Extract<Visual, { kind: "people" }> }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface px-3 py-4">
      <figcaption className="mb-3 text-center text-sm font-extrabold tracking-wide text-primary uppercase">
        {visual.caption}
      </figcaption>
      <div className="flex flex-wrap justify-center gap-2">
        {visual.people.map((person) => (
          <div
            key={person.name}
            className="flex w-20 flex-col items-center rounded-2xl bg-primary-soft px-2 py-3"
          >
            <span className="text-sm font-extrabold text-muted">{person.name}</span>
            <span className="font-display text-3xl tabular-nums text-ink">{person.value}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function FrequencyTable({ visual }: { visual: Extract<Visual, { kind: "table" }> }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <figcaption className="border-b border-line bg-primary-soft px-4 py-3">
        <ChartHeading title={visual.title} unit={visual.unit} />
      </figcaption>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-sm text-muted">
            <th className="px-4 py-2 font-extrabold">Dato</th>
            <th className="px-4 py-2 font-extrabold">Conteo</th>
            <th className="px-4 py-2 text-right font-extrabold">Número</th>
          </tr>
        </thead>
        <tbody>
          {visual.points.map((point, index) => (
            <tr key={point.label} className={index % 2 === 1 ? "bg-bg" : "bg-surface"}>
              <th scope="row" className="px-4 py-3 font-extrabold text-ink">
                {point.label}
              </th>
              <td className="px-4 py-3">
                <span className="flex flex-wrap gap-1" aria-hidden>
                  {Array.from({ length: point.value }, (_, dot) => (
                    <span key={dot} className="size-3.5 rounded-full bg-primary" />
                  ))}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-display text-2xl tabular-nums text-ink">
                {point.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function HaloValue({
  x,
  y,
  value,
}: {
  x?: number | string;
  y?: number | string;
  value?: number | string;
}) {
  return (
    <text
      x={Number(x ?? 0)}
      y={Number(y ?? 0) - 16}
      textAnchor="middle"
      fill="var(--color-ink)"
      fontSize={14}
      fontWeight={800}
      stroke="var(--color-surface)"
      strokeWidth={6}
      paintOrder="stroke"
      fontFamily="Nunito, sans-serif"
    >
      {value}
    </text>
  );
}

const axisTick = {
  fill: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 700,
  fontFamily: "Nunito, sans-serif",
};

function BarVisual({ visual }: { visual: Extract<Visual, { kind: "bars" }> }) {
  const motion = useMotion();
  const max = Math.max(...visual.points.map((point) => point.value));
  return (
    <figure className="rounded-2xl border border-line bg-surface px-2 py-3">
      <figcaption className="px-2">
        <ChartHeading title={visual.title} unit={visual.unit} />
      </figcaption>
      <SeriesText points={visual.points} />
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={visual.points} margin={{ top: 28, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" tick={axisTick} interval={0} axisLine={false} tickLine={false} />
            <YAxis
              allowDecimals={false}
              width={32}
              domain={[0, max + 1]}
              tick={axisTick}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              fill="var(--color-primary)"
              radius={[8, 8, 0, 0]}
              maxBarSize={56}
              isAnimationActive={motion}
            >
              <LabelList
                dataKey="value"
                position="top"
                fill="var(--color-ink)"
                fontSize={14}
                fontWeight={800}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

function PieVisual({ visual }: { visual: Extract<Visual, { kind: "pie" }> }) {
  const motion = useMotion();
  return (
    <figure className="rounded-2xl border border-line bg-surface px-3 py-3">
      <figcaption className="px-1">
        <ChartHeading title={visual.title} unit={visual.unit} />
      </figcaption>
      <SeriesText points={visual.points} />
      <div className="mx-auto h-52 w-full max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visual.points}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={86}
              startAngle={90}
              endAngle={-270}
              stroke="var(--color-surface)"
              strokeWidth={3}
              isAnimationActive={motion}
            >
              {visual.points.map((point, index) => (
                <Cell key={point.label} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-1 flex flex-wrap justify-center gap-2">
        {visual.points.map((point, index) => (
          <li
            key={point.label}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-extrabold"
          >
            <span
              className="size-3.5 rounded-full"
              style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
              aria-hidden
            />
            {point.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}

function PolygonVisual({ visual }: { visual: Extract<Visual, { kind: "polygon" }> }) {
  const motion = useMotion();
  const max = Math.max(...visual.points.map((point) => point.value));
  return (
    <figure className="rounded-2xl border border-line bg-surface px-2 py-3">
      <figcaption className="px-2">
        <ChartHeading title={visual.title} unit={visual.unit} />
      </figcaption>
      <SeriesText points={visual.points} />
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visual.points} margin={{ top: 28, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" tick={axisTick} interval={0} axisLine={false} tickLine={false} />
            <YAxis
              allowDecimals={false}
              width={32}
              domain={[0, max + 1]}
              tick={axisTick}
              axisLine={false}
              tickLine={false}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={3}
              isAnimationActive={motion}
              dot={{ r: 6, fill: "var(--color-accent)", stroke: "var(--color-primary)", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            >
              <LabelList dataKey="value" content={HaloValue} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="px-2 pt-1 text-sm font-bold text-muted">{visual.note}</p>
    </figure>
  );
}

export default function QuestionVisual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "people":
      return <PeopleCards visual={visual} />;
    case "table":
      return <FrequencyTable visual={visual} />;
    case "bars":
      return <BarVisual visual={visual} />;
    case "pie":
      return <PieVisual visual={visual} />;
    case "polygon":
      return <PolygonVisual visual={visual} />;
  }
}
