import path from 'path'

import _ from 'lodash'

export const TEST_TAILS_CONFIG_FILE = path.join(__dirname, 'tails.json')

export const TEST_TAILS_ROOT_DIR_READ = path.join(
  __dirname,
  'fixtures/read-test'
)

export const TEST_TAILS_ROOT_DIR_WRITE = path.join(
  __dirname,
  'fixtures/write-test'
)

export const TEST_TAILS_ROOT_DIR_WRITE_BACKUP = path.join(
  __dirname,
  'fixtures/write-test-copy'
)

export const PROJECTS_FIXTURE = _.sortBy(
  [
    {
      name: 'project-alfa',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-bravo',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-charlie',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-one',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-three',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-two',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
  ],
  'name'
)

export const NAMESPACES_FIXTURE = _.sortBy(
  [
    {
      name: 'project-grouping',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: 'project-grouping-2',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
  ],
  'name'
)
