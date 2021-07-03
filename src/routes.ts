import type { RouteRecordRaw } from 'vue-router'
import type { Route } from './types'

import { createComponent } from './component'

export const createRoute = (route: Route, globalPath?: string) => {
  const value: RouteRecordRaw = {
    path: route.path,
    component: async () => {
      const component = await import(/* @vite-ignore */route.component)
      return createComponent({ ...component.default, route } ?? globalThis[globalPath])
    }
  }
  return value
}

export const createRoutes = (routes: Array<Route>) => {
  return routes.map(route => createRoute(route))
}