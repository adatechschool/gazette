import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/welcome"!</div>;
}
