import React from 'react'
import styled from '@emotion/styled'
import { space, flexbox, box, typography, color, layout, border } from 'styled-system'
import { GitHub } from 'react-feather'
import HeaderItem from './HeaderItem'
import { Link } from 'react-router-dom'

const Box = styled.div({
  boxSizing: 'border-box',
}, typography, space, color, layout, border)

const Spacer = styled.div(space)

const Flex = styled.div({
  boxSizing: 'border-box',
  display: 'flex'
}, typography, space, color, layout, flexbox)

export default class Header extends React.Component {
  render() {
    return <Flex alignItems='center'>
      <HeaderItem><Link to="/">Tails</Link></HeaderItem>
      <HeaderItem><Link to="/projects">Projects</Link></HeaderItem>
      <Box
        fontSize={4}
        fontWeight='bold'
        p={3}
        color='black'
        bg='primary'
        display='inline-block'
        ml='auto'
      >
        <Flex
          alignItems='center'
        >
          <GitHub />
          <Spacer mr={1} />
          <a target="__blank" href="https://github.com/eankeen/tails">GitHub</a>
        </Flex>
      </Box>
    </Flex>
  }
}
