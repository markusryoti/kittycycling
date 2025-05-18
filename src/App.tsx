import "./App.css";
import AddRideSession from "./components/add-ride-session";
import { DistanceChart } from "./components/distance-chart";
import { TableDemo } from "./components/ride-session-table";
import { RideSessionContextProvider } from "./lib/ride-sessions/ride-sessions";

function App() {
  return (
    <>
      <RideSessionContextProvider>
        <header className="py-12">
          <h1 className="text-5xl font-bold mb-8">Kitty cycling 🚴🏼‍♀️</h1>
          <p className="text-gray-600">Go kitty go</p>
        </header>
        <div className="flex flex-col gap-20">
          <DistanceChart />
          <AddRideSession />
          <TableDemo />
        </div>
      </RideSessionContextProvider>
    </>
  );
}

export default App;
