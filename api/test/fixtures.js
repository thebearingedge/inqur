import faker from 'faker'

export const User = {
  userId: String,
  username: String,
  email: String,
  createdAt: String,
  updatedAt: String
}

export const fakeUser = () => ({
  username: faker.internet.userName().replace(/[\W_]/g, '').slice(0, 63),
  password: faker.internet.password(),
  email: faker.internet.email()
})
