import dayjs from 'dayjs'
import { replaceStringVariables } from './replaceStringVariables'

// TODO: Move ERROR_CODE_DESCRIPTIONS and messages to config system.
// TODO: Publish pebbler as a taste.ink package.

type StatusCodeT = keyof typeof ERROR_CODE_DESCRIPTIONS

const ERROR_CODE_DESCRIPTIONS = {
  400:
    'This probably means that we FE devs have a 🪲 in our code that caused our request ' +
    'to be out of line with what the service expects. We need to track down where our ' +
    "request gets out of sync to resolve this. If you're not sure what the service is " +
    'expecting, just ask inside of the #indigo-be Slack channel. 😊',
  401:
    "This probably means that the user's session has expired. At this point, our automated " +
    "session refresh should have kicked in and refreshed the user's session. If it didn't, " +
    'or if it tried and failed, then this is probably bug with how we are storing, recalling, ' +
    'and attaching the access token to our requests.',
}

const messages = {
  callingService: {
    type: 'info',
    title: '🙋‍♀️ [Calling service] {name}',
    message: 'Nothing to see here. Move along.',
  },

  serviceCallFailed: {
    type: 'error',
    title: '✋🙅‍♀️ [Service call failed] {name}',
    makeMessage: (result: AnyObjectT) => {
      const code = result.code as StatusCodeT
      return `Error code: ${code}. | ${ERROR_CODE_DESCRIPTIONS[code]}`
    },
  },
}

// Consider everything after this to be its own module.

const pipes = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
}

type MessageT = {
  title: string
  message?: string
  makeMessage?: (data: AnyObjectT) => string
  type: keyof typeof pipes
}

type MessageEntryT = [string, MessageT]

const createPebbler = (options) => {
  const messageEntries = Object.entries(options.messages)

  const messages = messageEntries.reduce((target: AnyObjectT, [key, value]: MessageEntryT): any => {
    target[key] = (data) => {
      const messageValue = value.message || ''
      const hasMakeMessage = typeof value.makeMessage === 'function'
      const messageText = hasMakeMessage ? value.makeMessage(data) : messageValue
      const title = replaceStringVariables(value.title, data)
      const timeStamp = dayjs().format('HH:mm:ssa')
      const outputPipe = pipes[value.type]

      console.groupCollapsed(`${timeStamp} ${title}`)
      outputPipe(messageText)
      outputPipe(data)
      console.groupEnd()
    }
  }, {})

  return {
    messages,
  }
}

export const pebbler = createPebbler({
  messages,

  $: {
    errorCodeMessages: ERROR_CODE_DESCRIPTIONS,
  },
})
