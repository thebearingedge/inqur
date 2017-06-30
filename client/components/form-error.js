import React from 'react'
import styled from 'styled-components'

const P = styled.p`
  display: ${({ hasError }) => hasError ? 'block' : 'none'};
  padding: 5px;
  margin: 0 0 10px;
  background: #121211;
  border-radius: 3px;
  text-align: center;
  font-size: 0.875em;
  color: #DB3535;
`

const FormError = ({ error }) =>
  <P hasError={ !!error }>{ error }</P>

export default FormError
