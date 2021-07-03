import type { RouteRecordRaw } from 'vue-router'
import { defineComponent, h, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Options, Route } from './types'

export const createRoute = (route: Route, globalPath?: string) => {
  const value: RouteRecordRaw = {
    path: route.path,
    component: async () => {
      const component = await import(/* @vite-ignore */route.component)
      return createComponent(component.default ?? globalThis[globalPath])
    }
  }
  return value
}

export const createRoutes = (routes: Array<Route>) => {
  return routes.map(route => createRoute(route))
}

export const createComponent = (options: Options) => {
  return defineComponent({
    name: options.name,
    setup(_, context) {
      const el = ref()

      const render = () =>
        options.render(el.value, context.attrs)

      const onUnmount = () => 
        el.value && options.onUnmount?.(el.value)
    
      onMounted(() => render())
      onUpdated(() => render())

      onUnmounted(() => onUnmount())
      onBeforeUnmount(() => onUnmount())

      return () => h('div', { ref: el })
    }
  })
}