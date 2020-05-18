import * as React from 'react'
import { useState, useEffect } from 'react'

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

export default function() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData()
  }, [count])


  if(!count) {
    return (
      <h1>test</h1>
    )
  } else {
    return (
      { fetchData }
    )
  }
  
}
