import * as React from 'react'
import { useState, useEffect } from 'react'
import { Card, Row, Col } from 'antd'

let query = `{ projects { name, isSymbolicLink } }`

let fetchData = async () => {
  // await fetch('/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({ query })
  // })
  const dataRaw = await fetch('/api/data', {
    headers: {
      'Accept': 'application/json'
    }
  })
  const data = await dataRaw.json()
  return data.data
}

export default function Content() {
  const [projects, setProjects] = useState(0);
  const [namespaces, setNamespaces] = useState(0)

  useEffect(() => {
    fetchData()
      .then(({ projects, namespaces }) => {
        setProjects(projects)
        setNamespaces(namespaces)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])


  if (!projects) {
    return (
      <h1>test</h1>
    )
  } else {

    return (
      <Row>
        {projects.map(project => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card key={project.name} title="Default size card" extra={<a href="#">More</a>}>
                <p>{project.name}</p>
              </Card>
            </Col>
          )
        })
        }
      </Row>
    )
  }

}
