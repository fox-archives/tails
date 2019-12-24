import { v4 as uuid4 } from 'uuid'
import _ from 'lodash'

export function newProjects(n) {
  return _.times(n, _.constant({
    id: uuid4(),
    name: `fake-project-${n}`,
    type: 'web',
    desc: `fake-project${n}`,
    slug: `fake-project-${n}`,
    firstCreated: Date.now(),
    lastUpdated: Date.now()
  }))
}
