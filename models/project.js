import fs from 'fs';
import path from 'path';

function Project(projectsDir) {
  this.projectsDir = projectsDir;
};

Project.prototype.get = function(projectName) {

};

Project.prototype.getAll = function() {
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
