import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const leadsPageRoute: RouteObject = {
  path: '/leads',
  Component: lazy(() => import('./leadsPage').then((module) => ({ default: module.LeadsPage }))),
}
