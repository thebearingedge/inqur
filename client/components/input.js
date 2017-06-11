import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-block;
  position: relative;

  & > input {
    width: 320px;
    height: 32px;
    padding: 5px 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    font: inherit;
    font-size: 0.9em;
    line-height: 1.5em;
    letter-spacing: 0.02em;
    resize: none;
    outline: 0;
    color: #f2f2f2;
    background-color: #191919;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  & input:focus {
    border: 1px solid #1bb76e;
    border-right: ${({ hasError }) => hasError && '8px solid #d43030'};
  }

  & input::placeholder {
    font-size: 13px;
  }
`

const Message = styled.span`
  position: absolute;
  left: calc(100% + 0.7em);
  top: 0.4em;
  padding: 2px 3px;
  border: 2px solid #d43030;
  border-radius: 4px;
  font-size: 0.82em;
  white-space: nowrap;
  background-color: #d43030;
  opacity: 0.8;
  z-index: 1;
`

const Pointer = styled.span`
  position: absolute;
  top: 4px;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent transparent #d43030 transparent;
  border-width: 5px;
  border-style: solid;
  transform: rotate(-90deg);
`

const Input = ({ input, meta, ...rest }) => {
  const { dirty, touched, error } = meta
  const hasError = (dirty && error) || (touched && error)
  return (
    <Wrapper hasError={ hasError }>
      <input { ...input } { ...{ ...rest } }/>
      { hasError &&
        <Message><Pointer/>{ error }</Message>
      }
    </Wrapper>
  )
}

export default Input
