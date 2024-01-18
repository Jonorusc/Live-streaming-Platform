'use client'
import * as S from '../styles'

import { CURRENTUSER, updateUser } from '@/actions/user'
import { CirclePicker } from 'react-color'
import { useReadLocalStorage } from 'usehooks-ts'
import { DefaultTheme } from 'styled-components'
import { useState, useTransition } from 'react'
import Typrography from '@/components/ui/typography'
import Flex from '@/components/ui/flex'
import Box2D from '@/components/ui/box2d'
import ReactLoading from 'react-loading'
import Button from '@/components/ui/button'
import Card from '@/components/ui/sidenav/card'
import { Video } from 'lucide-react'
import { COLORS } from '@/components/ui/types'

const ChannelColor = ({ user }: { user: CURRENTUSER }) => {
  const theme: DefaultTheme | null = useReadLocalStorage('theme')
  const [color, setColor] = useState(
    user.profile!.color || theme?.palette?.primary
  )
  const [boxColor, setBoxColor] = useState<COLORS>(
    (Object.keys(theme!.palette).find(
      (key) => theme!.palette[key as COLORS] === color
    ) as COLORS) || 'primary'
  )
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  // here I'm creating an array of theme palette colours without the text key to pass to the circle picker component
  const invalidKeys = [
    'text',
    'transparent',
    'surface',
    'darkGrey',
    'background',
    'white',
    'whiteSmoke',
    'darker',
    'dark',
    'darkerGrey',
    'triadic2'
  ]
  const themeColours =
    theme?.palette &&
    (
      Object.entries(theme.palette)
        .map(([key, value]) => {
          if (!invalidKeys.includes(key)) return value
        })
        .filter((value) => value !== undefined) as string[]
    )
      // filter for equal values to remove duplicates
      .filter((value, index, self) => self.indexOf(value) === index)

  const handleSaveChanges = () => {
    startTransition(() => {
      // save changes to db
      updateUser({
        username: user.username,
        value: {
          profile: {
            update: {
              color
            }
          }
        }
      })
      setSaved(true)
    })
  }

  return (
    <>
      <Typrography
        $color="triadic2"
        $text="Channel Colour"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <S.Section>
        <Typrography
          $color="triadic2"
          $text="Choose an accent colour to highlight your personal brand around Twitch Clone and in your channel elements."
          $type="span"
          $fontSize="xsmall"
          $fontWeight="light"
          $margin="0 0 1.5rem 0"
        />
        <Flex
          $justify="space-between"
          aria-label="expanded"
          $margin="3rem 0 0 0"
        >
          <div>
            <CirclePicker
              colors={themeColours}
              color={color}
              onChangeComplete={(color) => {
                setColor(color.hex)
                setSaved(false)
                // set box color as the color.hex value theme.palette key value
                setBoxColor(
                  Object.keys(theme!.palette).find(
                    (key) => theme!.palette[key as COLORS] === color.hex
                  ) as COLORS
                )
              }}
            />
          </div>

          <Flex
            $flow="column wrap"
            $gap="1rem"
            $background="darkGrey"
            $padding="1rem"
          >
            <Box2D $color={boxColor} $active>
              <S.Preview>
                <Video size={50} color={theme?.palette.lightGrey} />
              </S.Preview>
            </Box2D>
            <Card
              disabled
              title={user.username}
              message="Playing league of legends"
              streamer={{
                islive: false,
                name: user.username,
                picture: user!.profile!.avatar,
                viewers: 1300
              }}
            />
          </Flex>
          <Flex
            $justify="flex-end"
            $background="surface"
            $width="100%"
            $padding="2rem"
            aria-label="section-footer"
          >
            <Button
              type="submit"
              $bgcolor="primary"
              $hoverColor="primary"
              $color="whiteSmoke"
              $fontSize="small"
              $fontWeight="semiBold"
              disabled={isPending || saved || color === user.profile!.color}
              onClick={handleSaveChanges}
            >
              {isPending ? (
                <Flex $align="center" $justify="center" $gapY="0.3rem">
                  <ReactLoading
                    type="spin"
                    color="#B4BDc7"
                    height={16}
                    width={16}
                  />
                </Flex>
              ) : (
                <>{saved ? '✔️' : 'Save Changes'}</>
              )}
            </Button>
          </Flex>
        </Flex>
      </S.Section>
    </>
  )
}
export default ChannelColor
