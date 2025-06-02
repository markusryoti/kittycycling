import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { data, error } = await context.authClient.getSession();

    if (error || !data.session) {
      throw redirect({ to: "/login" });
    }

    throw redirect({ to: "/dashboard" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
