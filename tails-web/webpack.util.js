// export function friendlyErrorsAdditionalTransformers(error) {
//   if (error.webpackError) {
//     const message =
//       typeof error.webpackError === 'string'
//         ? error.webpackError
//         : error.webpackError.message || ''
//     for (const { re, msg, type } of rules) {
//       const match = message.match(re)
//       if (match) {
//         return Object.assign({}, error, {
//           // type is necessary to avoid being printed as defualt error
//           // by friendly-error-webpack-plugin
//           type,
//           shortMessage: msg(error, match)
//         })
//       }
//     }
//     // no match, unknown webpack error without a message.
//     // friendly-error-webpack-plugin fails to handle this.
//     if (!error.message) {
//       return Object.assign({}, error, {
//         type: 'unknown-webpack-error',
//         shortMessage: message
//       })
//     }
//   }
//   return error
// }

// export function friendlyErrorsAdditionalFormatters(error) {
//   errors = errors.filter(e => e.shortMessage)
//   if (errors.length) {
//     return errors.map(e => e.shortMessage)
//   }
// }
