import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import useUserChoices from "@/hooks/useUserChoices";

// a semi-transparent overlay on the map
export default function IntroScreen() {
  const { setValue } = useUserChoices();
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
      {/* a card centered in its parent */}
      <Card className=" bg-white w-[350px] ">
        <CardHeader>
          <CardTitle>Map Your Districts</CardTitle>
          <CardDescription>
            See your representatives from districts around the city.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center space-y-2 text-center">
          <p className="text-sm font-medium">
            Enter your address above, use your location
          </p>
          <p className="text-sm font-medium">or</p>
          <Button onClick={() => setValue("isExploreMode", true)}>
            Explore
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
