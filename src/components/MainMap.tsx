import useUserChoices from "@/hooks/useUserChoices";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { boundaries } from "@/lib/data-loader";

export default function MainMap() {
  const { watch } = useUserChoices();
  const { boundaryLayer } = watch();
  const selectedBoundary = boundaryLayer ? boundaries[boundaryLayer] : null;

  return (
    <MapContainer
      className="h-full w-full"
      center={[41.85, -87.72]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedBoundary && (
        <GeoJSON
          key={boundaryLayer}
          data={selectedBoundary.data}
          onEachFeature={(feature, layer) => {
            layer.bindTooltip(selectedBoundary.getTooltip(feature), {
              direction: "center",
              permanent: true,
            });
          }}
        />
      )}
    </MapContainer>
  );
}
