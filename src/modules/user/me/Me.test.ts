import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm"
import { gCall } from "../../../test-utils/gCall"
import faker from 'faker'
import { User } from "../../../entities/User"

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

const meQuery = `
}
  me {
    id
    firstName
    lastName
    email
  }
}
`

describe('Me', () => {
  it('create user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save()

    const res = await gCall({
      source: meQuery,
      userId: user.id
    })

    expect(res).toMatchObject({
      data: {
        me: {
          id: user.id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })
  })

  it('returns null', async () => {
    const res = await gCall({
      source: meQuery
    })

    expect(res).toMatchObject({
      data: {
        me: null
      }
    })
  })
})