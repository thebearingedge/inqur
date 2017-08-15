import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavLink from './nav-link'

const Wrapper = styled.div`
  height: 50px;
  background-color: #34373c;
`

const Nav = styled.nav`
  width: 1078px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
`

const NavLeft = styled.div`
  margin-top: 6px;
  float: left;

  & > a {
    display: inline-block;
    padding: 4px 11px 1px 15px;
  }
`

const NavRight = styled.div`
  margin-top: 13px;
  float: right;

  & > a {
    padding: 1px 15px 6px;
  }
`

const Logo = styled.img`
  width: 80px;
`

const Brand = ({ href, src }) =>
  <NavLink href={ href }><Logo src={ src }/></NavLink>

const navLinks = [
  <NavLink key={ 1 } href='/register'>sign in</NavLink>,
  <NavLink key={ 2 } href='/signin'>sign up</NavLink>
]

export const Navbar = ({ username }) =>
  <Wrapper id='topbar'>
    <Nav>
      <NavLeft>
        <Brand href='/' src='/images/inqur.svg'/>
      </NavLeft>
      <NavRight>
        { username ? <NavLink href='/'>{ username }</NavLink> : navLinks }
      </NavRight>
    </Nav>
  </Wrapper>

const mapState = ({ session }) => ({
  username: session ? session.username : null
})

export default connect(mapState)(Navbar)
