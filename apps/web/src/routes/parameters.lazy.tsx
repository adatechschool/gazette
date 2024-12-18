import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/parameters")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>coucou</div>;
}
