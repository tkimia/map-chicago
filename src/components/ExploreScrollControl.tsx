import { boundaries } from "@/lib/data-loader";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  activeBoundary?: string;
  onClickBoundary: (boundaryId: string) => void;
};
export function ExploreScrollControl({
  onClickBoundary,
  activeBoundary,
}: Props) {
  return (
    <div className="w-full flex flex-col items-stretch space-y-4 overflow-y-auto">
      {boundaries.map(({ id, name, description }) => (
        <Card
          key={id}
          className={cn(
            {
              "border-blue-500": id === activeBoundary,
            },
            "cursor-pointer w-full transition-colors duration-200 ease-in-out max-w-md text-wrap"
          )}
          onClick={() => onClickBoundary(id)}
        >
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
