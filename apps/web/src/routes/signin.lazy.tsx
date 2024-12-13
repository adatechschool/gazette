import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>coucou</div>
}