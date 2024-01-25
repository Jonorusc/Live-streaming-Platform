import { CURRENTUSER } from '@/actions/user'

const StreamPage = ({ user }: { user: CURRENTUSER }) => {
  return (
    <section>
      <code>
        <var>{JSON.stringify(user.channel)}</var>
      </code>
    </section>
  )
}

export default StreamPage
