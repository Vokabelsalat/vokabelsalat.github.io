import "maplibre-gl/dist/maplibre-gl.css"; // See notes below

import type { MapRef } from "@vis.gl/react-maplibre";
import { Layer, Map, Source } from "@vis.gl/react-maplibre";
import { JSX, useMemo, useRef, useState } from "react";
import { EventTypeColors, MyEvent } from "./types";

const getBoundsForPoints = (points) => {
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
  console.log("cornersLongLat", cornersLongLat);

  return cornersLongLat;
};

export default function EventClusterMap(props: {
  events: Array<MyEvent>;
}): JSX.Element {
  const mapRef = useRef<MapRef>(null);
  const [isClustering, setIsClustering] = useState(true);

  const { events } = props;

  const [mapMarkers, eventTypes] = useMemo(() => {
    const markers = [];
    const types: Record<MyEvent["type"], number> = {};
    for (const event of events) {
      if (Object.keys(types).includes(event.type)) {
        types[event.type] = types[event.type] + 1;
      } else {
        types[event.type] = 1;
      }

      if (event.coordinates) {
        const newMarker = {
          type: "Feature",
          properties: { ...event },
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

  console.log(mapMarkers, events);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 8,
        latitude: 54,
        zoom: 3,
      }}
      minZoom={0}
      maxZoom={20}
      style={{ width: "100%", height: "100%", position: "relative" }}
      mapStyle="https://api.maptiler.com/maps/019864da-bd1a-77a6-8cb4-b2fb2323302f/style.json?key=JryEbN305oNyHUvClr79"
      onLoad={() => {
        mapRef.current?.fitBounds(getBoundsForPoints(events), {
          padding: { top: 40, bottom: 40, left: 10, right: 10 },
        });
      }}
      onClick={(e) => {}}
      interactiveLayerIds={["country-fill"]}
    >
      <Source
        id="micro-source"
        data={{
          type: "FeatureCollection",
          features: mapMarkers,
        }}
        type="geojson"
        generateId={true}
        cluster={isClustering ? true : false}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        {isClustering && (
          <>
            <Layer
              id="clusters"
              type="circle"
              source="micro-source"
              filter={["has", "point_count"]}
              paint={{
                "circle-color": [
                  "step",
                  ["get", "point_count"],
                  "#ff6600",
                  100,
                  "#f1f075",
                  750,
                  "#f28cb1",
                ],
                "circle-radius": [
                  "step",
                  ["get", "point_count"],
                  20,
                  100,
                  30,
                  750,
                  40,
                ],
                // 'circle-emissive-strength': 1,
              }}
            />
            <Layer
              id="cluster-count"
              type="symbol"
              source="micro-source"
              filter={["has", "point_count"]}
              layout={{
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
              }}
            />
          </>
        )}
        <Layer
          id="geojson-fill"
          key={`geojson-fill-${isClustering}`}
          type="circle"
          filter={["!", ["has", "point_count"]]}
          paint={{
            "circle-radius": 6,
            "circle-color": [
              "match",
              ["get", "type"],
              "Teaching",
              EventTypeColors["Teaching"],
              "Position",
              EventTypeColors["Position"],
              "Workshop",
              EventTypeColors["Workshop"],
              "Publication",
              EventTypeColors["Publication"],
              /* other / default */ "#8D99AE",
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          }}
          source="micro-source"
        />
      </Source>
      <div className="absolute top-1 right-1 p-2 shadow-md rounded-md flex flex-col">
        <b>Legend</b>
        {Object.keys(eventTypes).map((type, i) => {
          return (
            <div
              key={`type-legend-${i}`}
              className="w-full flex flex-row items-center gap-1"
            >
              <div
                className="size-1 rounded-full"
                style={{ backgroundColor: EventTypeColors[type] }}
              />
              {type}
            </div>
          );
        })}
      </div>
    </Map>
  );
}
