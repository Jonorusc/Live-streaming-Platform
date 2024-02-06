'use client'
import * as S from './styles'

import Flex from '@/components/ui/flex'
import Avatar from '@/components/ui/image'
import { Title } from '@/components/ui/toast/styles'
import NoSsr from '@/components/NoSsr'
import { formateHighNumber } from '@/utils/text'
import ToolTip from '../tooltip'
import Typrography from '../typography'
import Link from 'next/link'

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
  return (
    <NoSsr>
      <S.Wrapper>
        <ToolTip
          $show={streamer.islive && !disabled}
          $background="surface"
          $content={
            <Typrography
              $color="triadic2"
              $fontSize="xsmall"
              $width="max-content"
            >
              <span>{streamer.islive ? 'Live! Watch now' : 'Offline'}</span>
            </Typrography>
          }
          $position="right"
        >
          <Link href={`/${streamer.name}`}>
            <S.Content disabled={!streamer.islive || disabled}>
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
                  {streamer.islive ? (
                    <>
                      {streamer.viewers && (
                        <S.Counter>
                          <i aria-label="redball"></i>
                          <span>{formateHighNumber(streamer.viewers)}</span>
                        </S.Counter>
                      )}
                    </>
                  ) : (
                    <>
                      <Typrography $color="triadic2" $fontSize="xsmall">
                        <span>Offline</span>
                      </Typrography>
                    </>
                  )}
                </Flex>
              </Flex>
            </S.Content>
          </Link>
        </ToolTip>
      </S.Wrapper>
    </NoSsr>
  )
}

export default Card
