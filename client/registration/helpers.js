const isEmail = email =>
  /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)

export const validate = ({
  username = '',
  email = '',
  password = '',
  retypePassword = ''
}) => ({
  username: username.trim() ? null : 'Please choose a username.',
  email: email.trim() && isEmail(email) ? null : 'A valid email is required.',
  password: password.trim() ? null : 'Please choose a password.',
  retypePassword: password.trim() === retypePassword.trim()
    ? null
    : 'Passwords must match.'
})

export const shouldAsyncValidate = ({ blurredField }) => {
  return !blurredField || !!blurredField.nativeEvent
}
