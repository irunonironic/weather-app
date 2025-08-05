import React, { useEffect, useRef } from "react";

const TemperatureChart = ({ data }) => {
  if (!data || data.length < 2) return null;

  const pathRef = useRef(null);
  const width = 600;
  const height = 80;
  const paddingX = 40;
  const paddingY = 24;

  const minTemp = Math.min(...data.map(d => parseFloat(d.temp)));
  const maxTemp = Math.max(...data.map(d => parseFloat(d.temp)));
  const tempRange = maxTemp - minTemp || 1;

  const pointCount = data.length;
  const gapX = (width - 2 * paddingX) / (pointCount - 1);

  const points = data.map((d, i) => {
    const x = paddingX + i * gapX;
    const y = paddingY + ((maxTemp - parseFloat(d.temp)) / tempRange) * (height - 2 * paddingY);
    return { x, y, temp: d.temp };
  });

  const generateSmoothPath = (points) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cx = (p1.x + p2.x) / 2;
      d += ` Q ${cx} ${p1.y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect(); // force reflow
      path.style.transition = "stroke-dashoffset 1.2s ease-out";
      path.style.strokeDashoffset = "0";
    }
  }, [data]);

  return (
  <div className="relative h-[100px]  ">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full ">
        {/* Animated path */}
        <path
          ref={pathRef}
          d={generateSmoothPath(points)}
          stroke="black"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Celsius values */}
        {points.map((p, idx) => (
          <text
            key={idx}
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            fontSize="10"
            fill="black"
            className="font-semibold"
          >
            {p.temp}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default TemperatureChart;
