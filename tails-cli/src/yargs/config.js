import { Config } from '../store'

export const command = 'config <command>'
export const desc = 'show or edit tails configuration items'
export const builder = function(yargs) {
  yargs.command('show', 'shows the config', async () => {
    await Config.show()
  })


  yargs.command('create', 'create a blank config', async () => {
    await Config.create()
  })


  yargs.command('delete', 'delete the config', async () => {
    await Config.delete()
  })


  yargs.command('get', 'get key from config', yargs => {
    yargs.positional('key', {
      type: 'string',
      default: '',
      describe: 'key to get'
    })
  }, async argv => {
    await Config.get(argv.key)
  })


  yargs.command('set', 'set key in config', yargs => {
    yargs.positional('key', {
      type: 'string',
      default: '',
      describe: 'key to set'
    })

    yargs.positional('value', {
      type: 'string',
      default: '',
      describe: 'value to set'
    })
  }, async argv => {
    await Config.set(argv.key, argv.value, argv.f)
  })
}
