import test from 'ava'
import { generateProjectDataAndUpdateDb } from '../../services/settingServices'

// todo, create actual test ;)
test('reads `./projects` directory properly', async t => {
  const projects = await generateProjectDataAndUpdateDb()

  t.deepEqual(projects, [
    'battery-status-api',
    'css-test',
    'drag-and-drop-api',
    'html-test',
    'node-hello-world',
    'pointer-lock-api'
  ])
})
