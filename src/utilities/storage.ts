import storeEngine from 'store/src/store-engine'
import localStorage from 'store/storages/localStorage'
import sessionStorage from 'store/storages/sessionStorage'
import storageChanged from 'storage-changed'

export const storage = {
  local: storeEngine.createStore([localStorage]),
  session: storeEngine.createStore([sessionStorage]),
}

storageChanged('local', {
  eventName: 'storageLocalChanged',
})

storageChanged('session', {
  eventName: 'storageSessionChanged',
})
