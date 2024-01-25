import * as S from './styles'

import { getCurrentUser } from '@/actions/user'

import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'

import { UserSection } from './user-section'
import { TwitchAnimated } from '@/components/ui/logos/animated'
import Link from 'next/link'

const Nav = async () => {
  const user = await getCurrentUser()

  return (
    <NoSsr>
      <S.Wrapper>
        <Flex $align="center">
          <Link href="/">
            <TwitchAnimated $pointer />
          </Link>
        </Flex>
        <UserSection user={user} />
      </S.Wrapper>
    </NoSsr>
  )
}

export default Nav
