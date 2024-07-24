//import { Input } from "@/components/ui/input";
import Radar from "radar-sdk-js";
import { useEffect } from "react";
import { CHICAGO_COORDINATES } from "../lib/constants";
import React from "react";
import useUserChoices from "@/hooks/useUserChoices";
import { useMap } from "react-map-gl/maplibre";
import { cn } from "@/lib/utils";

type RadarAddress = {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  addressLabel: string;
};

type Props = {
  className?: string;
  onFindAddress: () => void;
};

export default function AddressSearch({ className, onFindAddress }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { setValue } = useUserChoices();
  const { current: map } = useMap();

  useEffect(() => {
    if (!ref.current?.children.length) {
      const ui = Radar.ui.autocomplete({
        container: "search-address",
        near: {
          latitude: CHICAGO_COORDINATES[0],
          longitude: CHICAGO_COORDINATES[1],
        },
        minCharacters: 3,
        onSelection(selection: RadarAddress) {
          map?.flyTo({ center: [selection.longitude, selection.latitude] });
          setValue("userAddress", {
            lat: selection.latitude,
            lng: selection.longitude,
            tooltip: selection.addressLabel,
          });
          onFindAddress();
        },
      });
      ui.inputField.tabIndex = 1;
    }
  }, [setValue, map, onFindAddress]);

  return (
    <div
      ref={ref}
      id="search-address"
      className={cn("absolute top-2 left-14 right-14 z-20", className)}
    />
  );
}
