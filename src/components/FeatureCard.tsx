import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  image?: string;
  name?: string;
  onClick: () => void;
  className?: string;
};

export function FeatureCard(props: Props & PropsWithChildren) {
  return (
    <Card
      className={cn(
        "bg-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300 hover:shadow-xl cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      <CardContent className="flex flex-row justify-center gap-4 p-4 w-[350px] h-[150px]">
        <div className="flex flex-col h-full justify-center items-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={props.image} className="object-cover" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          {props.name && <Badge variant="secondary">{props.name}</Badge>}
        </div>
        <div className="flex flex-col space-y-1 h-full grow">
          <h2 className="text-lg font-semibold">{props.title}</h2>
          {props.children}
        </div>
      </CardContent>
    </Card>
  );
}
