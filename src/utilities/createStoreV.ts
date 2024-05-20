import { proxy, useSnapshot } from 'valtio'

type CreateStoreReturnT<StateT extends object> = {
  state: StateT
  use: () => ReturnType<typeof useSnapshot<StateT>>
}

export const createStore = <StateT extends object>(initialState: StateT): CreateStoreReturnT<StateT> => {
  const store = proxy<StateT>(initialState)

  return {
    state: store,
    use: () => useSnapshot(store),
  }
}
