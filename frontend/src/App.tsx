import { Appbar } from "./components/Appbar";
import { Contests } from "./components/Contests";
import { Filter } from "./components/Filter";

function App() {
  return (
    <div className="">
      <Appbar />
      <div className="flex max-w-7xl mx-auto gap-4 pt-4">
        <Filter />
        <Contests />
      </div>
    </div>
  );
}

export default App;
