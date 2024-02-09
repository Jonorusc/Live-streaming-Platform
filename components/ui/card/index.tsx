'use client'
import * as S from './styles'

import Flex from '@/components/ui/flex'
import Avatar from '@/components/ui/image'
import { Title } from '@/components/ui/toast/styles'
import NoSsr from '@/components/NoSsr'
import { formateHighNumber, truncate } from '@/utils/text'
import ToolTip from '../tooltip'
import Typrography from '../typography'
import Link from 'next/link'
import { useReadLocalStorage } from 'usehooks-ts'

export type CardProps = {
  title: string
  streamer: {
    name: string
    description?: string
    stream_title: string
    stream_game: string
    picture: string
    islive?: boolean
    viewers?: number
  }
  disabled?: boolean
}

const Card = (props: CardProps) => {
  const { title, streamer, disabled } = props
  return (
    <NoSsr>
      <S.Wrapper>
        <ToolTip
          $show={streamer.islive && !disabled}
          $background="surface"
          $content={<CardTooltip {...props} />}
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
                  <Flex $direction="column" $justify="flex-start">
                    <Title>{title}</Title>
                    <S.Message>{streamer.stream_game}</S.Message>
                  </Flex>
                  {streamer.islive ? (
                    <>
                      <S.Counter>
                        <i aria-label="redball"></i>
                        <span>{formateHighNumber(streamer.viewers!)}</span>
                      </S.Counter>
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

const CardTooltip = ({ title, streamer }: CardProps) => {
  const collapsed = useReadLocalStorage<boolean>('aside-collapsed') || false

  return (
    <>
      {!collapsed ? (
        <Typrography
          $color="triadic2"
          $type="span"
          $text={`${streamer.islive ? streamer.stream_title : 'Offline'}`}
          $fontSize="xsmall"
          $fontWeight="light"
          $width="min(22rem, 24rem)"
        />
      ) : (
        <Flex
          $align="flex-start"
          $gap="0.3rem"
          $direction="column"
          $width="min(24rem,30rem)"
        >
          {streamer.islive && (
            <>
              <Typrography
                $color="primary"
                $text={`${streamer.name} ∙ ${streamer.stream_game}`}
                $type="span"
                $fontSize="xsmall"
                $fontWeight="light"
                $breakWord="break-all"
              />
              <Typrography
                $color="triadic2"
                $type="p"
                $text={truncate(streamer.stream_title, 50)}
                $fontSize="xsmall"
                $fontWeight="light"
                $breakWord="break-all"
              />
              <S.Counter>
                <i aria-label="redball"></i>
                <span>
                  <S.Message>
                    Live | {formateHighNumber(streamer.viewers!)} viewers
                  </S.Message>
                </span>
              </S.Counter>
            </>
          )}
        </Flex>
      )}
    </>
  )
}

export default Card
