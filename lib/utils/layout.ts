export type LayoutType = 'user' | 'creator'

export const getLayout = (): LayoutType => {
  const location = window.location
  let viewType: LayoutType = 'user'
  if (location.pathname.startsWith('/u/')) {
    viewType = 'creator'
  } else {
    viewType = 'user'
  }

  return viewType
}
