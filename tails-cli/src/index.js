// node 13/14 doesn't play well with
// es6 importing .ts files
// import register from '@babel/register'

require('@babel/register')({
  extensions: ['.mjs', '.js', '.ts'],
})

require('./cli.ts')
// import('./cli.ts')
//   .then(({ startCli }) => {
//     startCli()
//   })
//   .catch(err => {
//     console.error(err)
//   })
