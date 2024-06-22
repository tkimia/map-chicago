import useUserChoices from "@/hooks/useUserChoices";
import { boundaries } from "@/lib/data-loader";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { CHICAGO_COORDINATES, DEFAULT_STYLE } from "../lib/constants";
import AddressSearch from "./AddressSearch";
import useMapHoverState from "@/hooks/useMapHoverState";

import { CardScrollControl } from "./CardScrollControl";

export default function MainMap() {
  const { watch } = useUserChoices();
  const { events, hoveredFeature, mousePoint } = useMapHoverState({
    sourceId: "boundaries",
    layerId: "active-boundary",
  });
  const { boundaryLayer, userAddress } = watch();
  const selectedBoundary = boundaryLayer ? boundaries[boundaryLayer] : null;

  return (
    <Map
      initialViewState={{
        longitude: CHICAGO_COORDINATES[1],
        latitude: CHICAGO_COORDINATES[0],
        zoom: 11,
      }}
      mapStyle={"gl-style/style.json"}
      interactiveLayerIds={["active-boundary"]}
      {...events}
    >
      <AddressSearch />
      {userAddress && (
        <Marker
          longitude={userAddress.lng}
          latitude={userAddress.lat}
          anchor="bottom"
        />
      )}
      {selectedBoundary && (
        <Source id="boundaries" type="geojson" data={selectedBoundary.data}>
          <Layer
            source="boundaries"
            id="active-boundary"
            type="fill"
            paint={{
              "fill-outline-color": "white",
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
              "fill-color": [
                "case",
                ["boolean", ["feature-state", "clicked"], false],
                "yellow",
                DEFAULT_STYLE.fillColor,
              ],
            }}
          />
        </Source>
      )}
      {hoveredFeature && mousePoint && (
        <div
          className="absolute m-2 p-1 bg-black/60 text-white z-10 pointer-events-none"
          style={{ left: mousePoint.x, top: mousePoint.y }}
        >
          {boundaryLayer &&
            boundaries[boundaryLayer].getTooltip(hoveredFeature)}
        </div>
      )}
      {userAddress && (
        <div className="absolute bottom-4 mx-auto w-11/12 left-1/2 transform -translate-x-1/2">
          <CardScrollControl />
        </div>
      )}
    </Map>
  );
}