export default function passwordStrength(password: string): {
  strength: string
  color: string
} {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (
    (password?.length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar) ||
    (password?.length >= 10 && hasLowerCase)
  ) {
    return { strength: 'Strong', color: '#00f593' }
  } else if (
    password?.length >= 6 &&
    ((hasUpperCase && hasLowerCase && hasNumber) ||
      (hasUpperCase && hasLowerCase && hasSpecialChar) ||
      (hasLowerCase && hasNumber && hasSpecialChar) ||
      (hasUpperCase && hasNumber && hasSpecialChar))
  ) {
    return { strength: 'Medium', color: '#fba12e' }
  } else {
    return { strength: 'Weak', color: '#eb0400' }
  }
}
