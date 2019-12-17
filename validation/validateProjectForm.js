export function validateProjectForm(
  projectName, projectType, projectDesc, projectSlug
) {
  if(projectName && projectType && projectDesc && projectSlug) {
    return
  }
  return new Error('error')
}
