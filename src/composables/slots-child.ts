import type { VNodeArrayChildren } from 'vue'

export function useSlotChild() {
  const children = shallowRef<VNodeArrayChildren>([])
  const instance = getCurrentInstance()

  watchEffect(() => {
    if (!instance || !instance.slots.default) {
      children.value = []
      return
    }

    children.value = instance.slots.default().map((vnode) => {
      return vnode.children as VNodeArrayChildren
    }).flat()
  })

  return children
}
