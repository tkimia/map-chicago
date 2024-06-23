import { Boundary } from "@/lib/data-loader";
import { Phone, Mail, Home } from "lucide-react";

type Props = {
  id: Boundary["id"];
  properties: Boundary["data"]["features"][0]["properties"];
};

export default function CardDetails({ id, properties }: Props) {
  let phone = properties?.phoneNumbers?.[0] as string | undefined;
  let email = properties?.emails?.[0] as string | undefined;
  let address = properties?.addresses?.[0] as string | undefined;

  switch (id) {
    case "illinois-house":
    case "illinois-senate":
      phone = properties?.person.phone as string | undefined;
      email = properties?.person.email as string | undefined;
      address = properties?.person.address as string | undefined;
      break;
  }

  return (
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
  );
}
