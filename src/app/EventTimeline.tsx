// import { JSX } from "react";
// import { MyEvent } from "./types";

// export default function EventTimeline(props: {
//   events: Array<MyEvent>;
// }): JSX.Element {
//   const { events } = props;
//   return (
//     <div className="size-full flex flex-col"></div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

/**
 * MultiRowTimeline
 * ---------------------------------------------
 * A responsive, horizontal, multi-row timeline component.
 * - Uses d3 for time scaling.
 * - Renders both point events (dots) and period events (rectangles).
 * - Supports parallel rows (categories) with labels.
 * - TailwindCSS classes for styling.
 * - TypeScript types for safety.
 *
 * Usage:
 * <MultiRowTimeline
 *   categories={[
 *     {
 *       id: "product",
 *       label: "Product",
 *       color: "#2563eb", // optional, per-category default
 *       items: [
 *         { id: "p1", type: "range", start: new Date("2024-01-01"), end: new Date("2024-07-15"), label: "Alpha" },
 *         { id: "p2", type: "point", date: new Date("2024-10-10"), label: "Launch" },
 *       ],
 *     },
 *     {
 *       id: "marketing",
 *       label: "Marketing",
 *       color: "#059669",
 *       items: [
 *         { id: "m1", type: "range", start: new Date("2024-05-01"), end: new Date("2024-08-31"), label: "Campaign" },
 *         { id: "m2", type: "point", date: new Date("2024-06-15"), label: "Press" },
 *       ],
 *     },
 *   ]}
 *   domainPaddingDays={30}
 *   rowHeight={52}
 *   tickEvery={"month"}
 *   onItemClick={(item) => console.log(item)}
 * />
 */

export type TimelineEvent = {
  id: string;
  type?: "range" | "point";
  start?: Date;
  end?: Date;
  label?: string;
  color?: string; // optional per-item color
  tooltip?: string;
};

export type TimelineItem = TimelineEvent;

export type TimelineCategory = {
  id: string;
  label: string;
  color?: string; // default color for items in this category
  items: TimelineItem[];
};

export type TickEvery = "year" | "quarter" | "month" | "week" | "day" | number; // number means fixed count

export type MultiRowTimelineProps = {
  categories: TimelineCategory[];
  /** Optional domain override */
  domain?: [Date, Date];
  /** Add padding around min/max when domain not provided */
  domainPaddingDays?: number;
  /** Height per row */
  rowHeight?: number;
  /** Space for left labels */
  labelWidth?: number;
  /** Inner chart margins */
  margins?: { top: number; right: number; bottom: number; left: number };
  /** Radius of point events */
  dotRadius?: number;
  /** Rectangle corner radius for ranges */
  rangeRadius?: number;
  /** How often to show ticks */
  tickEvery?: TickEvery;
  /** Format string for tick labels (d3-time-format) */
  tickFormat?: string;
  /** Callback when an item is clicked */
  onItemClick?: (item: TimelineItem, category: TimelineCategory) => void;
  /** Show a simple legend of categories */
  showLegend?: boolean;
  /** Optional className passthrough */
  className?: string;
};

function isRange(i: TimelineItem) {
  return i.type === "range";
}

const DEFAULT_MARGINS = { top: 28, right: 16, bottom: 28, left: 16 };

const useResizeObserver = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [bounds, setBounds] = useState<{
    width: number;
    height: number;
  } | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLElement;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setBounds({ width: cr.width, height: cr.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return bounds;
};

const getAllDatesExtent = (
  categories: TimelineCategory[]
): [Date, Date] | null => {
  const dates: Date[] = [];
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.start != null) {
        if (item.end != null) {
          dates.push(item.start, item.end);
        } else {
          dates.push(item.start);
        }
      }
    });
  });
  if (dates.length === 0) return null;
  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));
  return [min, max];
};

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const ticksFor = (scale: d3.ScaleTime<number, number>, every: TickEvery) => {
  if (typeof every === "number") {
    return scale.ticks(every);
  }
  switch (every) {
    case "year":
      return scale.ticks(d3.timeYear);
    case "quarter":
      return scale.ticks(d3.timeMonth.every(3)!);
    case "month":
      return scale.ticks(d3.timeMonth);
    case "week":
      return scale.ticks(d3.timeWeek);
    case "day":
      return scale.ticks(d3.timeDay);
    default:
      return scale.ticks();
  }
};

