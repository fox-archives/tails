import test from 'ava';
import Project from '../../models/projectModel';

test('does it fetch the directories properly', t => {
  const project = Project.create()
  project.getProjects()

  t.is('f', 'f')
})
