
export function settingsController(req, res) {
  res.render('settings', {
    hero: {
      header: 'settings',
      body: 'fine tune app behavior'
    }
  })
}
