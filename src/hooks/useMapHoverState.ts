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

  const [clickedFeature, setClickedFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const [point, setPoint] = useState<Point | null>(null);

  const onClick = (e: MapLayerMouseEvent) => {
    if (!e.features?.length) return;
    const map = e.target;
    if (clickedFeature) {
      map.setFeatureState(
        { source: opts.sourceId, id: clickedFeature.id as string },
        { clicked: false }
      );
    }

    const clicked = e.features[0];
    setClickedFeature(clicked);
    map.setFeatureState(
      { source: opts.sourceId, id: clicked.id as string },
      { clicked: true }
    );

    if (hoveredFeature === clicked) {
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
    events: {
      onMouseMove,
      onMouseLeave,
      onClick,
    },
  };
}
