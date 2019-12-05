import {
  createProjectService,
  deleteProjectService
} from '../../services/projectServices'


// TODO: move logic to the service, which would be in the Project model
export async function createProjectController(req, res) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body

  await createProjectService({
    projectName,
    projectType,
    projectDesc,
    projectSlug
  });

  res.redirect('/projects')
}
export async function deleteProjectController(req, res) {
  await deleteProjectService();

  res.redirect('/deleting-done');
}
