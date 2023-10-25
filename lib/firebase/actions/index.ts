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
import { app_config, generateOOBCode } from '@/utils/firebase'

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
export const sendemailverification = (): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    const user = auth.currentUser
    const mainUrl = process.env.NEXT_PUBLIC_URL || window.location.origin
    const mode = 'verifyEmail'
    const oobCode = generateOOBCode(10)
    if (user) {
      sendEmailVerification(user, {
        url: `${mainUrl}/auth/verify-email?mode=${mode}&oobCode=${oobCode}`
      })
        .then(() => {
          resolve('Please check your email for verification. Thank you!')
        })
        .catch((error) => {
          reject(error.message)
        })
    } else {
      reject('No user found.')
    }
  })
}

// handle email verification
export const handleverifyemail = (actionCode: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    applyActionCode(auth, actionCode)
      .then(() => {
        resolve('Email address has been verified.')
      })
      .catch((error) => {
        switch (error.code) {
          case AuthErrorCodes.EXPIRED_OOB_CODE:
            reject(
              'Code is invalid or expired. Please verify your email address again.'
            )
            break
          default:
            reject(error.message)
            break
        }
      })
  })
}

// send password reset email
export const sendpasswordresetemail = (email: string): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    const mainUrl = process.env.NEXT_PUBLIC_URL || window.location.origin
    const mode = 'resetPassword'
    const oobCode = generateOOBCode(10)
    sendPasswordResetEmail(auth, email, {
      url: `${mainUrl}/auth/reset-password?mode=${mode}&oobCode=${oobCode}`
    })
      .then(() => {
        resolve('Please check your email for reset password. Thank you!')
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}

// handle password reset
export const handlepasswordreset = (
  actionCode: string,
  newPassword: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        // you can use email to send a notification to user that their password has been reset
        confirmPasswordReset(auth, actionCode, newPassword)
          .then(() => {
            resolve(
              'Your password has been reset. Please login with your new password.'
            )
          })
          .catch((error) => {
            reject(error.message)
          })
      })
      .catch((error) => {
        switch (error.code) {
          case AuthErrorCodes.EXPIRED_OOB_CODE:
            reject(
              'Code is invalid or expired. Please reset your password again.'
            )
            break
          default:
            reject(error.message)
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
