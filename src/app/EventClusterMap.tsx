import "maplibre-gl/dist/maplibre-gl.css"; // See notes below

import type { MapRef } from "@vis.gl/react-maplibre";
import { Layer, Map, Marker, Source } from "@vis.gl/react-maplibre";
import { JSX, useCallback, useMemo, useRef, useState } from "react";
import { Category } from "./page";
import { EventType, EventTypeColors, MyEvent } from "./types";

interface MyGeometry {
  coordinates: { lat: number; lon: number };
}

function createDonutChart(
  props: Record<string, object>,
  dataKeys: Array<string>,
  colors: Record<string, unknown>,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
  id: string,
) {
  console.log("PROPS", props);
  const offsets : Array<number> = [];

  const grouped = Object.fromEntries(
    Object.entries(props).filter(([key, val]) => { return dataKeys.includes(key) && typeof val === "number"; })
  ) as unknown as Record<string, number>;

  const sortedGroupedKeys = Object.keys(grouped).sort().reverse();

  let total = 0;
  for (const group of sortedGroupedKeys) {
    offsets.push(total);
    total = total + grouped[group];
  }

  if (total === 0) {
    return <></>;
  }

  // const fontSize =
  //   total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  let r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
  if (props.point_count == null || (props.point_count as unknown as number) <= 1) {
    r = r - 8;
  }
  const r0 = (props.point_count as unknown as number) > 1 ? Math.round(r * 0.6) : 0;
  const w = r * 2;

  return (
    <div
      className="hover:scale-150"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseEnter}
      id={id}
      key={id}
    >
      <svg
        width={`${w}`}
        height={`${w}`}
        viewBox={`0 0 ${w} ${w}`}
        textAnchor="middle"
      >
        <circle
          cx={r}
          cy={r}
          r={r}
          fill="white"
          fillOpacity={0.65}
          stroke={"none"}
        ></circle>
        <g transform={"translate(1, 1)"}>
          {sortedGroupedKeys.map((item, index) => {
            return donutSegment(
              offsets[index] / total,
              (offsets[index] + grouped[item]) / total,
              r - 1,
              r0,
              colors[item] as string,
              `donut-segment-${index}`,
            );
          })}
        </g>
        {(props.point_count as unknown as number) > 1 && (
          <text dominantBaseline="central" transform={`translate(${r}, ${r})`}>
            {total.toLocaleString()}
          </text>
        )}
      </svg>
    </div>
  );
}

function donutSegment(start : number, end:number, r:number, r0:number, color:string, key:string) {
  if (end - start === 1) end -= 0.00001;
  const a0 = 2 * Math.PI * (start - 0.25);
  const a1 = 2 * Math.PI * (end - 0.25);
  const x0 = Math.cos(a0),
    y0 = Math.sin(a0);
  const x1 = Math.cos(a1),
    y1 = Math.sin(a1);
  const largeArc = end - start > 0.5 ? 1 : 0;

  return (
    <path
      key={key}
      d={`M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${
        r + r * y0
      } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${
        r + r0 * x1
      } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0}`}
      fill={`${color}`}
    />
  );
}

const getBoundsForPoints = (points: Array<MyGeometry>) => {
  // Calculate corner values of bounds
  const pointsLong = points
    .filter((point) => point.coordinates != null)
    .map((point) => point.coordinates.lon);
  const pointsLat = points
    .filter((point) => point.coordinates != null)
    .map((point) => point.coordinates.lat);
  const cornersLongLat = [
    [Math.min(...pointsLong), Math.min(...pointsLat)],
    [Math.max(...pointsLong), Math.max(...pointsLat)],
  ];

  return cornersLongLat;
};

