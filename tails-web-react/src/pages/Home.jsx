import React from 'react'
import styled from '@emotion/styled'
import { space, typography, flexbox, color, layout, border } from 'styled-system'
import ProjectCard from '../components/ProjectCard'
import ProjectList from '../components/ProjectListing'

const Box = styled.div({
  boxSizing: 'border-box',
}, typography, space, color, layout, border)

const Flex = styled.div({
  boxSizing: 'border-box',
  display: 'flex'
}, typography, space, color, layout, flexbox)

export default class Home extends React.Component {
  render() {
    return <Box m={2}>
      <Flex>
        <ProjectList></ProjectList>
      </Flex>
    </Box>
  }
}
