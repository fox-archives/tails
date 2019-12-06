import { spawn } from 'child_process'

export function launchCode(projectPath) {
  // process.stdin.pipe(child.stdin);
  // for await (const data of child.stout) {
  //   console.log(data);
  // }
  console.log(projectPath)
  const p = spawn('code', ['-n', '-g', 'index.html:1:1', projectPath], {
    cwd: process.cwd(),
    env: process.env
  })

  p.stdout.on('data', data => {
    console.log(data.toString('utf8'))
  })

  p.stderr.on('data', data => {
    console.log(data)
  })

  p.on('close', code => {
    console.log('exited with code ' + code)
  })

  p.on('error', err => {
    console.error('there was an error' + err)
  })
}
