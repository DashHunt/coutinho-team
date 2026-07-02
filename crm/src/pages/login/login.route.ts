import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const loginPageRoute: RouteObject = {
  path: '/login',
  Component: lazy(() => import('./loginPage').then((module) => ({ default: module.LoginPage }))),
}
