export async function errorController(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = 'error\n' + err.message
    ctx.app.emit('error', err, ctx)
  }
}
