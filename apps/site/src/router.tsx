import { createRouter } from '@tanstack/react-router'
import { DefaultCatchBoundary, NotFound } from '~/components/index.tsx'
import { routeTree } from '~/route-tree.gen.ts'

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  })

  return router
}
