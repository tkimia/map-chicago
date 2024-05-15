import useUserChoices from "@/hooks/useUserChoices";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import { Polyline } from "leaflet";
import { boundaries } from "@/lib/data-loader";
import { CHICAGO_COORDINATES, DEFAULT_STYLE } from "./map/constants";
import AddressSearch from "./AddressSearch";

export default function MainMap() {
  const { watch } = useUserChoices();
  const { boundaryLayer, userAddress } = watch();
  const selectedBoundary = boundaryLayer ? boundaries[boundaryLayer] : null;

  return (
    <MapContainer
      className="h-full w-full"
      center={CHICAGO_COORDINATES}
      zoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddressSearch />
      {userAddress && (
        <Marker position={[userAddress.lat, userAddress.lng]}>
          {userAddress.tooltip && <Tooltip>{userAddress.tooltip}</Tooltip>}
        </Marker>
      )}
      {selectedBoundary && (
        <GeoJSON
          key={boundaryLayer}
          style={DEFAULT_STYLE}
          data={selectedBoundary.data}
          onEachFeature={(feature, layer) => {
            layer.bindTooltip(selectedBoundary.getTooltip(feature), {
              direction: "center",
            });

            if (layer instanceof Polyline) {
              layer.on("mouseover", function () {
                layer.setStyle({
                  fillColor: "#12329b", // Change color on hover
                  fillOpacity: 0.9,
                });
              });

              layer.on("mouseout", function () {
                layer.setStyle(DEFAULT_STYLE); // Revert to original style
              });
            }
          }}
        />
      )}
    </MapContainer>
  );
}
