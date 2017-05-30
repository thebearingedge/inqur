import faker from 'faker'

export const User = {
  userId: String,
  username: String,
  email: String
}

export const fakeUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email()
})
