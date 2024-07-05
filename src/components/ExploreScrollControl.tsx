import { boundaries } from "@/lib/data-loader";
import useUserChoices from "@/hooks/useUserChoices";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ExploreScrollControl() {
  const { watch, setValue } = useUserChoices();
  const { boundaryLayer } = watch();

  return (
    <div className="w-full flex flex-col space-y-4 overflow-auto">
      {boundaries.map(({ id, name, description }) => (
        <Card
          key={id}
          className={cn(
            {
              "border-blue-500": id === boundaryLayer,
            },
            "cursor-pointer  transition-colors duration-200 ease-in-out max-w-md text-wrap"
          )}
          onClick={() => setValue("boundaryLayer", id)}
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