export default function EventClusterMap(props: {
  events: Array<MyEvent>;
  categories: Array<Category>;
}): JSX.Element {
  const mapRef = useRef<MapRef>(null);
  const [isClustering] = useState(true);

  const { events, categories } = props;

  const [donutClusterMarkers, setDonutClusterMarkers] = useState<Array<JSX.Element>>([]);

  const [mapMarkers, eventTypes] = useMemo(() => {
    const markers = [];
    const types: Record<MyEvent["type"], number> = {
      Position: 0,
      Workshop: 0,
      Publication: 0,
      Teaching: 0,
    };
    for (const event of events) {
      if (Object.keys(types).includes(event.type)) {
        types[event.type] = types[event.type] + 1;
      } else {
        types[event.type] = 1;
      }

      if (event.coordinates) {
        const newMarker: GeoJSON.Feature<GeoJSON.Point, MyEvent> = {
          type: "Feature" as const,
          properties: { ...event, [event.type]: 1 },
          geometry: {
            type: "Point",
            coordinates: [event.coordinates.lon, event.coordinates.lat],
          },
        };
        markers.push(newMarker);
      }
    }

    return [markers, types];
  }, [events]);

  const updateDonutClusterMarkers = useCallback(() => {
    const newMarkers = [];
    if (mapRef.current != null) {
      const features = mapRef.current.querySourceFeatures("events-source");
      const clusterPropertiesKey = Object.keys(eventTypes);

      const categoryColors : Record<string, string> = {};
      for (const item of categories) {
        categoryColors[item.label] = item.color;
      }

      let index = 0;
      const clusteredIDs: Array<string> = [];
      for (const feat of features) {
        const markerKey = `marker-${index}`;

        // const onMouseLeave = () => {
        //   updateTooltip(null);
        //   setHighlightedCluster(null);
        // };

        // const onMouseEnter = (e) => {
        //   let splitSites = feat.properties.sites?.trim().split(" ");
        //   if (splitSites == null) {
        //     splitSites = [feat.properties.site_id];
        //   }

        //   updateTooltip(
        //     <div className="flex flex-col text-xs max-w-56">
        //       <span className="font-bold">Production Methods</span>
        //       <div>
        //         {Object.keys(categoryColors)
        //           .filter((e) => feat.properties[e] > 0)
        //           .map((e, i) => {
        //             return (
        //               <div
        //                 className="flex gap-1"
        //                 key={`prodmethod-tooltip-${i}`}
        //               >
        //                 <div
        //                   className="size-2 rounded-md self-center"
        //                   style={{ backgroundColor: categoryColors[e] }}
        //                 />
        //                 <>
        //                   {e}: {feat.properties[e]}
        //                 </>
        //               </div>
        //             );
        //           })}
        //       </div>
        //       <span className="font-bold">Sites</span>
        //       <div className="">
        //         {splitSites.length > 20
        //           ? `${splitSites.slice(0, 20).join(", ")} +${splitSites.length - 20} more`
        //           : splitSites.join(", ")}
        //       </div>
        //     </div>,
        //   );
        //   setHighlightedCountry(null);
        //   setHighlightedHexagon(null);
        //   setHighlightedCluster(feat.properties.cluster_id);
        // };

        if (
          feat.properties.cluster_id == null ||
          !clusteredIDs.includes(feat.properties.cluster_id)
        ) {
          const point = feat.geometry as GeoJSON.Point;
          newMarkers.push(
            <Marker
              key={markerKey}
              longitude={point.coordinates[0]}
              latitude={point.coordinates[1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                if (feat && feat.properties) {
                  const sitesArray = [
                    ...new Set(feat.properties.sites.split(" ")),
                  ];
                  const newSitesText =
                    sitesArray.length > 20
                      ? `${sitesArray.slice(0, 20).join(", ")} +${sitesArray.length - 20} more`
                      : sitesArray.join(", ");

                  feat.properties.sitesText = newSitesText;
                  // setPopupInfo(feat);
                }
              }}
            >
              {createDonutChart(
                feat.properties,
                clusterPropertiesKey,
                categoryColors,
                () => {},
                () => {},
                // onMouseEnter,
                // onMouseLeave,
                markerKey,
              )}
            </Marker>,
          );
          clusteredIDs.push(feat.properties.cluster_id);
        }
        index = index + 1;
      }
    }
    setDonutClusterMarkers(newMarkers);
  }, [eventTypes, categories]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 8,
        latitude: 54,
        zoom: 3,
      }}
      onRender={() => {
        updateDonutClusterMarkers();
      }}
      minZoom={0}
      maxZoom={20}
      style={{ width: "100%", height: "100%", position: "relative" }}
      mapStyle="https://api.maptiler.com/maps/019864da-bd1a-77a6-8cb4-b2fb2323302f/style.json?key=JryEbN305oNyHUvClr79"
      onLoad={() => {
        mapRef.current?.fitBounds(
          getBoundsForPoints(events) as maplibregl.LngLatBoundsLike,
          {
            padding: { top: 40, bottom: 40, left: 10, right: 10 },
          },
        );
      }}
      interactiveLayerIds={["country-fill"]}
    >
      <Source
        id="events-source"
        data={{
          type: "FeatureCollection",
          features: mapMarkers,
        }}
        type="geojson"
        generateId={true}
        cluster={isClustering ? true : false}
        clusterMaxZoom={14}
        clusterRadius={50}
        clusterProperties={{
          Position: ["+", ["case", ["==", ["get", "type"], "Position"], 1, 0]],
          Workshop: ["+", ["case", ["==", ["get", "type"], "Workshop"], 1, 0]],
          Publication: [
            "+",
            ["case", ["==", ["get", "type"], "Publication"], 1, 0],
          ],
          Teaching: ["+", ["case", ["==", ["get", "type"], "Teaching"], 1, 0]],
        }}
      >
        <Layer
          id="geojson-fill"
          key={`geojson-fill-${isClustering}`}
          type="circle"
          filter={["!", ["has", "point_count"]]}
          paint={{ "circle-radius": 0 }}
          source="events-source"
        />
        {donutClusterMarkers}
      </Source>
      <div className="absolute top-1 right-1 p-1 shadow-md rounded-md flex flex-col bg-white/50">
        <b>Legend</b>
        {Object.keys(eventTypes).map((type, i) => {
          return (
            <div
              key={`type-legend-${i}`}
              className="w-full flex flex-row items-center gap-1"
            >
              <div
                className="size-1 rounded-full"
                style={{ backgroundColor: EventTypeColors[type as EventType] }}
              />
              {type}
            </div>
          );
        })}
      </div>
    </Map>
  );
}
