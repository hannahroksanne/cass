## zustand

Zustand stores should be as simple as possible. Their purpose should be providing broad,
generalized access to read and write data that is shared with other components.

It is important to note: Zustand stores should not be used for standard, resuable
components and should be used specifically in the global scope of the application, given
that Zustand produces singleston stores that do not reset when any specific consumer
component is unmounted/mounted.

```jsx
const useMyStore = create((set) => {
  const setInputValue = (event) => {
    set({ inputValue: event.target.value })
  }

  return {
    inputValue: '',
    setInputValue
  }
})

const MyComponent = () => {
  const store = useMyStore()

  return (
    <div data-testid="MyComponent">
      <input onChange={store.setInputValue} value={Store.inputValue}>
    </div>
  )
}
```

In this example, whenever MyComponent is unmounted and mounted again, whatever value the
user last typed into the input will still be in the input since, as stated above, the
store is not reinstantiated. `useMyStore()` simply subscribes to an existing store.

Stylistically, we should aim to avoid implicit returns anywhere in our codebase, and that
applies equally to Zustand stores.

A function may be simple right now, true. You may be writing a mock function that is just
a placeholder to help you fill in some gaps today. Maybe you're just writing it to return
a static, primitive value. Or maybe you're just encapsulating getter logic.

```jsx
const onChange = (event) => console.log(event.target.value)
// or getter logic (everybody's middle name is Leroy... duh)
const getFullName = (user) => user.firstName + ' Leroy ' + user.lastName
```

But almost _no_ functions ever stay one-liners.

In our `onChange`, we know without a doubt that it is going to be something more, we just
can't define its full purpose yet. So we should go ahead and give it a block, so that
whoever comes to build out the functionality in the near future will not have to toy with
converting things to and from implicit returned arrow functions. 🙃

As for `getFullName`, same thing basically. In a month from now, we're gonna need to
logically determine their full name should include their title, so it becomes something
like this:

```jsx
const UNIVERSAL_MIDDLE_NAME = 'Leroy'

const getFullName = (user) => {
  const title = user.prefersTitle ? `${user.title} ` : ''
  return `${title}${user.firstName} ${UNIVERSAL_MIDDLE_NAME} ${user.lastName}`
}
```

### Arguments in favor of implicit returns:

> It is easier to type.

It would be easier for me to write this code in Danish, or to outsource my work to
somebody on Upwork who lookeds, sounds, and types just like me. Or to not care about code
quality.

Our jobs are _not_ about keystrokes. We should be thinking through problems and having a
plan for execution before even a single keystroke happens in the code editor.

Keystrokes are our friends, just as adverbs, adjectives, conjunctions, and other parts of
speech are our friends.

Consider this (anecdotal) bathroom sign once seen at a gas station:

> ATTENTION TOILET ONLY DISABLED ELDERLY PREGNANT CHILDREN ALLOWED

Is this sign trying to get the toilet's attention? Is it trying to inform toilets that
they are not allowed? Why are only disabled, elderly, pregnant, children, allowed?

A few extra keystrokes could have helped here.

> ATTENTION: TOILET ALLOWED ONLY FOR DISABLED, ELDERLY, PREGNANT, OR CHILDREN.

A standard aims to resolve an issue. And the issue here would be whether or not to
abbreviate logical syntax to an implicit variation when possible.

The standard of always using arrow function blocks (and\* arrow function parameter
parenthesis) solves the need to think about whether or not something should be one way or
another.

## More information, less clutter.

```jsx
const useMyStore = create((set, get) => ({
  setValue: (key, value) => set(state => ({ [key]: value }))
  getFormattedValue => (key) => get()[key]
  makeHttpRequet: (data) => customFetcher(data).then(response => response.json())
}))

const useMyBetterStore = create((set, get) => {
  const setValue = (key, value) => {
    set(state => ({ [key]: value }))
  }

  const getFormattedValue = (key) => {
    (key) => get()[key]
  }

  const makeHttpRequest = async (data) => {
    const response = await customFetcher(data)
    const json = await response.json()
    return json
  }

  return {
    setValue,
    getFormattedValue,
    makeHttpRequest
  }
})

`useMyBetterStore` is much bigger, vertically, but here is why that is ok:

1. Each function inside of it reads as its own entity.
2. No one-off shortcuts are taken to keep it under Prettier's line-break length.
3. No unintuitive identifiers are introduced at an attempt at brevity.
4. The code is written with **everyone** in mind.

We developers are customers of the codebase we build.

We consume the APIs, we iterate over interpreting and modifying the code. We spin our wheels on the complex, difficult to follow parts, and we are just as prone as a user to overlook things and make mistakes.

In the production app that our codebase produces
```
