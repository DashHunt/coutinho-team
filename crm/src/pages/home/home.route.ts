import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

export const homePageRoute: RouteObject = {
  path: '/',
  Component: lazy(() => import('./homePage').then((module) => ({ default: module.HomePage }))),
}
