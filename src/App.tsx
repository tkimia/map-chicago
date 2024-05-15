import MainMap from "./components/map/MapLibre";
import UserChoiceForm from "./components/UserChoiceForm";
import Sidebar from "./components/Sidebar";
import UserChoiceOptions from "./components/UserChoiceOptions";
import Radar from "radar-sdk-js";

Radar.initialize(import.meta.env.VITE_RADAR_PUBLISHABLE_KEY);

function App() {
  return (
    <UserChoiceForm className="flex">
      <Sidebar>
        <UserChoiceOptions />
      </Sidebar>
      <MainMap />
    </UserChoiceForm>
  );
}

export default App;
