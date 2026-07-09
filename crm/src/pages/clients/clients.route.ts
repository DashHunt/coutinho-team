import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const clientsPageRoute: RouteObject = {
  path: '/clients',
  Component: lazy(() => import('./clientsPage').then((module) => ({ default: module.ClientsPage }))),
}

export const clientDetailPageRoute: RouteObject = {
  path: '/clients/:id',
  Component: lazy(() =>
    import('./clientDetailPage').then((module) => ({ default: module.ClientDetailPage })),
  ),
}
