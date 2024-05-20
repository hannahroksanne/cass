import { createStore } from 'zustand-x'

export const action = (store, handler) => {
  return (...args) => {
    return store.set.state((state) => {
      return handler(state, ...args)
    })
  }
}

export { createStore }
