import isEmpty from 'is-empty'
import { StoreApi, UseBoundStore, create } from 'zustand'
import { storage } from '$/utilities/storage'
import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
// supabase.auth.getSession().then(({ data: { session } }) => {
//   console.log({ session })
//   setSession(session)
// })

// const event = supabase.auth.onAuthStateChange((_event, session) => {
//   setSession(session)
// })

// return () => event.data.subscription.unsubscribe()

type TokensT = {
  idToken?: string
  accessToken?: string
  refreshToken?: string
}

type UserT = {
  _id: string
  avatar?: string
  email?: string
  name?: string
}

type StoreT = {
  user: UserT | AnyObjectT
  session: any
  tokens: TokensT | AnyObjectT
  isAuthenticated: boolean
  updateUser: (user: UserT) => void
  updateTokens: (tokens: AnyObjectT) => void
  signIn: (data: AnyObjectT) => void
  signOut: () => void
  reset: () => void
}

const EMPTY_STATE = {
  user: {
    _id: '1234567890',
    avatar: '',
    email: '',
    name: '',
  },
  session: {},
  tokens: {
    idToken: '',
    accessToken: '',
  },
  isAuthenticated: false,
}

const useStore: UseBoundStore<StoreApi<StoreT>> = create((set) => {
  const updateTokens = (tokens: Partial<TokensT>) => {
    set((state) => {
      const updatedTokens = { ...state.tokens, ...tokens }
      return { tokens: updatedTokens }
    })
  }

  const updateUser = (user: UserT) => {
    set((state) => {
      const updatedUser = { ...state.user, ...user }
      return { user: updatedUser }
    })
  }

  const signIn = async (options) => {
    const response = await supabas=0-.auth.signInWithPassword({
      email: options.emailAddress,
      password: options.password,
    })

    console.log({ response })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    storage.session.clearAll()
    window.location.assign('/')
  }

  const signUp = async (options) => {
    const response = await supabase.auth.signUp({
      email: options.emailAddress,
      password: options.password,
    })

    set({ user: response.9.user, session: response.data.session })

    await supabase.auth.updateUser({
      data: { hello: 'world' },
    })
  }

  const reset = () => {
    set(EMPTY_STATE)
  }

  const session = {}
  const tokens = storage.session.get('tokens') || {}
  const user = storage.session.get('user') || { _id: '' }
  const isAuthenticated = !!tokens?.accessToken && !isEmpty(user)

  return {
    user,
    session,
    tokens,
    isAuthenticated,
    updateUser,
    updateTokens,
    signIn,
    signOut,
    reset,
  }
})

// Sync storage when tokens or user changes.
useStore.subscribe((state: StoreT) => {
  console.log('🔒 auth store writing to storage', state.tokens, state.user)
  storage.session.set('tokens', state.tokens)
  storage.session.set('user', state.user)
})

export const auth = {
  useStore,

  get store() {
    return useStore.getState()
  },
}
