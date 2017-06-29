const emailRegex = /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const isEmail = email => emailRegex.test(email.trim())

const usernameRegex = /[\W_]/g

const validateUsername = username => {
  const { length } = username
  if (!length) return 'Please choose a username.'
  if (length > 63) return 'Usernames cannot be more than 63 characters.'
  if (length < 4) return 'Your username must be at least 4 characters long.'
  if (usernameRegex.test(username)) return 'Usernames can only contain letters and numbers.'
  return null
}

export const validate = ({
  username = '',
  email = '',
  password = '',
  retypePassword = ''
}) => ({
  username: validateUsername(username.trim()),
  email: isEmail(email) ? null : 'A valid email is required.',
  password: password.trim() ? null : 'Please choose a password.',
  retypePassword: password.trim() === retypePassword.trim()
    ? null
    : 'Passwords must match.'
})

export const shouldAsyncValidate = ({ blurredField }) =>
  !blurredField || !!blurredField.nativeEvent
