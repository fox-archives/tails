export function listProject(call, cb) {
  cb(null, {
    name: call.request.name,
    prop: 'thing'
  })
}

// export function showProject({ request }) {
//   return new Promise((resolve, reject) => {
//     resolve({
//       name: request.name,
//       prop: 'suppper col newww'
//     })
//   })
// }

export function showProject(call, cb) {
  cb(null, {
    name: call.request.name,
    prop: 'otherd property'
  })
}
