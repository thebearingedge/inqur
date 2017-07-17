import React from 'react'
import styled from 'styled-components'

const P = styled.p`
  display: ${({ hasError }) => hasError ? 'block' : 'none'};
  padding: 5px;
  margin: 0 0 10px;
  border-radius: 3px;
  background-color: #121211;
  text-align: center;
  font-size: 0.875em;
  color: ${({ submitting }) => submitting ? '#121211' : '#DB3535'};
`

const FormError = ({ error, ...props }) =>
  <P className='form-error' hasError={ !!error } { ...props }>{ error }</P>

export default FormError
