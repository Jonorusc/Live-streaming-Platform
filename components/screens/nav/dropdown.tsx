'use client'

import * as S from './styles'

import Flex from '@/components/ui/flex'
import { User } from 'lucide-react'
import Avatar from '@/components/ui/image'
import Button from '@/components/ui/button'
import { CURRENTUSER } from '@/actions/user'
import { useModal } from '@/hooks/use-modal'
import { Separator } from '@/components/ui/separator'
import Typrography from '@/components/ui/typography'
import useClickOutside from '@/hooks/use-clickoutside'
import ThemeSwitcher from '@/components/ui/theme'

import { DropdownItem, dropdownItems } from './dropdown-items'

import React, { useState, useRef } from 'react'
import Link from 'next/link'

const Item = ({
  title,
  Icon,
  link,
  separator,
  click,
  auth,
  user
}: DropdownItem & { user: CURRENTUSER | null }) => {
  const handleItemClick = async () => {
    // ...
  }

  const redirect = () => {
    if (link) {
      return link
    } else if (user) {
      switch (title) {
        case 'Settings': {
          return '/user/settings'
        }
        case 'Channel': {
          return `/${user!.username}`
        }
        default: {
          return '/'
        }
      }
    } else {
      return '/'
    }
  }

  const $link = redirect()
  return (
    <>
      {auth && user && (
        <>
          {separator && <Separator />}
          <S.DropDownItem>
            {!click ? (
              <Link href={$link} prefetch={false}>
                <Flex
                  $align="center"
                  $gapY="0.5rem"
                  $padding="0.5rem"
                  aria-label="dropdown-item"
                >
                  <Icon size={20} />
                  <Typrography
                    $lineHeight="1.2"
                    $text={title}
                    $fontSize="xsmall"
                    $color="triadic2"
                    $fontWeight="normal"
                  />
                </Flex>
              </Link>
            ) : (
              <Flex
                $align="center"
                $gapY="0.5rem"
                $padding="0.5rem"
                aria-label="dropdown-item"
                onClick={click}
              >
                <Icon size={20} />
                <Typrography
                  $lineHeight="1.2"
                  $text={title}
                  $fontSize="xsmall"
                  $color="triadic2"
                  $fontWeight="normal"
                />
              </Flex>
            )}
          </S.DropDownItem>
        </>
      )}
      {!auth && (
        <>
          {separator && <Separator />}
          {title === 'Theme' && <ThemeSwitcher />}
        </>
      )}
    </>
  )
}

export const DropDown = ({ user }: { user: CURRENTUSER | null }) => {
  const { onClose, onOpen } = useModal()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDp, setShowDp] = useState(false)

  useClickOutside(dropdownRef, () => setShowDp(false))

  return (
    <>
      <Flex
        $align="center"
        $gapY="1rem"
        $padding="0 0.5rem 0 0"
        $justify="flex-end"
      >
        {!user && (
          <>
            <Button
              $bgcolor="triadic1"
              $color="triadic2"
              $fontSize="small"
              $fontWeight="bold"
              onClick={() => {
                onClose()
                onOpen('signin')
              }}
            >
              Log In
            </Button>
            <Button
              $bgcolor="primary"
              $hoverColor="primary"
              $color="whiteSmoke"
              $fontSize="small"
              $fontWeight="bold"
              onClick={() => {
                onClose()
                onOpen('signup')
              }}
            >
              Sign Up
            </Button>
          </>
        )}
        <S.DropDown
          ref={dropdownRef}
          onClick={() => setShowDp((prev) => !prev)}
        >
          {user && user?.profile ? (
            <Avatar
              $url={user.profile.avatar}
              alt={user.username}
              $size={30}
              $rounded
            />
          ) : (
            <S.Avatar>
              <User size={20} />
            </S.Avatar>
          )}
          {showDp && (
            <S.DropDownBody>
              {user && user?.profile && (
                <>
                  <Flex $align="center" $gapY="1rem" $padding="0.5rem">
                    <Link href="/user/settings">
                      <Avatar
                        $url={user.profile.avatar}
                        alt={user.username}
                        $size={40}
                        $rounded
                      />
                    </Link>
                    <Typrography
                      $lineHeight="1.5"
                      $text={user.username}
                      $fontSize="xsmall"
                      $color="triadic2"
                      $fontWeight="semiBold"
                    />
                  </Flex>
                  <Separator />
                </>
              )}
              {!user && (
                <>
                  <Flex $align="center" $gapY="1rem" $padding="0.5rem">
                    <S.Avatar>
                      <User size={20} />
                    </S.Avatar>
                    <Typrography
                      $lineHeight="1.5"
                      $text="Guest"
                      $fontSize="xsmall"
                      $color="triadic2"
                      $fontWeight="semiBold"
                    />
                  </Flex>
                  <Separator />
                </>
              )}
              {dropdownItems.map((item) => (
                <React.Fragment key={item.id}>
                  <Item {...item} user={user} />
                </React.Fragment>
              ))}
            </S.DropDownBody>
          )}
        </S.DropDown>
      </Flex>
    </>
  )
}
