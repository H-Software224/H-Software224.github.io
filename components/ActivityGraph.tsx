import type { ContributionDay } from '@/lib/contributions';

const WIDTH = 600;
const HEIGHT = 140;
const PAD_X = 10;
const PAD_Y = 14;

export default function ActivityGraph({ data }: { data: ContributionDay[] }) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.count), 1);
  const stepX = (WIDTH - PAD_X * 2) / Math.max(data.length - 1, 1);
  const baseline = HEIGHT - PAD_Y;

  const points = data.map((d, i) => ({
    x: PAD_X + i * stepX,
    y: PAD_Y + (baseline - PAD_Y) * (1 - d.count / max),
    day: d,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${baseline} L ${points[0].x.toFixed(1)} ${baseline} Z`;

  const last = points[points.length - 1];
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`최근 30일 기여 ${total}회, 일별 추이 그래프`}
        className="w-full"
      >
        <line
          x1={PAD_X}
          y1={baseline}
          x2={WIDTH - PAD_X}
          y2={baseline}
          strokeWidth={1}
          className="stroke-neutral-200 dark:stroke-neutral-800"
        />

        <path d={areaPath} className="fill-[#2a78d6] opacity-10 dark:fill-[#3987e5]" />
        <path
          d={linePath}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-[#2a78d6] dark:stroke-[#3987e5]"
        />

        {points.map((p) => (
          <circle key={p.day.date} cx={p.x} cy={p.y} r={8} className="fill-transparent">
            <title>{`${p.day.date}: ${p.day.count}회`}</title>
          </circle>
        ))}

        <circle
          cx={last.x}
          cy={last.y}
          r={4}
          strokeWidth={2}
          className="fill-[#2a78d6] stroke-white dark:fill-[#3987e5] dark:stroke-neutral-950"
        />
        <text
          x={last.x}
          y={last.y - 10}
          textAnchor="end"
          fontSize={11}
          className="fill-neutral-500 dark:fill-neutral-400"
        >
          {last.day.count}
        </text>
      </svg>

      <table className="sr-only">
        <caption>최근 30일 일별 기여 수</caption>
        <thead>
          <tr>
            <th>날짜</th>
            <th>기여 수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.date}>
              <td>{d.date}</td>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
