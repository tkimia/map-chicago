import { useEffect, useState } from "react";
import {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
  MapSourceDataEvent,
  MapStyleDataEvent,
  Point,
} from "react-map-gl/maplibre";
import useUserChoices from "./useUserChoices";

export default function useMapHoverState() {
  const { watch } = useUserChoices();

  const [hoveredFeature, setHoveredFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const [clickedFeature, _setClickedFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const [point, setPoint] = useState<Point | null>(null);
  const [clickedPoint, setClickedPoint] = useState<Point | null>(null);

  const setClickedFeature = (
    map: Omit<MapRef, "getMap">,
    feature: MapGeoJSONFeature
  ) => {
    if (clickedFeature) {
      map.setFeatureState(
        {
          source: clickedFeature.layer.source,
          id: clickedFeature.id as string,
        },
        { clicked: false }
      );
      setClickedPoint(null);
    }

    _setClickedFeature(feature);
    if (!feature.layer?.source) return;
    map.setFeatureState(
      { source: feature.layer.source, id: feature.id as string },
      { clicked: true }
    );

    if (hoveredFeature === feature) {
      setHoveredFeature(null);
    }
  };

  const onMouseMove = (e: MapLayerMouseEvent) => {
    if (!e.features?.length) return;
    const map = e.target;
    const newHoveredFeature = e.features[0];
    const source = newHoveredFeature.layer.source;
    if (hoveredFeature) {
      map.setFeatureState(
        {
          source,
          id: hoveredFeature.id as string,
        },
        { hover: false }
      );
    }
    map.setFeatureState(
      { source: source, id: newHoveredFeature.id },
      { hover: true }
    );
    setHoveredFeature(newHoveredFeature);
    setPoint(e.point);
  };

  const onMouseLeave = (e: MapLayerMouseEvent) => {
    if (hoveredFeature) {
      e.target.setFeatureState(
        {
          source: hoveredFeature.layer.source,
          id: hoveredFeature.id as string,
        },
        { hover: false }
      );
    }
    setHoveredFeature(null);
  };

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "boundaryLayer") {
        setHoveredFeature(null);
        _setClickedFeature(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    hoveredFeature,
    clickedFeature,
    mousePoint: point,
    clickedPoint,
    setClickedFeature,
    events: {
      onMouseMove,
      onMouseLeave,
      onClick: (e: MapLayerMouseEvent) => {
        if (!e.features?.length) return;

        if (clickedFeature === e.features[0]) {
          _setClickedFeature(null);
          setClickedPoint(null);
          return;
        }

        setClickedFeature(e.target, e.features[0]);
        setClickedPoint(e.point);
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
              { source: e.sourceId, id },
              { clicked: true }
            );
          }
        });
      },
    },
  };
}
