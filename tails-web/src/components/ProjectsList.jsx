import * as React from 'react'
import { Row } from 'antd'

import Project from '@/components/Project'

export default function ProjectsList({ projects }) {
  return (
    <Row gutter={[6, 6]}>
      {projects.map((project) => {
        const key = project.namespace + '-' + project.name
        return (
          <Project key={key} project={project}></Project>
        );
      })}
    </Row>
  )
}
