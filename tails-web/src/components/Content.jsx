import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Row, Col, PageHeader, Skeleton, Button } from "antd";

let query = `{ projects { name, isSymbolicLink } }`;

let fetchData = async () => {
  // await fetch('/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({ query })
  // })
  const dataRaw = await fetch("/api/data", {
    headers: {
      "Accept": "application/json",
    },
  });
  const data = await dataRaw.json();
  return data.data;
};

export default function Content() {
  const [projects, setProjects] = useState(0);
  const [namespaces, setNamespaces] = useState(0);

  useEffect(() => {
    fetchData()
      .then(({ projects, namespaces }) => {
        setProjects(projects);
        setNamespaces(namespaces);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!projects) {
    return (
      <>
        <PageHeader title="Projects" subtitle="loading" />
        <Skeleton />
      </>
    );
  } else {
    return (
      <>
        <PageHeader title="Projects" />
        <Row gutter={[6, 6]}>
          {projects.map((project) => {
            return (
              <Col
                key={project.name}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                gutter="6"
              >
                <Card title={project.name} extra={<a href="#">More</a>}>
                  <Button type="primary">code</Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}
