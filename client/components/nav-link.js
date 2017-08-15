import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Anchor = styled.a`
  vertical-align: middle;
  font-size: 0.938em;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    border-radius: 50px;
    background-color: #50545c;
  }

  &:visited {
    color: inherit;
  }
`

const NavLink = ({ href, children }) =>
  <Link href={ href } prefetch={ process.env.NODE_ENV === 'production' }>
    <Anchor href={ href }>{ children }</Anchor>
  </Link>

export default NavLink
