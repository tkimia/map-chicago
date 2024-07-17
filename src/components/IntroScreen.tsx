import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type Props = {
  onExplore: () => void;
};

// a semi-transparent overlay on the map
export default function IntroScreen({ onExplore }: Props) {
  return (
    <div className="absolute inset-0 backdrop-blur-lg flex items-center justify-center z-10">
      {/* a card centered in its parent */}
      <Card className=" bg-white w-[350px] ">
        <CardHeader>
          <CardTitle className="text-center">Map Your Districts</CardTitle>
          <CardDescription className="text-center">
            See your representatives from districts around the city.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center space-y-2 text-center">
          <p className="text-sm font-medium">
            Enter your address above, use your location
          </p>
          <p className="text-sm font-medium">or</p>
          <Button onClick={onExplore}>Explore</Button>
        </CardContent>
      </Card>
    </div>
  );
}
