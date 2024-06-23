//import { Input } from "@/components/ui/input";
import Radar from "radar-sdk-js";
import { useEffect } from "react";
import { CHICAGO_COORDINATES } from "../lib/constants";
import React from "react";
import useUserChoices from "@/hooks/useUserChoices";
import { useMap } from "react-map-gl/maplibre";

type RadarAddress = {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  addressLabel: string;
};

export default function AddressSearch() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { setValue } = useUserChoices();
  const { current: map } = useMap();

  useEffect(() => {
    if (!ref.current?.children.length) {
      Radar.ui.autocomplete({
        container: "search-address",
        near: {
          latitude: CHICAGO_COORDINATES[0],
          longitude: CHICAGO_COORDINATES[1],
        },
        onSelection(selection: RadarAddress) {
          map?.flyTo({ center: [selection.longitude, selection.latitude] });
          setValue("userAddress", {
            lat: selection.latitude,
            lng: selection.longitude,
            tooltip: selection.addressLabel,
          });
        },
      });
    }
  }, [setValue, map]);

  return (
    <div
      ref={ref}
      id="search-address"
      className="absolute top-4 z-[999] w-11/12 mx-14"
    />
  );
}
