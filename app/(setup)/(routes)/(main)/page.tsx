'use client'
import NoSsr from '@/components/NoSsr'
import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'
import { signout, getCurrentUser } from '@/lib/firebase/auth'

export default function Home() {
  const { onOpen } = useModal()

  const { user, userMutate } = useUser()

  return (
    <main>
      <NoSsr>
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
          onClick={async () => {
            const user = await getCurrentUser()
            console.log(user)
          }}
        >
          get current user
        </button>
        <button
          onClick={async () => {
            await signout().then(() => {
              userMutate()
            })
          }}
        >
          log out user
        </button>
        {user && <p>user is logged in</p>}
      </NoSsr>
    </main>
  )
}
