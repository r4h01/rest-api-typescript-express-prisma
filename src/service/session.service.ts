import { Session } from '@prisma/client'
import db from '../utils/database'
import { generateToken } from '../utils/nanoId.utils'

interface SessionOutput {
  error: boolean
  message?: string
  data?: Session | null
}

export async function createSession(): Promise<SessionOutput> {
  try {
    const token = await generateToken()

    const session: Session = await db.session.create({
      data: {
        token: token,
        isActive: true,
      },
    })

    return {
      error: false,
      data: session,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in createSession: ${error}`,
    }
  }
}

export async function findSession(token: string): Promise<SessionOutput> {
  try {
    const session = await db.session.findUnique({
      where: {
        token: token,
      },
    })

    return {
      error: false,
      data: session,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in findSession: ${error}`,
    }
  }
}

export async function findAndUpdateSession(token: string): Promise<SessionOutput> {
  try {
    const session = await db.session.findUnique({
      where: {
        token: token,
      },
    })

    if (session) {
      const updatedSession = await db.session.update({
        where: {
          id: session.id,
        },
        data: {
          isActive: false,
        },
      })

      return {
        error: false,
        data: updatedSession,
      }
    }

    return {
      error: true,
      message: 'Session not found',
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in findAndUpdateSession: ${error}`,
    }
  }
}

export async function updateSession(id: number): Promise<SessionOutput> {
  try {
    const session = await db.session.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    })

    return {
      error: false,
      data: session,
    }
  } catch (error) {
    return {
      error: true,
      message: `Error in Update Session: ${error}`,
    }
  }
}
