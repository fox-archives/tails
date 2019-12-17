export function wrapAsync(fn) {
  return function(req, res, next) {
    // catch errors and pass them to the next middleware in
    // the chain (error handler)

    fn(req, res, next)
      .catch(next)
  }
}
