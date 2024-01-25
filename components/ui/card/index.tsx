'use client'
import * as S from './styles'

import { useRouter } from 'next/navigation'

import Flex from '@/components/ui/flex'
import Avatar from '@/components/ui/image'
import { Title } from '@/components/ui/toast/styles'
import NoSsr from '@/components/NoSsr'
import { formateHighNumber } from '@/utils/text'
import ToolTip from '../tooltip'
import Typrography from '../typography'

export type CardProps = {
  title: string
  message: string
  streamer: {
    name: string
    description?: string
    picture: string
    islive?: boolean
    viewers?: number
  }
  disabled?: boolean
}

const Card = ({ title, message, streamer, disabled }: CardProps) => {
  const router = useRouter()

  const onClickHandler = () => {
    if (disabled) return
    setTimeout(() => {
      // redirects to profile streaming page
      // removes the spaces from the channel name for example? John Doe -> JohnDoe
      const channel_name = streamer.name.replace(/\s/g, '')
      router.push(`/${channel_name}`)
    }, 200)
  }

  return (
    <NoSsr>
      <ToolTip
        $show={!disabled}
        $background="surface"
        $content={
          <Typrography $color="triadic2" $fontSize="xsmall">
            <span>{streamer.islive ? 'Live! Watch now' : 'Offline'}</span>
          </Typrography>
        }
        $position="right"
      >
        <S.Wrapper onClick={onClickHandler} disabled={disabled}>
          <Flex $gapY="1rem" $align="center">
            <Avatar
              $size={30}
              $url={streamer.picture}
              alt={streamer.name}
              $rounded
            />
            <Flex
              $justify="space-between"
              $width="100%"
              aria-label="stream-description"
            >
              <Flex $direction="column" $align="flex-start">
                <Title>{title}</Title>
                <S.Message>{message}</S.Message>
              </Flex>
              {streamer.viewers && (
                <S.Counter>
                  <i aria-label="redball"></i>
                  <span>{formateHighNumber(streamer.viewers)}</span>
                </S.Counter>
              )}
            </Flex>
          </Flex>
        </S.Wrapper>
      </ToolTip>
    </NoSsr>
  )
}

export default Card
