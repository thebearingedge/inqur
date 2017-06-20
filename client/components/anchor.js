import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const A = styled.a`
  display: inline-block;
  padding: 0.833em 1.25em;
  font-size: 0.875em;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.9;

  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 1;
  }
`

const Anchor = ({ children, ...props }) =>
  <Link>
    <A { ...props }>{ children }</A>
  </Link>

export default Anchor
