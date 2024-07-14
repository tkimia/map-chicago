import { toLayerId } from "@/lib/constants";
import { boundaries, Boundary } from "@/lib/data-loader";
import { Source, Layer } from "react-map-gl/maplibre";
import { centroid } from "@turf/centroid";
import { FeatureCollection, Point } from "geojson";
import { getTitle } from "@/lib/utils";
import React from "react";

type Props = {
  selectedBoundary: Boundary | null;
};

const centroids = boundaries.map(
  (
    boundary
  ): {
    id: string;
    data: FeatureCollection<Point>;
  } => ({
    id: boundary.id,
    data: {
      type: "FeatureCollection",
      features: boundary.data.features.map((feature) => ({
        id: feature.id,
        type: "Feature" as const,
        geometry: {
          type: "Point",
          coordinates: centroid(feature).geometry.coordinates,
        },
        properties: {
          label: getTitle(boundary.id, feature.properties),
        },
      })),
    },
  })
);

export default function SourcesAndLayers({ selectedBoundary }: Props) {
  return boundaries.map((boundary) => (
    <React.Fragment key={boundary.id}>
      <Source id={boundary.id} type="geojson" data={boundary.data}>
        {selectedBoundary === boundary && (
          <>
            <Layer
              source={boundary.id}
              id={toLayerId(boundary.id)}
              type="fill"
              paint={{
                "fill-outline-color": "blue",
                "fill-antialias": true,
                "fill-opacity": 0,
              }}
            />
            <Layer
              source={boundary.id}
              id={`${toLayerId(boundary.id)}-hover`}
              type="line"
              paint={{
                "line-color": "blue",
                "line-width": 2,
                "line-dasharray": [2, 4],
              }}
            />
          </>
        )}
      </Source>
      <Source
        id={boundary.id + "centroid"}
        type="geojson"
        data={centroids.find((c) => c.id === boundary.id)?.data}
      >
        {selectedBoundary === boundary && (
          <Layer
            source={boundary.id + "centroid"}
            id={toLayerId(boundary.id) + "centroid"}
            type="symbol"
            layout={{
              "text-field": ["get", "label"],
              "text-size": 14,
              "text-font": ["Open Sans Bold"],
              "text-anchor": "top",
            }}
            paint={{
              "text-color": "blue",
              "text-halo-color": "white",
              "text-halo-width": 3,
            }}
          />
        )}
      </Source>
    </React.Fragment>
  ));
}
