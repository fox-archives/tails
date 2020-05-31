import * as React from 'react'
import { Card, Col, Button } from "antd";

export default function Project({ project }) {
  function openInVsCode(ev) {
    console.log(project.name)
  }

  return (
    <Col
      key={project.name}
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xl={4}
    >
      <Card title={project.name} extra={<a href="#">More</a>}>
        <Button type="primary" onClick={openInVsCode}>code</Button>
      </Card>
    </Col>
  )
}
