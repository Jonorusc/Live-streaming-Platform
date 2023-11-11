'use client'
import * as S from './styles'

import { useRouter } from 'next/navigation'

import Flex from '@/components/ui/flex'
import Avatar from '@/components/ui/image'
import { Title } from '@/components/ui/toast/styles'

export type CardProps = {
  title: string
  message: string
  streamer: {
    name: string
    picture: string
    islive: boolean
    viewers: number
  }
}

const Card = ({ title, message, streamer }: CardProps) => {
  const router = useRouter()

  const onClickHandler = () => {
    setTimeout(() => {
      // redirects to profile streaming page
      // removes the spaces from the channel name for example? John Doe -> JohnDoe
      const channel_name = streamer.name.replace(/\s/g, '')
      router.push(`/${channel_name}`)
    }, 200)
  }

  return (
    <S.Wrapper onClick={onClickHandler}>
      <Flex $gapY="1rem" $align="center">
        <Avatar
          $size={30}
          $url={streamer.picture}
          alt={streamer.name}
          $rounded
        />
        <Flex $justify="space-between" $width="100%">
          <Flex $direction="column" $align="flex-start">
            <Title>{title}</Title>
            <S.Message>{message}</S.Message>
          </Flex>
          <S.Counter>
            <i aria-label="redball"></i>
            <span>{streamer.viewers}</span>
          </S.Counter>
        </Flex>
      </Flex>
    </S.Wrapper>
  )
}

export default Card
