import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { boundaries } from "@/lib/data-loader";
import useUserChoices from "@/hooks/useUserChoices";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { FeatureCard } from "./FeatureCard";
import { MapGeoJSONFeature, Map } from "maplibre-gl";
import { useMap } from "react-map-gl/maplibre";

type Props = {
  onClickFeature: (map: Map, feature: MapGeoJSONFeature) => void;
};

export function CardScrollControl({ onClickFeature }: Props) {
  const { watch, setValue } = useUserChoices();
  const { userAddress, boundaryLayer } = watch();
  const { current: map } = useMap();

  if (!userAddress) return null;

  const latLong = point([userAddress.lng, userAddress.lat]);
  const intersections = boundaries.map((boundary) => {
    const feature = boundary.data.features.find(
      (f) => !!booleanPointInPolygon(latLong, f)
    );
    return {
      id: boundary.id,
      name: boundary.name,
      feature,
    };
  });

  return (
    <ScrollArea className="w-full whitespace-nowrap bg-white rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {intersections.map(({ id, name: boundaryName, feature }) => {
          if (!feature) return null;
          return (
            <FeatureCard
              key={boundaryName}
              type={id}
              properties={feature.properties}
              className={boundaryLayer === id ? "border-blue-500" : ""}
              onClick={() => {
                setValue("boundaryLayer", id);
                if (map) {
                  // @ts-expect-error fake mismatch
                  onClickFeature(map, feature);
                }
              }}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
