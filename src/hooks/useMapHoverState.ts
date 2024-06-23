import { useState } from "react";
import {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
  MapSourceDataEvent,
  MapStyleDataEvent,
  Point,
} from "react-map-gl/maplibre";

export default function useMapHoverState(opts: {
  sourceId: string;
  layerId: string;
}) {
  const [hoveredFeature, setHoveredFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const [clickedFeature, _setClickedFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const [point, setPoint] = useState<Point | null>(null);

  const setClickedFeature = (
    map: Omit<MapRef, "getMap">,
    feature: MapGeoJSONFeature
  ) => {
    if (clickedFeature) {
      map.setFeatureState(
        { source: opts.sourceId, id: clickedFeature.id as string },
        { clicked: false }
      );
    }
    _setClickedFeature(feature);
    if (!map.getSource(opts.sourceId)) return;
    map.setFeatureState(
      { source: opts.sourceId, id: feature.id as string },
      { clicked: true }
    );

    if (hoveredFeature === feature) {
      setHoveredFeature(null);
    }
  };

  const onMouseMove = (e: MapLayerMouseEvent) => {
    if (!e.features?.length) return;
    const map = e.target;
    if (hoveredFeature) {
      map.setFeatureState(
        { source: opts.sourceId, id: hoveredFeature.id as string },
        { hover: false }
      );
    }
    const newId = e.features[0].id as string;
    map.setFeatureState({ source: opts.sourceId, id: newId }, { hover: true });
    setHoveredFeature(e.features[0]);
    setPoint(e.point);
  };

  const onMouseLeave = (e: MapLayerMouseEvent) => {
    if (hoveredFeature) {
      e.target.setFeatureState(
        { source: opts.sourceId, id: hoveredFeature.id as string },
        { hover: false }
      );
    }
    setHoveredFeature(null);
  };

  return {
    hoveredFeature,
    clickedFeature,
    mousePoint: point,
    setClickedFeature,
    events: {
      onMouseMove,
      onMouseLeave,
      onClick: (e: MapLayerMouseEvent) => {
        if (!e.features?.length) return;
        setClickedFeature(e.target, e.features[0]);
      },
      onData: (e: MapStyleDataEvent | MapSourceDataEvent) => {
        if (e.dataType !== "source" || !e.isSourceLoaded) return;
        const source = e.source;
        if (
          source.type !== "geojson" ||
          typeof source.data === "string" ||
          source.data.type !== "FeatureCollection"
        )
          return;

        source.data.features.forEach((feature) => {
          const id = feature.id as string;
          if (id === clickedFeature?.id) {
            e.target.setFeatureState(
              { source: opts.sourceId, id },
              { clicked: true }
            );
          }
        });
      },
    },
  };
}
