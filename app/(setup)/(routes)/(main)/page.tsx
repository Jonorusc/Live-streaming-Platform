'use client'
import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'
import { signOutUser } from '@/actions/user'
import ThemeSwitcher from '@/components/ui/theme'
import { useToast } from '@/hooks/use-toast'
import { signout } from '@/lib/firebase/auth'

export default function Home() {
  const { onOpen } = useModal()

  const { user, userMutate } = useUser()
  const { addToast } = useToast()

  return (
    <main>
      <ThemeSwitcher />
      <button
        onClick={() => {
          if (!user) return
          addToast({
            id: Date.now(),
            timeout: 5000,
            type: 'islive',
            position: 'top-right',
            data: {
              profile: {
                picture: user?.profile?.avatar as string,
                name: user?.username
              },
              title: user?.username,
              message: 'Toast message'
            }
          })
        }}
      >
        emit toast
      </button>
      <button
        onClick={() => {
          onOpen('signin')
        }}
      >
        emit modal signin
      </button>
      <button
        onClick={() => {
          onOpen('signup')
        }}
      >
        emit modal signup
      </button>
      <button
        onClick={() => {
          console.log(user)
        }}
      >
        current user
      </button>
      <button
        onClick={async () => {
          await signOutUser()
          await signout()
          userMutate()
        }}
      >
        log out user
      </button>

      {user && <p>user is logged in </p>}
    </main>
  )
}
