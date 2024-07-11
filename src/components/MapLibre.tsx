import useUserChoices from "@/hooks/useUserChoices";
import { boundaries } from "@/lib/data-loader";
import Map, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
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
import { FeatureCard } from "./FeatureCard";
import MainDrawer from "./Drawer";
import { useState } from "react";

export default function MainMap() {
  const [mode, setMode] = useState<"explore" | "representatives" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { watch, setValue } = useUserChoices();
  const { boundaryLayer, userAddress } = watch();
  const selectedBoundary =
    boundaries.find((b) => b.id === boundaryLayer) ?? null;
  const {
    events,
    hoveredFeature,
    mousePoint,
    setClickedFeature,
    clickedFeature,
    clickedPoint,
  } = useMapHoverState({
    sourceId: MAIN_SOURCE,
    layerId: MAIN_LAYER,
    selectedBoundaryId: selectedBoundary?.id,
  });

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
      {!mode && (
        <IntroScreen
          onExplore={() => {
            setMode("explore");
            setDrawerOpen(true);
          }}
        />
      )}
      <AddressSearch
        onFindAddress={() => {
          setMode("representatives");
          setDrawerOpen(true);
        }}
      />
      <GeolocateControl
        position="top-left"
        showUserLocation={false}
        onGeolocate={(e) => {
          e.target._map.flyTo({
            center: [e.coords.longitude, e.coords.latitude],
            zoom: 12,
          });
          setValue("userAddress", {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
            tooltip: "Your location",
          });
          setMode("representatives");
          setDrawerOpen(true);
        }}
      />
      <FullscreenControl position="top-left" />
      <NavigationControl
        position="top-left"
        showCompass={false}
        visualizePitch={false}
      />
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

      {selectedBoundary && hoveredFeature && mousePoint && (
        <FeatureCard
          boundaryType={selectedBoundary.id}
          properties={hoveredFeature.properties}
          className="absolute z-10 border-none"
          style={{ left: mousePoint.x, top: mousePoint.y }}
          variant="dark"
        />
      )}
      {selectedBoundary && clickedFeature && clickedPoint && (
        <FeatureCard
          boundaryType={selectedBoundary.id}
          properties={clickedFeature.properties}
          className="absolute z-10 pointer-events-none border-none"
          style={{ left: clickedPoint.x, top: clickedPoint.y }}
        />
      )}
      <MainDrawer
        className="absolute right-4 top-4"
        title={mode === "representatives" ? "Your Representatives" : "Explore"}
        description={
          mode === "representatives"
            ? "Scroll to see your representatives"
            : "Click on a category to explore its district map"
        }
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        disabled={mode === null}
      >
        {mode === "representatives" && (
          <CardScrollControl onClickFeature={setClickedFeature} />
        )}
        {mode === "explore" && <ExploreScrollControl />}
      </MainDrawer>
    </Map>
  );
}
