/**
 * Create a mask for emails.
 *
 *
 * @example
 * ```javascript
 * const email = 'myemail@mail.com'
 * const maskedEmail = emailMask(email)
 * console.log(maskedEmail) // my*@ma*.com
 * ```
 *
 */
export const emailMask = (value: string) => {
  const [name, domain] = value.split('@')
  const [domainName, domainExtension] = domain.split('.')
  const maskedName = name.slice(0, 2) + '*'
  const maskedDomainName = domainName.slice(0, 2) + '*'
  return `${maskedName}@${maskedDomainName}.${domainExtension}`
}
