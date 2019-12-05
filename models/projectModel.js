import fs from 'fs';
import path from 'path';

function Project() {

};

Project.getProjects = function() {
  return readProjects()
}

Project.addProject = function() {

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
  console.log(projectName);
}

Project.create = function() {
  return new Project();
};

export default Project;

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
