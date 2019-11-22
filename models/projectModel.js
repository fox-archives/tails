import fs from 'fs';
import path from 'path';

function Project() {

};

Project.getProjects = function() {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, '../data/projects.json');
    fs.promises
      .readFile(dir, {
        encoding: 'utf8',
        flag: 'r'
      })
      .then(fileContents => {
        resolve(JSON.parse(fileContents).projects);
      });
  });
}


Project.prototype.ensureExists = function(projectName) {
  console.log(projectName);
}

Project.create = function() {
  return new Project();
};

export default Project;