const formatFor = (fmt?: string) => {
  if (!fmt) return d3.timeFormat("%b %Y");
  return d3.timeFormat(fmt);
};

const RowGutter = 8; // gap between lanes

const ItemHeight = 22; // bar height for ranges

const MultiRowTimeline: React.FC<MultiRowTimelineProps> = ({
  categories,
  domain,
  domainPaddingDays = 14,
  rowHeight = 30,
  labelWidth = 140,
  margins = DEFAULT_MARGINS,
  dotRadius = 5,
  tickEvery = "month",
  tickFormat,
  onItemClick,
  showLegend = false,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bounds = useResizeObserver(wrapperRef);

  // Dimensions
  const width = bounds?.width ?? 800;
  const height = useMemo(() => {
    const rows = categories.length;
    const inner = rows * rowHeight + (rows - 1) * RowGutter;
    return inner + margins.top + margins.bottom;
  }, [categories.length, rowHeight, margins.bottom, margins.top]);

  // Domain
  const xDomain: [Date, Date] = useMemo(() => {
    if (domain) return domain;
    const ext = getAllDatesExtent(categories);
    if (!ext) {
      const now = new Date();
      return [addDays(now, -7), addDays(now, 7)];
    }
    const [min, max] = ext;
    // Pad
    const paddedMin = addDays(min, -domainPaddingDays);
    const paddedMax = addDays(max, domainPaddingDays);
    return [paddedMin, paddedMax];
  }, [categories, domain, domainPaddingDays]);

  // Scale
  const x = useMemo(() => {
    return d3
      .scaleTime()
      .domain(xDomain)
      .range([
        0,
        Math.max(0, (width || 0) - labelWidth - margins.left - margins.right),
      ])
      .nice();
  }, [xDomain, width, labelWidth, margins.left, margins.right]);

  // Ticks
  const ticks = useMemo(() => ticksFor(x, tickEvery), [x, tickEvery]);
  const fmt = useMemo(() => formatFor(tickFormat), [tickFormat]);

  // Basic tooltip management with a floating div
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    html: string;
    visible: boolean;
  }>({ x: 0, y: 0, html: "", visible: false });

  const handleMouse = (e: React.MouseEvent, item: TimelineItem) => {
    console.log("Hover", item);

    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    let sx = e.clientX;
    let sy = e.clientY;
    if (ctm) {
      const inv = ctm.inverse();
      const loc = pt.matrixTransform(inv);
      sx = loc.x;
      sy = loc.y;
    }
    const title =
      item.label ??
      (item.start != null && item.end != null && isRange(item)
        ? `${d3.timeFormat("%b %d, %Y")(item.start)} – ${d3.timeFormat(
            "%b %d, %Y"
          )(item.end)}`
        : d3.timeFormat("%b %d, %Y")(item.start as Date));
    const detail = isRange(item)
      ? `${d3.timeFormat("%b %d, %Y")(item.start as Date)} – ${d3.timeFormat(
          "%b %d, %Y"
        )(item.end as Date)}`
      : `${d3.timeFormat("%b %d, %Y")(item.start as Date)}`;

    const html = `<div><div class="font-medium">${title}</div><div class="opacity-80">${detail}</div><div class="mt-1">${
      item.tooltip ?? ""
    }</div></div>`;
    setTooltip({ x: sx + 10, y: sy - 10, html, visible: true });
  };

  const hideTooltip = () => setTooltip((t) => ({ ...t, visible: false }));

  // Row helpers
  const rowY = (rowIndex: number) =>
    margins.top + rowIndex * (rowHeight + RowGutter);

  const innerWidth = Math.max(
    0,
    width - labelWidth - margins.left - margins.right
  );

  return (
    <div ref={wrapperRef} className={"w-full " + (className ?? "")}>
      {" "}
      {/* outer responsive container */}
      <div className="shadow-sm">
        {/* Header axis */}
        <div className="px-4 pt-3">
          <div className="relative over overflow-hidden">
            <svg width={width} height={margins.top} className="block">
              <g
                transform={`translate(${labelWidth + margins.left}, ${
                  margins.top - 6
                })`}
              >
                {/* Axis line */}
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={0}
                  y2={0}
                  className="stroke-gray-200"
                />
                {ticks.map((t, i) => (
                  <g key={i} transform={`translate(${x(t)},0)`}>
                    <line y1={0} y2={6} className="stroke-gray-300" />
                    <text
                      dy={18}
                      className="text-[11px] fill-gray-600 select-none"
                      textAnchor="middle"
                    >
                      {fmt(t as Date)}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Main chart */}
        <div className="relative">
          <svg ref={svgRef} width={width} height={height} className="block">
            {/* Background grid */}
            <g transform={`translate(${labelWidth + margins.left}, 0)`}>
              {ticks.map((t, i) => (
                <line
                  key={i}
                  x1={x(t)}
                  x2={x(t)}
                  y1={margins.top}
                  y2={height - margins.bottom}
                  className="stroke-gray-100"
                />
              ))}
            </g>

            {/* Rows */}
            {categories.map((cat, rowIdx) => {
              const y = rowY(rowIdx);
              return (
                <g key={`${cat}-${rowIdx}`} transform={`translate(0, ${y})`}>
                  {/* Row label */}
                  <g transform={`translate(0, 0)`}>
                    <foreignObject
                      x={0}
                      y={-2}
                      width={labelWidth}
                      height={rowHeight}
                    >
                      <div className="h-full flex items-center justify-start pr-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-800">
                          <span
                            className="inline-block w-3 h-3 rounded"
                            style={{ backgroundColor: cat.color ?? "#64748b" }}
                          />
                          <span className="truncate" title={cat.label}>
                            {cat.label}
                          </span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Items lane */}
                  <g transform={`translate(${labelWidth + margins.left}, 0)`}>
                    {/* Baseline */}
                    <line
                      x1={0}
                      x2={innerWidth}
                      y1={rowHeight / 2}
                      y2={rowHeight / 2}
                      className="stroke-gray-200"
                    />

                    {/* Ranges first, then points on top */}
                    {cat.items.filter(isRange).map((item, i) => {
                      const x1 = x(item.start as Date);
                      const x2 = x(item.end as Date);
                      const w = Math.max(2, x2 - x1);
                      return (
                        <g
                          key={`timeline-event-${i}`}
                          className="cursor-pointer"
                          onMouseMove={(e) => handleMouse(e, item)}
                          onMouseLeave={hideTooltip}
                        >
                          <foreignObject
                            x={x1}
                            y={(rowHeight - ItemHeight) / 2}
                            width={w + 2}
                            height={ItemHeight}
                          >
                            <div
                              className="rounded-md flex items-center text-white text-nowrap overflow-ellipsis"
                              style={{
                                width: w,
                                maxWidth: w,
                                maxHeight: ItemHeight,
                                height: ItemHeight,
                                fontSize: "small",
                                opacity: 0.5,
                                backgroundColor:
                                  item.color ?? cat.color ?? "#94a3b833",
                              }}
                              onClick={() => onItemClick?.(item, cat)}
                            >
                              {w > 40 && (
                                <div className="px-1">{item.label}</div>
                              )}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    })}

                    {cat.items
                      .filter((i) => !isRange(i))
                      .map((item, i) => {
                        const cx = x((item as TimelineEvent).start as Date);
                        return (
                          <g
                            key={`timeline-circle-${i}`}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={cx}
                              cy={rowHeight / 2}
                              r={dotRadius}
                              fill={item.color ?? cat.color ?? "#334155"}
                              onMouseMove={(e) =>
                                handleMouse(e, item as TimelineEvent)
                              }
                              onMouseLeave={hideTooltip}
                              onClick={() => onItemClick?.(item, cat)}
                            />
                            {item.label && (
                              <text
                                x={cx + dotRadius + 4}
                                y={rowHeight / 2 + 4}
                                className="text-[11px] fill-gray-800 select-none"
                              >
                                {/* {item.title} */}
                              </text>
                            )}
                          </g>
                        );
                      })}
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              id="tooltip-wrapper"
              className="pointer-events-none absolute rounded-lg border bg-white p-2 shadow-md z-50"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                maxWidth: 280,
                fontSize: "small",
              }}
              dangerouslySetInnerHTML={{ __html: tooltip.html }}
            />
          )}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex flex-wrap gap-3 px-4 py-3 border-t bg-gray-50">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: c.color ?? "#64748b" }}
                />
                <span className="text-gray-700">{c.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiRowTimeline;
