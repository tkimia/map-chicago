import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Phone, Mail, Home, ExternalLink, Map, User } from "lucide-react";
import { Boundary } from "@/lib/data-loader";
import { CSSProperties } from "react";
import { Button } from "./ui/button";

type Props = {
  boundaryType: Boundary["id"];
  boundaryName?: string;
  properties: Boundary["data"]["features"][0]["properties"];
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  variant?: "light" | "dark";
  style?: CSSProperties;
};

export function FeatureCard({
  boundaryType,
  boundaryName,
  properties,
  className,
  onClick,
  variant = "light",
  style,
  isActive = false,
}: Props) {
  let title: string;
  let people: {
    name?: string;
    phone?: string;
    email?: string;
    title?: string;
    address?: string;
    image?: string;
  }[] = [
    {
      image: properties?.image ?? "",
      name: properties?.name,
      phone: properties?.phone as string | undefined,
      email: properties?.email as string | undefined,
      address: properties?.address as string | undefined,
    },
  ];
  let candidates: { name: string; url?: string }[] | undefined = undefined;
  let website: string | undefined = properties?.website;

  switch (boundaryType) {
    case "cook-commissioners":
      title = `District ${properties?.DISTRICT_TXT}`;
      break;
    case "wards":
      title = `Ward ${properties?.ward}`;
      break;
    case "chicago-police": {
      title = `${properties?.dist_label?.toLowerCase()} District Council`;
      let i = 1;
      people = [];
      while (properties && `person_${i}_name` in properties) {
        people.push({
          name: properties[`person_${i}_name`],
          email: properties[`person_${i}_email`],
          title: properties[`person_${i}_title`],
        });
        i++;
      }
      website = properties?.ccpsaUrl;
      break;
    }
    case "chicago-school": {
      title = `District ${properties?.elec_dist}`;
      let i = 1;
      while (properties && `candidate_${i}` in properties) {
        candidates = candidates ?? [];
        candidates.push({
          name: properties[`candidate_${i}`],
          url: properties[`candidate_${i}_url`],
        });
        i++;
      }
      break;
    }
    case "illinois-house":
    case "illinois-senate":
      title = properties?.name;
      // eslint-disable-next-line no-case-declarations
      const person =
        typeof properties?.person === "string"
          ? JSON.parse(properties.person)
          : properties?.person;
      people = [
        {
          image: person?.image ?? "",
          name: person?.name,
          phone: person?.phone as string | undefined,
          email: person?.email as string | undefined,
          address: person?.address as string | undefined,
        },
      ];
      break;
  }

  return (
    <Card
      className={cn(
        {
          "bg-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300":
            variant === "light",
          "bg-gray-800 text-white shadow-md rounded-lg overflow-hidden transition-shadow ease-in-out duration-300":
            variant === "dark",
          "border-2 border-blue-500": isActive,
        },
        className
      )}
      style={style}
    >
      <CardHeader>
        {boundaryName && (
          <CardDescription className="uppercase tracking-wider">
            {boundaryName}
          </CardDescription>
        )}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 w-[350px]">
        {people.map((person) => (
          <div className="flex flex-row justify-center items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={person.image} className="object-cover" />
              <AvatarFallback className="text-black">
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 grow">
              <div className="grid grid-cols-10 place-content-center items-center">
                {person.name && (
                  <p className="col-span-10 font-bold">{person.name}</p>
                )}
                {person.title && (
                  <>
                    <p className="col-span-10 text-sm italic">{person.title}</p>
                  </>
                )}
                {person.phone && (
                  <>
                    <Phone size={16} className="col-span-1" />
                    <p className="col-span-9">{person.phone}</p>
                  </>
                )}
                {person.email && (
                  <>
                    <Mail size={16} className="col-span-1" />
                    <p className="col-span-9">{person.email}</p>
                  </>
                )}
                {person.address && (
                  <>
                    <Home size={16} className="col-span-1" />
                    <p className="col-span-9 text-wrap">{person.address}</p>
                  </>
                )}
              </div>
              {candidates && (
                <>
                  <p className="text-wrap text-xs italic">
                    School board candidates for this district:
                  </p>
                  <ul>
                    {candidates.map((candidate) =>
                      candidate.url ? (
                        <li key={candidate.name}>
                          <a
                            href={candidate.url}
                            className="text-blue-600 underline flex"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {candidate.name}{" "}
                            <ExternalLink className="ml-1" size={12} />
                          </a>
                        </li>
                      ) : (
                        <li key={candidate.name}>{candidate.name}</li>
                      )
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end space-x-3">
        {website && (
          <a href={website} target="_blank" rel="noreferrer">
            <Button type="button" size="sm">
              <ExternalLink size={16} className="mr-2" />
              Website
            </Button>
          </a>
        )}
        <Button type="button" size="sm" onClick={onClick} disabled={isActive}>
          <Map size={16} className="mr-2" />
          Map
        </Button>
      </CardFooter>
    </Card>
  );
}
