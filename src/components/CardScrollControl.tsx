import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { boundaries } from "@/lib/data-loader";
import useUserChoices from "@/hooks/useUserChoices";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { FeatureCard } from "./FeatureCard";

export function CardScrollControl() {
  const { watch, setValue } = useUserChoices();
  const { userAddress } = watch();

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
          let title: string;
          let image = feature.properties?.image;
          let name = feature.properties?.name;
          switch (id) {
            case "wards":
              title = `Ward ${feature.properties?.ward}`;
              break;
            case "chicago-police":
              title = `${feature.properties?.dist_label?.toLowerCase()} District`;
              image = feature.properties?.image ?? "";
              break;
            case "chicago-school":
              title = feature.properties?.Name;
              break;
            case "zip-codes":
              title = feature.properties?.zip;
              break;
            case "illinois-house":
            case "illinois-senate":
              title = feature.properties?.name;
              image = feature.properties?.person.image ?? "";
              name = feature.properties?.person.name;
              break;
          }

          return (
            <FeatureCard
              key={boundaryName}
              title={title}
              image={image}
              name={name}
              onClick={() => setValue("boundaryLayer", id)}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
