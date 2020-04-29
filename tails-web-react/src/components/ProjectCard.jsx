import React from 'react'

import { space, typography, color, layout, border } from 'styled-system'
import styled from '@emotion/styled'

const Box = styled.div(
  {
    boxSizing: 'border-box',
  },
  typography,
  space,
  color,
  layout,
  border
)

export default class ProjectCard extends React.Component {
  render() {
    return (
      <Box
        fontSize={2}
        p={3}
        m={2}
        display="inline"
        border="1px solid lightgray"
        borderRadius={4}
        key={this.props.key}
      >
        {this.props.name}
      </Box>
    )
  }
}
