import path from 'path'

import _ from 'lodash'

import { $ } from '../src/constants'

export const TAILS_PROJECT_DIR_READ = path.join($, 'test/fixtures/read-test')
export const TAILS_PROJECT_DIR_WRITE = path.join($, 'test/fixtures/write-test')

export const PROJECTS_FIXTURE = _.sortBy(
  [
    {
      name: 'project-alfa',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-bravo',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-charlie',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-one',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-three',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-two',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    }
  ],
  'name'
)

export const NAMESPACES_FIXTURE = _.sortBy(
  [
    {
      name: 'project-grouping',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-grouping-2',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    }
  ],
  'name'
)
