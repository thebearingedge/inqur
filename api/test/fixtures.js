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

export const Option = {
  optionId: String,
  answer: String,
  pollId: String,
  createdAt: String,
  updatedAt: String
}

export const Poll = {
  pollId: String,
  question: String,
  slug: String,
  isPublished: Boolean,
  userId: String,
  createdAt: String,
  updatedAt: String,
  options: [Option]
}

export const fakePoll = userId => ({
  userId,
  question: faker.hacker.phrase(),
  options: Array(2).fill().map(() => ({
    answer: faker.hacker.phrase()
  }))
})
