'use client'

import * as S from './styles'

import Flex from '@/components/ui/flex'
import { User } from 'lucide-react'
import Avatar from '@/components/ui/image'
import { CURRENTUSER } from '@/actions/user'
import { Separator } from '@/components/ui/separator'
import Typrography from '@/components/ui/typography'
import useClickOutside from '@/hooks/use-clickoutside'
import ThemeSwitcher from '@/components/ui/theme'

import { DropdownItem, dropdownItems } from './dropdown-menu-items'

import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { getLayout } from '@/lib/utils/layout'

const Item = ({
  title,
  id,
  Icon,
  link,
  separator,
  click,
  auth,
  user,
  view,
  setShowDp,
  layoutView,
  ...props
}: DropdownItem & {
  user: CURRENTUSER | null
  setShowDp?: Dispatch<SetStateAction<boolean>>
  layoutView: 'creator' | 'user'
} & React.HTMLAttributes<HTMLElement>) => {
  const handleItemClick = async () => {
    setShowDp && setShowDp(false)
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
  if (view && view !== layoutView) {
    return null
  }
  return (
    <>
      {auth && user && (
        <>
          {separator && <Separator />}
          <S.DropDownItem onClick={handleItemClick}>
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

export const Dropdown = ({ user }: { user: CURRENTUSER | null }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDp, setShowDp] = useState(false)
  const viewType = getLayout()
  useClickOutside(dropdownRef, () => setShowDp(false))
  return (
    <>
      <S.DropDown ref={dropdownRef} onClick={() => setShowDp((prev) => !prev)}>
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
          <S.DropDownBody onClick={(e) => e.stopPropagation()}>
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
                  <Flex $direction="column">
                    <Typrography
                      $lineHeight="1.5"
                      $text={user.username}
                      $fontSize="xsmall"
                      $color="triadic2"
                      $fontWeight="semiBold"
                    />
                    {viewType === 'creator' && (
                      <Typrography
                        $lineHeight="1.5"
                        $text="Creator"
                        $fontSize="xsmall"
                        $color="grey"
                        $fontWeight="light"
                      />
                    )}
                  </Flex>
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
                <Item
                  {...item}
                  layoutView={viewType}
                  user={user}
                  setShowDp={setShowDp}
                />
              </React.Fragment>
            ))}
          </S.DropDownBody>
        )}
      </S.DropDown>
    </>
  )
}
