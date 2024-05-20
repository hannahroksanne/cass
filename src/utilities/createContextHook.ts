import React, { createContext, useContext } from 'react'

type ProviderPropsT = {
  children: React.ReactNode
  [key: string]: any
}

type ProviderT = React.FC<ProviderPropsT>
type UseCreatorT<ContextT> = (props: any) => ContextT
type UseStoreT<ContextT> = () => ContextT
type ReturnT<ContextT> = [ProviderT, UseStoreT<ContextT>]

export const createContextHook = <ContextT>(
  useCreator: UseCreatorT<ContextT>,
): ReturnT<ContextT> => {
  const Context = createContext<ContextT | undefined>(undefined)

  const Provider: ProviderT = (props) => {
    const store = useCreator(props)
    return Context.Provider({ children: props.children, value: store })
  }

  const useStore = () => {
    return useContext(Context)
  }

  return [Provider as ProviderT, useStore as UseStoreT<ContextT>]
}
