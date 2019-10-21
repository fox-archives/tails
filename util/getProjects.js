import fs from 'fs';
import path from 'path';

const packagesDir = path.join(__dirname, '..', 'projects');

export function getProjects() {
  let files = fs.readdirSync(packagesDir);

  let fileDirs = files.filter(file => {
    let filePath = path.resolve(packagesDir, file);
    return fs.statSync(filePath).isDirectory();
  });

  return fileDirs;
}

// projects may have dashes, underscores, charater, and numbers, so long as it begings with a character
function validateProjectName(projectName) {
  if(projectName.match(/^[a-zA-Z0-9_-]*$/gm) && projectName.length < 33) {
    return true;
  }
  return false;
}

export function validateProjectNames(projects) {
  const complianceOfProjects = projects.map(project => {
    return validateProjectName(project);
  });
  complianceOfProjects.forEach(projectInCompliance => {
    if(!projectInCompliance) throw new Error('your project name is invalid');
    return projectInCompliance;
  });
}
