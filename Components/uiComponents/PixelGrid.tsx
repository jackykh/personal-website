import { useEffect, useMemo, useState } from "react";

const CELL = 84; // target cell edge in px

// Fixed pixel grid sitting behind all content. When `color` changes the
// cells flip row-by-row in the direction of travel — scrolling down sweeps
// the new color up from the bottom, scrolling up sweeps it down from the top.
const PixelGrid: React.FC<{ color: string; direction: "up" | "down" }> = ({
  color,
  direction,
}) => {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const measure = () => {
      setGrid({
        cols: Math.max(4, Math.round(window.innerWidth / CELL)),
        rows: Math.max(4, Math.round(window.innerHeight / CELL)),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const delays = useMemo(() => {
    const { cols, rows } = grid;
    if (!cols) return [];
    return Array.from({ length: cols * rows }, (_, i) => {
      const y = Math.floor(i / cols);
      // deterministic per-cell noise (SSR-safe, no Math.random)
      const noise = (((i * 2654435761) % 1000) / 1000) * 50;
      const row = direction === "down" ? rows - 1 - y : y;
      return row * 50 + noise;
    });
  }, [grid, direction]);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none bg-paper">
      <div
        className="h-full w-full grid"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {delays.map((delay, i) => (
          <div
            key={i}
            className="transition-colors duration-[450ms]"
            style={{ backgroundColor: color, transitionDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelGrid;
