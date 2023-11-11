import { initializeApp } from 'firebase/app'
import {
  AuthErrorCodes,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'

import { app_config } from '@/utils/firebase'

const app = initializeApp(app_config)
const auth = getAuth(app)

export type UserReturnProps = {
  message: string
  error?: {
    [key: string]: string
  }
  data: User | null
}

// fuction for checking if user is logged in (get the current user)
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user)
      } else {
        reject(null)
      }
    })
  })
}

// function for signup a user
export const signup = (
  email: string,
  password: string
): Promise<UserReturnProps> => {
  return new Promise<UserReturnProps>((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        resolve({
          message: 'Signed up successfully.',
          data: userCredential.user
        })
        // ...
      })
      .catch((error) => {
        reject({
          message: error.message,
          data: null
        })
      })
  })
}

// function for signin a user
export const signin = (
  email: string,
  password: string
): Promise<UserReturnProps> => {
  return new Promise<UserReturnProps>((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        resolve({
          message: 'Signed in successfully.',
          data: userCredential.user
        })
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            reject({
              message: 'The email address is incorrect.',
              error: {
                email: 'The email address is incorrect.'
              },
              data: null
            })
            break
          case AuthErrorCodes.INVALID_PASSWORD:
            reject({
              message: 'The email password is incorrect.',
              error: {
                password: 'The password is incorrect.'
              },
              data: null
            })
            break
          case AuthErrorCodes.USER_MISMATCH:
            reject({
              message: 'There is no user corresponding to the given email.',
              error: {
                user: 'There is no user corresponding to the given email.'
              },
              data: null
            })
            break
          case AuthErrorCodes.CREDENTIAL_MISMATCH:
            reject({
              message: 'Invalid authentication credentials provided.',
              error: {
                auth: 'Invalid authentication credentials provided.'
              },
              data: null
            })
            break
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            reject({
              message:
                'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
              error: {
                auth: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
              },
              data: null
            })
            break
          default: {
            if (error.message.includes('auth/invalid-login-credentials')) {
              reject({
                message: 'Invalid login credentials provided.',
                error: {
                  auth: 'Invalid login credentials provided.'
                },
                data: null
              })
              return
            }
            reject({
              message: error.message,
              data: null
            })
          }
        }
      })
  })
}

// function for signout a user
export const signout = (): Promise<String> => {
  return new Promise<String>((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve('Sign-out successful.')
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}
