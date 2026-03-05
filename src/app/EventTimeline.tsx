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
  categories: TimelineCategory[],
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
const RangeLaneGap = 2;

type RowItemLayout = {
  laneById: Record<string, number>;
  laneCount: number;
};

const buildRowItemLayout = (
  items: TimelineItem[],
  pointPaddingMs: number,
): RowItemLayout => {
  const timedItems = items
    .filter((item) => item.start != null)
    .map((item) => {
      const center = item.start?.getTime() ?? 0;
      const start = isRange(item) ? center : center - pointPaddingMs;
      const end = isRange(item)
        ? item.end?.getTime() ?? center
        : center + pointPaddingMs;
      return { id: item.id, start, end };
    })
    .sort((a, b) => a.start - b.start || a.end - b.end);

  const laneEnds: number[] = [];
  const laneById: Record<string, number> = {};
  for (const timedItem of timedItems) {
    let lane = laneEnds.findIndex((laneEnd) => laneEnd < timedItem.start);
    if (lane < 0) {
      lane = laneEnds.length;
      laneEnds.push(timedItem.end);
    } else {
      laneEnds[lane] = timedItem.end;
    }
    laneById[timedItem.id] = lane;
  }
  return { laneById, laneCount: Math.max(1, laneEnds.length) };
};

