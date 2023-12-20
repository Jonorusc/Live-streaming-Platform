import { useEffect } from 'react'

const useKeyboardEvent = (key: string, callback: Function) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
}

export default useKeyboardEvent
