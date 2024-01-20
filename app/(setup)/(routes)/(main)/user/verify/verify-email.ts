import { getCurrentUser } from '@/lib/firebase/auth'
import { handleverifyemail } from '@/lib/firebase/actions'
import { updateUserEmailStatus } from '@/actions/user'

export const verifyEmail = async (actionCode: string) => {
  try {
    const firebaseUser = await getCurrentUser()

    if (!firebaseUser || !firebaseUser.email) {
      throw new Error('You need to be logged in to verify your email.')
    }

    await handleverifyemail(actionCode)
    if (firebaseUser.email) {
      await updateUserEmailStatus(firebaseUser.email)
    } else {
      throw new Error('Something went wrong. Please try again later.')
    }

    return 'Your email has been verified.'
  } catch (error: any) {
    throw new Error(error || 'Something went wrong. Please try again later.')
  }
}
