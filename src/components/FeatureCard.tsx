import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Phone, Mail, Home } from "lucide-react";
import { Boundary } from "@/lib/data-loader";
import { CSSProperties } from "react";

type Props = {
  type: Boundary["id"];
  properties: Boundary["data"]["features"][0]["properties"];
  onClick?: () => void;
  className?: string;
  variant?: "light" | "dark";
  style?: CSSProperties;
};

export function FeatureCard({
  type,
  properties,
  className,
  onClick,
  variant = "light",
  style,
}: Props) {
  let title: string;
  let image = properties?.image;
  let name = properties?.name;
  let phone = properties?.phone as string | undefined;
  let email = properties?.email as string | undefined;
  let address = properties?.address as string | undefined;
  let candidates: string[] | undefined = undefined;

  switch (type) {
    case "cook-commissioners":
      title = `District ${properties?.DISTRICT_TXT}`;
      break;
    case "wards":
      title = `Ward ${properties?.ward}`;
      break;
    case "chicago-police":
      title = `${properties?.dist_label?.toLowerCase()} District`;
      image = properties?.image ?? "";
      break;
    case "chicago-school":
      title = properties?.Name;
      for (const key in properties) {
        if (key.startsWith("candidate")) {
          candidates = candidates ?? [];
          candidates.push(properties[key]);
        }
      }
      break;
    case "illinois-house":
    case "illinois-senate":
      title = properties?.name;
      // eslint-disable-next-line no-case-declarations
      const person =
        typeof properties?.person === "string"
          ? JSON.parse(properties.person)
          : properties?.person;
      image = person?.image ?? "";
      name = person?.name;
      phone = person?.phone as string | undefined;
      email = person?.email as string | undefined;
      address = person?.address as string | undefined;
      break;
  }

  return (
    <Card
      className={cn(
        {
          "bg-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300 hover:shadow-xl cursor-pointer":
            variant === "light",
          "bg-gray-800 text-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300 hover:shadow-xl cursor-pointer":
            variant === "dark",
        },
        className
      )}
      style={style}
      onClick={onClick}
    >
      <CardContent className="flex flex-row justify-center gap-4 p-4 w-[350px]">
        <div className="flex flex-col h-full justify-center items-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} className="object-cover" />
            <AvatarFallback className="text-black">?</AvatarFallback>
          </Avatar>
          {name && (
            <Badge variant="secondary" className="text-center max-w-24">
              {name}
            </Badge>
          )}
        </div>
        <div className="flex flex-col space-y-1 h-full grow">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="grid grid-cols-10 place-content-center">
            {phone && (
              <>
                <Phone size={16} className="col-span-1" />
                <p className="col-span-9">{phone}</p>
              </>
            )}
            {email && (
              <>
                <Mail size={16} className="col-span-1" />
                <p className="col-span-9">{email}</p>
              </>
            )}
            {address && (
              <>
                <Home size={16} className="col-span-1" />
                <p className="col-span-9 text-wrap">{address}</p>
              </>
            )}
          </div>
          {candidates && (
            <>
              <p className="text-wrap text-xs italic">
                School board candidates for this district:
              </p>
              <ul>
                {candidates.map((candidate) => (
                  <li>{candidate}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
