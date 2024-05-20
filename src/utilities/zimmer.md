# zimmer

This API provides a simple and efficient way to create a global store for managing state in a React application using Zustand and Immer. The store can be created with initial state, actions, and computed values that will be automatically updated when the state changes.

## Usage

First, create a store by defining an object with the initial state, actions, and computations.

```javascript
import { createStore } from 'zimmer'

export const alerts = createStore({
  state: {
    queue: [],
  },

  actions: {
    issue: (state, alert) => {
      state.queue.push(alert)
    },

    revoke(state, id) {
      state.queue = state.queue.filter((alert) => {
        return alert.id !== id
      })
    },
  },

  computations: {
    isIdle(state) {
      const queuedAlertCount = state.queue.length
      return !queuedAlertCount
    },

    queuedAlertCount(state) {
      return state.queue.length
    },

    currentlyActiveAlert(state) {
      return state.queue[0]
    },
  },
})
```

Now, you can use the store (singleton) in your React components.

```javascript
import React from 'react'
import { alerts } from './stores/alerts'

const MyComponent = () => {
  const alertsStore = alerts.use()

  const issueAlert = () => {
    alertsStore.issue({
      id: 12345,
      message: 'yo',
    })
  }

  const clearAllAlerts = () => {
    alertsStore.state.queue.forEach((alert) => {
      alerts.revoke(alert.id)
    })
  }

  return (
    <div>
      <h1>{alertsStore.state.queuedAlertCount} queued</h1>
      <button onClick={issueAlert}>Issue Alert</button>
      <button onClick={clearAllAlerts}>Clear Alerts</button>
    </div>
  )
}
```
