import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocalStorage } from 'usehooks-ts'
import { createViewerToken } from '@/actions/livekit'
import { useToast } from './use-toast'

export const useViewerToken = (channel_name: string, username: string) => {
  const [storedToken, setStoredToken] = useLocalStorage(
    `${channel_name}-viewer-token`,
    ''
  )
  const { addToast } = useToast()

  const createToken = async () => {
    const viewerToken = await createViewerToken(channel_name, username)
    setStoredToken(viewerToken)
  }

  useEffect(() => {
    const loadToken = async () => {
      try {
        if (storedToken) {
          const payload = jwtDecode(storedToken)

          if (payload.exp) {
            const expiry = new Date(payload.exp * 1000)
            if (expiry < new Date()) {
              await createToken()
            }
          }
        } else await createToken()
      } catch {
        setStoredToken('')
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'error',
          position: 'top-right',
          data: {
            message: 'There was an unexpected error. Please try again later.'
          }
        })
      }
    }

    loadToken()
  }, [channel_name, username, storedToken])

  return {
    storedToken
  }
}
