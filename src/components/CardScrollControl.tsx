import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { boundaries } from "@/lib/data-loader";
import useUserChoices from "@/hooks/useUserChoices";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { isDefined } from "@/lib/utils";
import { FeatureCard } from "./FeatureCard";

export function CardScrollControl() {
  const { watch } = useUserChoices();
  const { userAddress } = watch();

  if (!userAddress) return null;

  const latLong = point([userAddress.lng, userAddress.lat]);
  const features = Object.values(boundaries)
    .map((boundary) => {
      const feature = boundary.data.features.find(
        (f) => !!booleanPointInPolygon(latLong, f)
      );
      return feature;
    })
    .filter(isDefined);

  return (
    <ScrollArea className="w-full whitespace-nowrap bg-white rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {features.map((feature, idx) => (
          <FeatureCard
            key={feature.id ?? idx}
            image={feature.properties?.image ?? ""}
            name={feature.properties?.name}
            onClick={() => {}}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
