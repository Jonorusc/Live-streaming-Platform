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

type UserReturnProps = {
  message: string
  data: User | null
}

// fuction for checking if user is logged in (get the current user)
export const getCurrentUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      return user
      // ...
    } else {
      // User is signed out
      return null
    }
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
              data: null
            })
            break
          case AuthErrorCodes.INVALID_PASSWORD:
            reject({
              message: 'The email password is incorrect.',
              data: null
            })
            break
          case AuthErrorCodes.USER_MISMATCH:
            reject({
              message: 'There is no user corresponding to the given email.',
              data: null
            })
            break
          default:
            reject({
              message: error.message,
              data: null
            })
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
