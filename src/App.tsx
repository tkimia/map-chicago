import MainMap from "./components/MainMap";
import UserChoiceForm from "./components/UserChoiceForm";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <UserChoiceForm className="flex">
      <Sidebar />
      <MainMap />
    </UserChoiceForm>
  );
}

export default App;
