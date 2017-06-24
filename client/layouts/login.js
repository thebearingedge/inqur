import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 80px;
  width: 350px;
  margin-left: auto;
  margin-right: auto;
`

const Logo = styled.img`
  display: block;
  margin: 0 auto 6.667em;
  width: 188px;
`

const Title = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 0.7em;
  letter-spacing: 0.03em;
  line-height: 2.333em;
  color: #fff;
`

const FadeBreak = styled.span`
  display: inline-block;
  width: 129px;
  height: 4px;
  margin: ${({ flipped }) => flipped ? '0 0 0 2px' : '0 3px 0 7px'};
  opacity: 0.7;
  background: url('/images/fading-section-break.png') no-repeat;
  transform: ${({ flipped }) => !flipped || 'rotate(180deg) translate(0, 3px);'}
`

export default function Login({ title, children }) {
  return (
    <Wrapper>
      <Title>
        <Logo src='/images/inqur.svg'/>
        <FadeBreak/> { title } <FadeBreak flipped/>
      </Title>
      { children }
    </Wrapper>
  )
}
