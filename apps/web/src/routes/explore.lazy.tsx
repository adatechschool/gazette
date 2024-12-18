import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>coucou</div>;
}
