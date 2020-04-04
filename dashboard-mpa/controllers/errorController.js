export function errorController(err, req, res, next) {
  console.error(err)
  res.status(500)
  res.render('pages/error', {
    error: 'error: ' + err.message,
  })
}
