/**
 * Thin wrapper around SVG with viewBox sizing + clean defaults.
 * Used by every figure in the exam.
 */
export function SvgCanvas({ width = 480, height = 320, viewBox, children, style, className }) {
  const vb = viewBox ?? `0 0 ${width} ${height}`;
  return (
    <div className="figure-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={vb}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', ...style }}
        className={className}
      >
        {children}
      </svg>
    </div>
  );
}

/** Draw an arrow (vector) from (x1,y1) to (x2,y2). */
export function Arrow({ x1, y1, x2, y2, stroke = '#1a1a1a', strokeWidth = 2, id = 'ah' }) {
  const ahId = `arrowhead-${id}`;
  return (
    <g>
      <defs>
        <marker
          id={ahId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={stroke} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${ahId})`}
      />
    </g>
  );
}

export function Axes({
  x = 40, y = 40, w = 400, h = 240,
  xMin = 0, xMax = 10, yMin = 0, yMax = 10,
  xStep = 1, yStep = 1, xLabel = 'x', yLabel = 'y',
  grid = true,
}) {
  const sx = (v) => x + ((v - xMin) / (xMax - xMin)) * w;
  const sy = (v) => y + h - ((v - yMin) / (yMax - yMin)) * h;
  const xTicks = [];
  for (let v = Math.ceil(xMin / xStep) * xStep; v <= xMax; v += xStep) xTicks.push(v);
  const yTicks = [];
  for (let v = Math.ceil(yMin / yStep) * yStep; v <= yMax; v += yStep) yTicks.push(v);
  return (
    <g>
      {grid && (
        <g stroke="#eee" strokeWidth="1">
          {xTicks.map((v) => (
            <line key={`gx${v}`} x1={sx(v)} y1={y} x2={sx(v)} y2={y + h} />
          ))}
          {yTicks.map((v) => (
            <line key={`gy${v}`} x1={x} y1={sy(v)} x2={x + w} y2={sy(v)} />
          ))}
        </g>
      )}
      <line x1={x} y1={sy(0)} x2={x + w} y2={sy(0)} stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1={sx(0)} y1={y} x2={sx(0)} y2={y + h} stroke="#1a1a1a" strokeWidth="1.5" />
      {xTicks.map((v) => v !== 0 && (
        <g key={`tx${v}`}>
          <line x1={sx(v)} y1={sy(0) - 3} x2={sx(v)} y2={sy(0) + 3} stroke="#1a1a1a" />
          <text x={sx(v)} y={sy(0) + 14} fontSize="11" textAnchor="middle" fill="#444">{v}</text>
        </g>
      ))}
      {yTicks.map((v) => v !== 0 && (
        <g key={`ty${v}`}>
          <line x1={sx(0) - 3} y1={sy(v)} x2={sx(0) + 3} y2={sy(v)} stroke="#1a1a1a" />
          <text x={sx(0) - 6} y={sy(v) + 3} fontSize="11" textAnchor="end" fill="#444">{v}</text>
        </g>
      ))}
      <text x={x + w + 6} y={sy(0) + 4} fontSize="12" fill="#444">{xLabel}</text>
      <text x={sx(0) - 4} y={y - 4} fontSize="12" textAnchor="end" fill="#444">{yLabel}</text>
    </g>
  );
}
