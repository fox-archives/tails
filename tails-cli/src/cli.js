import yargs from 'yargs'

export function startCli() {
  yargs
    .scriptName('tails')
    .usage('$0 <cmd> [args]')
    .example('$0 project list')
    .example('$0 project show projectName')

  yargs.commandDir('yargs')

  yargs.demandCommand().wrap(100).strict().help().argv
}
