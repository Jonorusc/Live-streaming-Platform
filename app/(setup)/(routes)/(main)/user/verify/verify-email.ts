import { getCurrentUser } from '@/lib/firebase/auth'
import { handleverifyemail } from '@/lib/firebase/actions'
import { updateUserEmailStatus } from '@/actions/user'

export const verifyEmail = async (actionCode: string) => {
  // try to verify email
  return new Promise(async (resolve, reject) => {
    const firebaseUser = await getCurrentUser()
    if (!firebaseUser || !firebaseUser.email) {
      reject('You need to be logged in to verify your email.')
      return
    }
    try {
      // inside of handleverifyemail (firebase), we will check if the user is already logged in or not and check the action code as well
      await handleverifyemail(actionCode).then(async () => {
        // I'm using two methods to update the user's email status because at some point if I decide to switch to another authentication platform I can easily change the code
        if (firebaseUser.email) {
          console.log(firebaseUser.email)
          await updateUserEmailStatus(firebaseUser.email)
        } else {
          reject('Something went wrong. Please try again later.')
        }
      })

      resolve('Your email has been verified.')
    } catch (error) {
      reject(error || 'Something went wrong. Please try again later.')
    }
  })
}
