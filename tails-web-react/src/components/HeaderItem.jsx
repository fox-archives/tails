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

export default class HeaderItem extends React.Component {
  render() {
    return (
      <Box
        fontSize={4}
        fontWeight="bold"
        p={3}
        color="black"
        bg="primary"
        display="inline-block"
      >
        {this.props.children}
      </Box>
    )
  }
}
