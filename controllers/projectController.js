import Project from '../models/projectModel';

export async function projectController(req, res) {
  try {
    let p = await Project.getAll();

    res.render('projects', {
      projects: p,
      hero: {
        header: 'my projects',
        body: 'these projects are cool'
      }
    });
  }
  catch(err) {
    console.log(err);
  }

}
