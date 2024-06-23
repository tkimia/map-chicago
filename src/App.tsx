import MainMap from "./components/MapLibre";
import UserChoiceForm from "./components/UserChoiceForm";
import Radar from "radar-sdk-js";

Radar.initialize(import.meta.env.VITE_RADAR_PUBLISHABLE_KEY);

function App() {
  return (
    <UserChoiceForm className="flex">
      <MainMap />
    </UserChoiceForm>
  );
}

export default App;
