import { takeProjectScreenshots } from '../services/screenshots'

export function settingsController(req, res) {
  res.render('pages/settings', {
    hero: {
      header: 'settings',
      body: 'fine tune app behavior'
    }
  })
}

export async function generateScreenshots(req, res) {
  await takeProjectScreenshots()
  res.redirect(req.get('referer'))
}
