import { useEffect, RefObject } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, fn: () => void): void => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      fn()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, fn])
}

export default useClickOutside
