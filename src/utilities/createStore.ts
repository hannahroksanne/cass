import { State } from 'leva/dist/declarations/src/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// Store cluster.
const stores = {}
window.getStores = () => stores

type ZustandT = [['zustand/immer', never]]

type ActionT<StateT> = (state: StateT, ...args: any[]) => void
type ActionsT<StateT> = Record<string, ActionT<StateT>>

type CreateStoreOptionsT<StateT> = {
  id: string
  actions?: ActionsT<StateT>
  helpers?: ActionsT<StateT>
  initialState?: StateT
}

const registerStore = (id: string, initialState) => {
  stores[id] = { id, initialState }
  return stores[id]
}

type FinalStoreT<StateT> = {
  id: string
  use: any
  state: StateT
  initialState: StateT
  reset: () => void
  subscribe: any
}

type CreateStoreT = <StateT>(options: CreateStoreOptionsT<StateT>) => FinalStoreT<StateT>

export const createStore: CreateStoreT = <StateT>(options: CreateStoreOptionsT<StateT>) => {
  const helpers = options.helpers || {}
  const actions = options.actions || {}

  const initializeStateAndStore = (set: any, get: any) => {
    const store = registerStore(options.id, options.initialState)
    store.reset = () => set(store.initialState)

    const actionsEntries = Object.entries(actions) as [string, ActionT<StateT>][]
    const helpersEntries = Object.entries(helpers) as [string, ActionT<StateT>][]
    const functionEntries = [...actionsEntries, ...helpersEntries]

    // This function mimics the set() function's way of providing
    // state to whatever function is passed in to it. By wrapping
    // it up like this, we don't have to repeat this reduce logic
    // 2 times to handle the 2 different ways pass state into an
    // action or a helper.
    const giveState = (target) => target(get())

    console.log({ functionEntries })

    // If the function is a helper (not meant to modify state), we
    // will get the current state from get() and pass it to the function
    // when it is invoked. If it is an action, we will invoke set() and
    // pass the function the state from that, instead.
    functionEntries.reduce((target, [name, handler]) => {
      const isAction = name in actions
      const provideState = isAction ? set : giveState

      target[name] = (...args) => {
        return provideState((state) => {
          console.log('providing state', { ...state })
          return handler(state, ...args)
        })
      }

      return target
    }, store)

    // This is a bit of a hack to get around the fact that we can't
    // use the spread operator on a tuple. We need to be able to
    // iterate over both the actions and the helpers, so we need to
    // combine them into a single array.

    return options.initialState
  }

  const withImmer = immer(initializeStateAndStore)
  const useStore = create<StateT, ZustandT>()(withImmer)
  const store = stores[options.id]
  console.log({ store })
  store.use = useStore
  store.subscribe = useStore.subscribe
  const stateGetter = { get: () => useStore.getState() }
  Object.defineProperty(store, 'state', stateGetter)
  return store
}
