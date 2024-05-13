import { Input } from "@/components/ui/input";

export default function AddressSearch() {
  return (
    <Input
      type="text"
      placeholder="Search for an address"
      className="absolute top-4 z-[999] w-11/12 mx-14"
    />
  );
}
