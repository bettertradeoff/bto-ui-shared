import type { AnyAction, Store } from 'redux'
import type { ComputedRef, Plugin } from 'vue'

export type Data = Record<string, unknown>

export function defineComponent(options: Options) {
  return options
}

export interface CreateVueOptions {
  plugins?: Plugin[]
}

export interface Options {
  name?: string
  render(element: Element, attrs?: Data): void
  onUnmount?(element: Element): void | boolean
}

export interface Action {
  type: symbol | string
  payload?: any
}

export interface Reducer<T> {
  (state: T, action: Action): T | Promise<T>
}

export interface CallbackFn<T> {
  (state?: T): void
}

export interface ComputedGetter<T, S> {
  (state: T): S
}

export interface StoreOptions<T> {
  key: string
  state?: T
  reducer?: Reducer<T>
}

export interface KoalaStore<S> {
  dispatch(action: AnyAction): void
  watch<T>(fn: ComputedGetter<S, T>): void
  getter<T>(fn: ComputedGetter<S, T>): ComputedRef<T>
  store: Store<S, AnyAction>
  subscribe(listener: () => void): void
}