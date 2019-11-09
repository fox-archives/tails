import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function Project(projectsDir) {
  this.projectsDir = projectsDir;
};

/* given an array of project names, extract the yaml */
Project.prototype.getProjectMetaData = function(projectNames) {
  if (!Array.isArray(projectNames)) projectNames = [ projectNames ];

  let yamlData = [];
  projectNames.forEach(project => {
    const projectDir = path.resolve(this.projectsDir, project, '.tails.yml');
    
    let promise = new Promise((resolve, reject) => {
      fs.promises.readFile(projectDir, 'utf8')
        .then(data => {
          resolve(yaml.safeLoad(data));
        })
        .catch(err => {
          reject(err);
        });
    });
    yamlData.push(promise);
  });
  
  return Promise.all(yamlData);
};

Project.prototype.getProjectNames = function() {
  return new Promise((resolve, reject) => {
    fs.promises.readdir(this.projectsDir)
      .then(projects => {
        // contains fs.stat data about each project
        let projectsStatPromise = [];

        projects.forEach(project => {
          let projectFilePath = path.resolve(this.projectsDir, project);
          projectsStatPromise.push(fs.promises.stat(projectFilePath));
        });

        Promise.all(projectsStatPromise)
          .then(projectsStat => {
            resolve(projects.filter((project, i) => projectsStat[i].isDirectory()));
          })
          .catch(err => {
            console.log(err);
            reject();
          })
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  })
};

Project.prototype.ensureExists = function(projectName) {

}

export default (function projectFactory() {
  const projectsDir = path.join(__dirname, '..', 'projects');
  return new Project(projectsDir);
})();
