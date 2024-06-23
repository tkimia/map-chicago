import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  image?: string;
  name?: string;
  onClick: () => void;
  className?: string;
};

export function FeatureCard(props: Props) {
  return (
    <Card
      className={cn(
        "bg-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300 hover:shadow-xl cursor-pointer w-[350px]",
        props.className
      )}
      onClick={props.onClick}
    >
      <CardContent className="flex flex-row items-center gap-4 p-4">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={props.image} className="object-cover" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          {props.name && <Badge variant="secondary">{props.name}</Badge>}
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{props.title}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
