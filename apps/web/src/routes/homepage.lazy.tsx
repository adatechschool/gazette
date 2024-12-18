import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/homepage")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>coucou</div>;
}
