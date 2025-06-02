import AddRideSession from "@/components/add-ride-session";
import { DistanceChart } from "@/components/distance-chart";
import Footer from "@/components/footer";
import { TableDemo } from "@/components/ride-session-table";
import { RideSessionContextProvider } from "@/lib/ride-sessions/ride-sessions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    const { data, error } = await context.authClient.getSession();

    if (error) {
      throw redirect({ to: "/login" });
    }

    console.log("user logged in", data);
  },
  component: Index,
});

function Index() {
  return (
    <RideSessionContextProvider>
      <main className="container mx-auto px-4 md:px-8">
        <header className="py-14 text-center">
          <h1 className="text-5xl font-bold mb-8">Kitty cycling 🚴🏼‍♀️</h1>
          <p className="text-gray-600">Go kitty go</p>
        </header>
        <div className="flex flex-col items-center gap-20">
          <DistanceChart />
          <div className="flex flex-col md:flex-row gap-10 justify-between pb-20">
            <AddRideSession />
            <TableDemo />
          </div>
        </div>
      </main>
      <Footer />
    </RideSessionContextProvider>
  );
}
