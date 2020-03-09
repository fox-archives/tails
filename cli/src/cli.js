import yargs from 'yargs'

export function startCli(protoClient) {
  yargs
    .scriptName('tails')
    .usage('$0 <cmd> [args]')
    .example('$0 project list')
    .example('$0 project show projectName')

  yargs
    .commandDir('yargs')
    // .demandCommand()
    .help().argv
}
