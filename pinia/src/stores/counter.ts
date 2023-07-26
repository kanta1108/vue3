import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

interface CounterState {
  count: Ref<number>
  doubleCount: Ref<number>
  tripleCount: Ref<number>
  increment: () => void
}


export const useCounterStore = defineStore('counter', (): CounterState => {
  const count= ref(0)
  const doubleCount = computed(() => count.value * 2)
  const tripleCount = computed(() => count.value * 3)
  const increment=()=> {
    count.value++
  }
  return { count, doubleCount,tripleCount, increment }
})
