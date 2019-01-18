import uuid from 'uuid/v4'
import { redis } from '../redis';

export const createConfirmationUrl = async (userId: number) => {
  const token = uuid()

  await redis.set(token, userId, 'ex', 60 * 60 * 24)

  return `http://localhost:3000/user/confirm/${token}`
}