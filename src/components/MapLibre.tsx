import useUserChoices from "@/hooks/useUserChoices";
import { boundaries } from "@/lib/data-loader";
import Map, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  CHICAGO_COORDINATES,
  DEFAULT_STYLE,
  MAIN_LAYER,
  MAIN_SOURCE,
} from "../lib/constants";
import AddressSearch from "./AddressSearch";
import useMapHoverState from "@/hooks/useMapHoverState";

import { CardScrollControl } from "./CardScrollControl";
import IntroScreen from "./IntroScreen";
import { ExploreScrollControl } from "./ExploreScrollControl";

export default function MainMap() {
  const { watch, setValue } = useUserChoices();
  const { events, hoveredFeature, mousePoint, setClickedFeature } =
    useMapHoverState({
      sourceId: MAIN_SOURCE,
      layerId: MAIN_LAYER,
    });
  const { boundaryLayer, userAddress, isExploreMode } = watch();
  const selectedBoundary =
    boundaries.find((b) => b.id === boundaryLayer) ?? null;

  return (
    <Map
      initialViewState={{
        longitude: CHICAGO_COORDINATES[1],
        latitude: CHICAGO_COORDINATES[0],
        zoom: 11,
      }}
      mapStyle={"gl-style/style.json"}
      interactiveLayerIds={[MAIN_LAYER]}
      {...events}
    >
      {!userAddress && !isExploreMode && <IntroScreen />}
      <AddressSearch />
      <GeolocateControl
        showUserLocation={false}
        onGeolocate={(e) => {
          setValue("userAddress", {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
            tooltip: "Your location",
          });
        }}
      />
      <FullscreenControl />
      {userAddress && (
        <Marker
          longitude={userAddress.lng}
          latitude={userAddress.lat}
          anchor="bottom"
        />
      )}
      {selectedBoundary && (
        <Source id={MAIN_SOURCE} type="geojson" data={selectedBoundary.data}>
          <Layer
            source={MAIN_SOURCE}
            id={MAIN_LAYER}
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
          {selectedBoundary && selectedBoundary.getTooltip(hoveredFeature)}
        </div>
      )}

      <div className="absolute bottom-4 mx-auto w-11/12 left-1/2 transform -translate-x-1/2">
        {userAddress && (
          <CardScrollControl onClickFeature={setClickedFeature} />
        )}
        {isExploreMode && <ExploreScrollControl />}
      </div>
    </Map>
  );
}