// const inlineComputedStyles = (
//   source: SVGSVGElement,
//   target: SVGSVGElement,
// ) => {
//   const rootComputed = window.getComputedStyle(source);
//   const rootStyleText = Array.from(rootComputed)
//     .map((prop) => `${prop}:${rootComputed.getPropertyValue(prop)};`)
//     .join("");
//   target.setAttribute("style", rootStyleText);
//   const sourceElements = source.querySelectorAll<HTMLElement>("*");
//   const targetElements = target.querySelectorAll<HTMLElement>("*");
//   sourceElements.forEach((srcEl, idx) => {
//     const tgtEl = targetElements[idx];
//     if (!tgtEl) return;
//     const computed = window.getComputedStyle(srcEl);
//     const styleText = Array.from(computed)
//       .map((prop) => `${prop}:${computed.getPropertyValue(prop)};`)
//       .join("");
//     tgtEl.setAttribute("style", styleText);
//   });
// };

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

  // Zoom state: zoom level and pan offset
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);

  // Drag state for panning
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartPanOffset, setDragStartPanOffset] = useState(0);

  const ItemHeightSingle = dotRadius * 2; // circle height for single events

  // Dimensions
  const width = bounds?.width ?? 800;

  // Base domain (before zoom)
  const baseDomain: [Date, Date] = useMemo(() => {
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

  // Apply zoom to domain
  const xDomain: [Date, Date] = useMemo(() => {
    const [baseMin, baseMax] = baseDomain;
    const baseSpan = baseMax.getTime() - baseMin.getTime();
    const zoomedSpan = baseSpan / zoomLevel;

    // Center point with pan offset
    const centerTime = baseMin.getTime() + baseSpan / 2 + panOffset;

    const min = new Date(centerTime - zoomedSpan / 2);
    const max = new Date(centerTime + zoomedSpan / 2);
    return [min, max];
  }, [baseDomain, zoomLevel, panOffset]);

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
  const pointPaddingMs = useMemo(() => {
    const t0 = x.invert(0).getTime();
    const t1 = x.invert(dotRadius).getTime();
    return Math.abs(t1 - t0);
  }, [x, dotRadius]);
  const rowItemLayouts = useMemo(
    () => categories.map((cat) => buildRowItemLayout(cat.items, pointPaddingMs)),
    [categories, pointPaddingMs],
  );
  const rowHeights = useMemo(() => {
    return rowItemLayouts.map((layout) => {
      const laneHeight =
        layout.laneCount * ItemHeight + (layout.laneCount - 1) * RangeLaneGap;
      return Math.max(rowHeight, laneHeight);
    });
  }, [rowItemLayouts, rowHeight]);
  const rowOffsets = useMemo(() => {
    let y = margins.top;
    return rowHeights.map((h) => {
      const current = y;
      y += h + RowGutter;
      return current;
    });
  }, [rowHeights, margins.top]);
  const height = useMemo(() => {
    const totalRowsHeight = rowHeights.reduce((sum, h) => sum + h, 0);
    const totalGutter = Math.max(0, categories.length - 1) * RowGutter;
    return totalRowsHeight + totalGutter + margins.top + margins.bottom;
  }, [categories.length, rowHeights, margins.bottom, margins.top]);

  // Ticks
  const ticks = useMemo(() => ticksFor(x, tickEvery), [x, tickEvery]);
  const yearTicks = useMemo(() => x.ticks(d3.timeYear), [x]);
  const fmt = useMemo(() => formatFor(tickFormat), [tickFormat]);
  const yearFmt = useMemo(() => d3.timeFormat("%Y"), []);

  // Basic tooltip management with a floating div
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    html: string;
    visible: boolean;
  }>({ x: 0, y: 0, html: "", visible: false });

  const handleMouse = (e: React.MouseEvent, item: TimelineItem) => {
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
          "%b %d, %Y",
        )(item.end)}`
        : d3.timeFormat("%b %d, %Y")(item.start as Date));
    const detail = isRange(item)
      ? `${d3.timeFormat("%b %d, %Y")(item.start as Date)} – ${d3.timeFormat(
        "%b %d, %Y",
      )(item.end as Date)}`
      : `${d3.timeFormat("%b %d, %Y")(item.start as Date)}`;

    const html = `<div><div class="font-medium">${title}</div><div class="opacity-80">${detail}</div><div class="mt-1">${item.tooltip ?? ""
      }</div></div>`;
    setTooltip({ x: sx + 10, y: sy - 10, html, visible: true });
  };

  const hideTooltip = () => setTooltip((t) => ({ ...t, visible: false }));

  // Attach wheel listener with passive: false to allow preventDefault
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const svg = svgRef.current;
      if (!svg) return;

      // Get mouse position relative to the chart area
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - labelWidth - margins.left;

      // Convert mouse position to time domain
      const mouseTime = x.invert(mouseX);
      const [baseMin, baseMax] = baseDomain;
      const baseSpan = baseMax.getTime() - baseMin.getTime();

      // Calculate zoom delta (negative deltaY = zoom in)
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoomLevel = Math.max(0.5, Math.min(50, zoomLevel * zoomDelta));

      // Calculate the mouse position ratio in current domain
      const [currentMin, currentMax] = xDomain;
      const currentSpan = currentMax.getTime() - currentMin.getTime();
      const mouseRatioInDomain =
        (mouseTime.getTime() - currentMin.getTime()) / currentSpan;

      // Calculate new pan offset to keep mouse position stable
      const newSpan = baseSpan / newZoomLevel;
      const centerTime = baseMin.getTime() + baseSpan / 2;
      const desiredMouseTime = mouseTime.getTime();
      const newDomainMin = desiredMouseTime - newSpan * mouseRatioInDomain;
      const newCenter = newDomainMin + newSpan / 2;
      const newPanOffset = newCenter - centerTime;

      setZoomLevel(newZoomLevel);
      setPanOffset(newPanOffset);
    };

    wrapper.addEventListener("wheel", wheelHandler, { passive: false });
    return () => wrapper.removeEventListener("wheel", wheelHandler);
  }, [x, baseDomain, xDomain, zoomLevel, labelWidth, margins.left]);

  // Row helpers
  const rowY = (rowIndex: number) => rowOffsets[rowIndex] ?? margins.top;

  const innerWidth = Math.max(
    0,
    width - labelWidth - margins.left - margins.right,
  );

  // Handle drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate drag on left mouse button
    if (e.button !== 0) return;

    const svg = svgRef.current;
    if (!svg) return;

    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartPanOffset(panOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const svg = svgRef.current;
    if (!svg) return;

    // Calculate pixel delta
    const deltaX = e.clientX - dragStartX;

    // Convert pixel delta to time delta based on current scale
    const [currentMin, currentMax] = xDomain;
    const currentSpan = currentMax.getTime() - currentMin.getTime();
    const pixelToTime = currentSpan / innerWidth;
    const timeDelta = -deltaX * pixelToTime; // Negative for natural drag direction

    setPanOffset(dragStartPanOffset + timeDelta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  /* const handleDownloadSvg = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    clone.setAttribute("width", `${width}`);
    clone.setAttribute("height", `${height}`);
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);

    inlineComputedStyles(svg, clone);

    const serializer = new XMLSerializer();
    const svgText = serializer.serializeToString(clone);
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "timeline.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }; */

  return (
    <div
      ref={wrapperRef}
      className={"w-full " + (className ?? "")}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {" "}
      {/* outer responsive container */}
      <div className="shadow-sm select-none">
        {/* <div className="flex items-center justify-end px-4 pt-3">
          <button
            type="button"
            className="text-xs font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm"
            onClick={handleDownloadSvg}
          >
            Download SVG
          </button>
        </div> */}
        {/* Header axis */}
        <div className="px-4 pt-3">
          <div className="relative over overflow-hidden">
            <svg width={width} height={margins.top} className="block">
              <g
                transform={`translate(${labelWidth + margins.left}, ${margins.top - 6
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
                {yearTicks.map((t, i) => (
                  <g key={`year-${i}`} transform={`translate(${x(t)},0)`}>
                    <text
                      y={-8}
                      className="text-[10px] fill-gray-500 select-none"
                      textAnchor="middle"
                    >
                      {yearFmt(t as Date)}
                    </text>
                  </g>
                ))}
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
              const rowHeightPx = rowHeights[rowIdx] ?? rowHeight;
              const rowItemLayout = rowItemLayouts[rowIdx] ?? {
                laneById: {},
                laneCount: 1,
              };
              const lanesHeight =
                rowItemLayout.laneCount * ItemHeight +
                (rowItemLayout.laneCount - 1) * RangeLaneGap;
              const rangeTopOffset = Math.max(0, (rowHeightPx - lanesHeight) / 2);
              return (
                <g key={`${cat.id}-${rowIdx}`} transform={`translate(0, ${y})`}>
                  {/* Items lane */}
                  <g transform={`translate(${labelWidth + margins.left}, 0)`}>
                    {/* Baseline */}
                    <line
                      x1={0}
                      x2={innerWidth}
                      y1={rowHeightPx / 2}
                      y2={rowHeightPx / 2}
                      className="stroke-gray-200"
                    />

                    {/* Ranges first, then points on top */}
                    {cat.items.filter(isRange).map((item) => {
                      const x1 = x(item.start as Date);
                      const x2 = x(item.end as Date);
                      const w = Math.max(2, x2 - x1);
                      const lane = rowItemLayout.laneById[item.id] ?? 0;
                      const itemY = rangeTopOffset + lane * (ItemHeight + RangeLaneGap);
                      return (
                        <g
                          key={`timeline-event-${item.id}`}
                          className="cursor-pointer"
                          onMouseMove={(e) => handleMouse(e, item)}
                          onMouseLeave={hideTooltip}
                        >
                          <foreignObject
                            x={x1}
                            y={itemY}
                            width={w + 2}
                            height={ItemHeight}
                          >
                            <div
                              className="rounded-md flex items-center text-white text-nowrap overflow-ellipsis opacity-50 hover:opacity-100"
                              style={{
                                width: w,
                                maxWidth: w,
                                maxHeight: ItemHeight,
                                height: ItemHeight,
                                fontSize: "small",
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
                        const lane = rowItemLayout.laneById[item.id] ?? 0;
                        const laneOffset = lane - (rowItemLayout.laneCount - 1) / 2;
                        const cy =
                          rowHeightPx / 2 +
                          laneOffset * (ItemHeightSingle + RangeLaneGap);
                        return (
                          <g
                            key={`timeline-circle-${i}`}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={cx}
                              cy={cy}
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
                                y={cy + 4}
                                className="text-[11px] fill-gray-800 select-none"
                              >
                                {/* {item.title} */}
                              </text>
                            )}
                          </g>
                        );
                      })}
                  </g>
                  {/* Row label */}
                  <g transform={`translate(0, 0)`}>
                    <foreignObject
                      x={0}
                      y={-2}
                      width={labelWidth}
                      height={rowHeightPx}
                    >
                      <div className="h-full flex items-center justify-start pr-3 bg-gray-100">
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
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              id="tooltip-wrapper"
              className="pointer-events-none absolute rounded-lg border bg-white p-2 shadow-md z-50 select-none"
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
