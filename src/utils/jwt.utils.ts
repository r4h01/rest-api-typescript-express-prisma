import { findAndUpdateSession, findSession } from '../service/session.service'

export async function verifyToken(token: string): Promise<boolean> {
  const session = await findSession(token)
  if (session.data?.isActive) {
    return true
  }

  return false
}

export async function invalidateToken(token: string): Promise<boolean> {
  const invalidateSession = await findAndUpdateSession(token)
  if (invalidateSession.error) {
    return false
  }

  return true
}
