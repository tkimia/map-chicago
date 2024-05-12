import { LatLng, LatLngExpression, Map } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Rectangle,
  RectangleProps,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";

export default function TestMap() {
  return (
    <MapContainer
      className="h-full w-full relative"
      center={[52.22977, 21.01178]}
      zoom={18}
      minZoom={7}
      maxZoom={18}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LatLngMessage />
    </MapContainer>
  );
}

function LatLngMessage() {
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);

  const addRectangle = (map: Map) => {
    const bounds = map.getBounds();
    const props: RectangleProps = {
      bounds,
      color: randomColor(),
      weight: 20,
      fillOpacity: 0.1,
    };
    setRectangles((arr) => [...arr, props]);
  };

  const map = useMapEvents({
    dragend: () => addRectangle(map),
    zoomend: () => addRectangle(map),
  });

  return rectangles.map((props, index) => <Rectangle key={index} {...props} />);
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
