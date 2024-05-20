global.$$$ = global.$$$ || {}
global.$$$.utilities = global.$$$.utilities || {}
global.$$$.stores = global.$$$.stores || {}

export const globalize = {
  store(key, store) {
    global.$$$.stores[key] = store
  },

  utility(key, value) {
    global.$$$.stores[key] = value
  },
}

global.$$$reset = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  window.location.reload()
}
