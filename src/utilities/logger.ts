console.log('LOGGER HERERERER!!!\n\n\n\n')

export const log = {
  note: (...args) => {
    console.log(
      `%cNote:`,
      "color: #3498db; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px; background: url('/images/logger0.png') no-repeat; background-size: contain;",
      ...args,
    )
  },
  todo: (...args) => {
    console.log(
      `%cTODO:`,
      'color: #e74c3c; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px;',
      ...args,
    )
  },
  info: (...args) => {
    console.log(
      `%cInfo:`,
      'color: #2ecc71; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px;',
      ...args,
    )
  },
  notify: (...args) => {
    console.log(
      `%cNotify:`,
      'color: #9b59b6; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px;',
      ...args,
    )
  },
  warn: (...args) => {
    console.log(
      `%cWarning:`,
      'color: #f39c12; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px;',
      ...args,
    )
  },
  alert: (...args) => {
    console.log(
      `%cALERT:`,
      'color: #c0392b; font-weight: bold; background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px;',
      ...args,
    )
  },
}

// Test the logging levels
log.note('This is a note.')
log.todo('Remember to finish that task.')
log.info('This is some information.')
log.notify("You've got a new notification.")
log.warn('Warning! Something might go wrong.')
log.alert('ALERT! This is critical.')

console.log(log)
