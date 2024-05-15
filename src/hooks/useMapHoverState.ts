import { useState } from "react";
import {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  Point,
} from "react-map-gl/maplibre";

export default function useMapHoverState(opts: {
  sourceId: string;
  layerId: string;
}) {
  const [hoveredFeature, setHoveredFeature] =
    useState<MapGeoJSONFeature | null>(null);
  const [point, setPoint] = useState<Point | null>(null);
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
    mousePoint: point,
    events: {
      onMouseMove,
      onMouseLeave,
    },
  };
}
