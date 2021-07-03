import { defineComponent, h, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Options } from './types'

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