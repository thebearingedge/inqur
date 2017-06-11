import debounce from 'debounce'
import { connect } from 'react-redux'
import styled from 'styled-components'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { Input, Button, Anchor } from '../components'
import { onSubmit, onSubmitSuccess, asyncValidate } from './actions'
import { validate, shouldAsyncValidate } from './helpers'

const Logo = styled.img`
  display: block;
  margin: 0 auto 90px;
  width: 188px;
`

const Signup = styled.div`
  padding-top: 80px;
  width: 350px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 11px;
  letter-spacing: 0.03em;
  line-height: 28px;
  color: #fff;
`

const FadeBreak = styled.span`
  display: inline-block;
  width: 129px;
  height: 3px;
  margin: ${({ flipped }) => flipped ? '0 0 0 2px' : '0 3px 0 7px'};
  opacity: 0.7;
  background: url('/images/fading-section-break.png') no-repeat;
  transform: ${({ flipped }) => !flipped || 'rotate(180deg) translate(0,2px);'}
`

const Inputs = styled.div`
  padding: 15px;
  border-radius: 5px;
  background: #2c2f34;
  box-shadow: 2px 2px 9px 3px rgba(0, 0, 0, 0.2);

  div:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Controls = styled.div`
  margin-top: 15px;
  text-align: right;
`

class Page extends Component {
  componentDidMount() {
    const { asyncValidate } = this.props
    this.asyncValidate = debounce(asyncValidate, 200)
  }
  render() {
    const { asyncValidate } = this
    const { handleSubmit, submitting } = this.props
    return (
      <Signup>
        <form noValidate onSubmit={ handleSubmit }>
          <Title>
            <Logo src='/images/inqur.svg'/>
            <FadeBreak/> Sign up <FadeBreak flipped/>
          </Title>
          <Inputs>
            <Field
              autoFocus
              name='username'
              type='text'
              placeholder='Username'
              onChange={ asyncValidate }
              component={ Input }/>
            <Field
              name='email'
              type='email'
              placeholder='Email'
              component={ Input }/>
            <Field
              name='password'
              type='password'
              placeholder='Password'
              component={ Input }/>
            <Field
              name='retypePassword'
              type='password'
              placeholder='Retype Password'
              component={ Input }/>
          </Inputs>
          <Controls>
            <Anchor href='#'>sign in</Anchor>
            <Button type='submit' disabled={ submitting }>Register</Button>
          </Controls>
        </form>
      </Signup>
    )
  }
}

export const mapDispatch = dispatch => bindActionCreators({
  onSubmit,
  asyncValidate,
  onSubmitSuccess
}, dispatch)

export const Register = connect(null, mapDispatch)(reduxForm({
  form: 'signup',
  validate,
  touchOnBlur: false,
  shouldAsyncValidate
})(Page))
