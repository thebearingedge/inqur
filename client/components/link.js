import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Anchor = styled.a`
  display: inline-block;
  padding: 10px 25px;
  font-size: 0.875em;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`

export default ({ children, ...props }) =>
  <Link {...props}>
    <Anchor >{ children }</Anchor>
  </Link>
