process.on('uncaughtException', err => {
  console.error('uncaught exception', err)
  process.exitCode = 1
})

process.on('unhandledRejection', err => {
  console.error('unhandled rejection', err)
  process.exitCode = 1
})

process.on('SIGTERM', err => {
  console.error('got sigterm', err)
  process.exitCode = 1
})
