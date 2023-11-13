import { initializeApp } from 'firebase/app'
import {
  AuthErrorCodes,
  getAuth,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  deleteUser
} from 'firebase/auth'
import { app_config } from '@/utils/firebase'

const app = initializeApp(app_config)
const auth = getAuth(app)

// update password
export const updatepassword = (newPassword: string): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          resolve('Password updated successfully.')
        })
        .catch((error) => {
          reject(error.message)
        })
    } else {
      reject('No user found.')
    }
  })
}

// update email address
export const updateemail = (newEmail: string): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      updateEmail(user, newEmail)
        .then(() => {
          resolve('Email updated successfully.')
        })
        .catch((error) => {
          reject(error.message)
        })
    } else {
      reject('No user found.')
    }
  })
}

// send email verification
export const sendemailverification = (): Promise<String | null> => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          resolve('Verification email sent successfully. Check your inbox!')
        })
        .catch((error) => {
          reject(null)
        })
    } else {
      reject(null)
    }
  })
}

// handle email verification
export const handleverifyemail = (
  actionCode: string
): Promise<{ success: true; error?: { message: string } }> => {
  return new Promise((resolve, reject) => {
    applyActionCode(auth, actionCode)
      .then(async () => {
        resolve({ success: true })
      })
      .catch(async (error) => {
        switch (error.code) {
          case AuthErrorCodes.EXPIRED_OOB_CODE: {
            reject({
              success: false,
              error: {
                message: 'Code is expired. Please resend verification email.'
              }
            })
            break
          }
          case AuthErrorCodes.INVALID_OOB_CODE: {
            reject({
              success: false,
              error: {
                message:
                  'This code has already been used. Please resend verification email.'
              }
            })
            break
          }
          default:
            reject({
              success: false,
              error: {
                message: error.message
              }
            })
            break
        }
      })
  })
}

// send password reset email
export const sendpasswordresetemail = (
  email: string
): Promise<String | null> => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve('Please check your email for reset password. Thank you!')
      })
      .catch((error) => {
        reject(null)
      })
  })
}

// handle password reset
export const handlepasswordreset = (
  actionCode: string,
  newPassword: string
): Promise<{ success: true; error?: { message: string } }> => {
  return new Promise((resolve, reject) => {
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        // you can use email to send a notification to user that their password has been reset
        confirmPasswordReset(auth, actionCode, newPassword)
          .then(() => {
            resolve({
              success: true
            })
          })
          .catch(() => {
            reject({
              success: false,
              error: {
                message: 'Something went wrong. Please try again later.'
              }
            })
          })
      })
      .catch((error) => {
        switch (error.code) {
          case AuthErrorCodes.EXPIRED_OOB_CODE:
            reject({
              success: false,
              error: {
                message: 'Code is expired. Please reset your password again.'
              }
            })
            break
          case AuthErrorCodes.INVALID_OOB_CODE:
            reject({
              success: false,
              error: {
                message: 'Code is invalid. Please reset your password again.'
              }
            })
            break

          default:
            reject({
              success: false,
              error: {
                message: 'Something went wrong. Please try again later.'
              }
            })
            break
        }
      })
  })
}

// delete user
export const deleteuser = (): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      deleteUser(user)
        .then(() => {
          resolve(
            "Your account has been deleted. We're sorry to see you go. Thank you!"
          )
          // signout()
        })
        .catch((error) => {
          reject(error.message)
        })
    } else {
      reject('No user found.')
    }
  })
}

// we can create a recover email using the same logic
// see more at https://firebase.google.com/docs/auth/custom-email-handler
