import * as S from './styles'

import Link from 'next/link'
import { getCurrentUser } from '@/actions/user'

import { TwitchAnimated } from '@/components/ui/logos/animated'
import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'

import { Searcher } from './search'
import { DropDown } from './dropdown'

const Nav = async () => {
  const user = await getCurrentUser()

  return (
    <NoSsr>
      <S.Wrapper>
        <Flex $align="center">
          <Link href="/">
            <TwitchAnimated $pointer />
          </Link>
          {user && (
            <Link href="/following">
              <h5>Following</h5>
            </Link>
          )}

          <Link href="browse">
            <h5>Browse</h5>
          </Link>
        </Flex>
        <Searcher />
        <DropDown user={user} />
      </S.Wrapper>
    </NoSsr>
  )
}

export default Nav
