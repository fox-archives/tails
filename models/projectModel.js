import fs from 'fs'
import path from 'path'

function Project() {}

Project.getProjects = function() {
  return readProjects()
}

Project.createProject = async function({
  projectName,
  projectType,
  projectDesc,
  projectSlug
}) {
  await updateDatabase({ projectName, projectType, projectDesc, projectSlug })
  await actuallyCreateProjectInProjectsFolder({
    projectType,
    projectSlug
  })
}

Project.deleteProject = async function(projectName) {
  const projects = await readProjects()
  projects.forEach((project, i, a) => {
    if (project.slug === projectName) {
      a.splice(i, 1)
    }
  })
  await writeProjects(data)
}

Project.prototype.ensureExists = function(projectName) {
  console.log(projectName)
}

Project.create = function() {
  return new Project()
}

export default Project

async function readProjects() {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, '../data/projects.json')
    fs.promises
      .readFile(dir, {
        encoding: 'utf8',
        flag: 'r'
      })
      .then(fileContents => {
        resolve(JSON.parse(fileContents).projects)
      })
  })
}

async function writeProjects(data) {
  const dir = path.join(__dirname, '../data/projects.json')

  return new Promise((resolve, reject) => {
    fs.promises.writeFile(dir, data, {
      encoding: 'utf8'
    })
  })
}

export async function updateDatabase(newEntry) {
  return new Promise((resolve, reject) => {
    const p = path.join(__dirname, '../data/projects.json')

    fs.promises
      .readFile(p)
      .then(content => {
        const jsonData = JSON.parse(content)
        const projectData = jsonData.projects
        projectData.push({
          name: newEntry.projectName,
          slug: newEntry.projectSlug,
          type: newEntry.projectType,
          tags: []
        })
        return JSON.stringify({ projects: projectData }, null, 2)
      })
      .then(function writeToProject(newFileData) {
        return fs.promises.writeFile(p, newFileData, {
          encoding: 'utf8',
          flag: 'w'
        })
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        console.log(err)
        reject()
      })
  })
}

export async function actuallyCreateProjectInProjectsFolder({
  projectType,
  projectSlug
}) {
  const p = path.join(__dirname, '../projects')
  await fs.promises.mkdir(path.join(p, projectSlug))
  const f = path.join(p, projectSlug, 'index.html')
  await fs.promises.writeFile(
    f,
    `<!DOCTYPE html>
<html lang="en">
<body lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Tails Project</title>
</head>
<body>
  
</body>
</body>
</html>
`
  )
}
