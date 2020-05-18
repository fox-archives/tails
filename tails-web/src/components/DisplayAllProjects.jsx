import * as React from 'react'

let query = `{ projects { name, isSymbolicLink } }`

let fetchData = async () => {
  await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query })
  })
}

class DisplayAllProjects extends React.Component {
  state = {
    current: 'thing'
  }

  render() {
    return (
      <React.Suspense fallback="loading...">

      </React.Suspense>
    )
  }
}

export default DisplayAllProjects
