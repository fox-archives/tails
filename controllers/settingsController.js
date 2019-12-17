import {
  generateProjectScreenshots,
  generateProjectDataAndUpdateDb
} from '../services/settingServices'

export function settingsController(req, res) {
  res.render('pages/settings', {
    hero: {
      header: 'settings',
      body: 'fine tune app behavior'
    }
  })
}

export async function generateScreenshots(req, res) {
  await generateProjectScreenshots()
  res.redirect(req.get('referer'))
}

// get all projects in the `./projects` directory, and update db
export async function generateProjects(req, res) {
  await generateProjectDataAndUpdateDb()
  res.redirect(req.get('referer'))
}
