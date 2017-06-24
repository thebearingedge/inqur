export const validate = ({
  username = '',
  password = ''
}) => ({
  username: username.trim() ? null : 'Enter your username.',
  password: password.trim() ? null : 'Enter your password.'
})
