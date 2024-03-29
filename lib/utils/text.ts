export const separateByUppercase = (sentence: string) => {
  const words = sentence.match(/[A-Z][a-z]*/g)

  // Check if there are uppercase letters and at least two words
  if (words && words.length >= 2) {
    const firstInitial = words[0].charAt(0)
    const lastInitial = words[words.length - 1].charAt(0)

    // Join the initials to form a new string
    const result = firstInitial + lastInitial

    return result
  }

  // If there are no uppercase letters or not enough words,
  // take the first letter and the last letter of the string
  if (sentence.length >= 2) {
    const firstLetter = sentence.charAt(0)
    const lastLetter = sentence.charAt(sentence.length - 1)

    // Join the letters to form a new string
    const result = firstLetter + lastLetter

    return result
  }

  // Return null if the string is too short
  return null
}

export const formateHighNumber = (number: number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return number
}

export const truncate = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }
  return text
}
