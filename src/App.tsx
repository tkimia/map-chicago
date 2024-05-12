import MainMap from "./components/MainMap";
import UserChoiceForm from "./components/UserChoiceForm";
import Sidebar from "./components/Sidebar";
import UserChoiceOptions from "./components/UserChoiceOptions";

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
