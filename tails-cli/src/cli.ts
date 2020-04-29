import yargs from 'yargs'

// export function startCli() {
  // @ts-ignore
  yargs
    // @ts-ignore
    .scriptName('tails')
    .usage('$0 <cmd> [args]')
    .example('$0 project list', 'list all projects')
    .example('$0 project show projectName', 'show information about a particular project')

  // @ts-ignore
  yargs.commandDir('yargs')

  // @ts-ignore
  yargs.demandCommand().wrap(100).strict().help().argv
// }
