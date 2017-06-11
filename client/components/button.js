import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  padding: 10px 25px;
  border: none;
  border-radius: 2px;
  font: inherit;
  font-size: 0.875em;
  letter-spacing: 0.02em;
  outline: 0;
  color: inherit;
  background-color: ${({ disabled }) =>
    disabled
      ? 'rgb(157, 160, 190)'
      : 'rgb(92, 105, 255)'
    };

  cursor: pointer;

  &:hover {
    background-color: rgb(99, 111, 255);
  }
`

export default Button
