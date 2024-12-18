import AppTitleHeaderCC from "@/components/custom/AppTitleHeaderCC";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppTitleHeaderCC />;
}
