import { createSession } from '../service/session.service'

export async function createSessionHandler(): Promise<{
  error: boolean
  accessToken?: string | null | undefined
  message?: string
}> {
  const session = await createSession()
  if (session.error) {
    return {
      error: true,
      message: `Error in createSessionHandler: ${session.message}`,
    }
  }

  return { error: false, accessToken: session.data?.token }
}
