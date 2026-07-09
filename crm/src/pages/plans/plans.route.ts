import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const plansPageRoute: RouteObject = {
  path: '/plans',
  Component: lazy(() => import('./plansPage').then((module) => ({ default: module.PlansPage }))),
}
