'use client'

import * as S from './styles'
import TextField from '@/components/ui/text/no-hrf'
import { Search } from 'lucide-react'

import React, { useState, useRef, useEffect } from 'react'
import { debounce } from 'lodash'
import useClickOutside from '@/hooks/use-clickoutside'
import { useWidth } from '@/utils/screen'

import { type RESULT, searchQuery } from '@/actions/user'
import Avatar from '@/components/ui/image'
import Flex from '@/components/ui/flex'
import Typrography from '@/components/ui/typography'
import Link from 'next/link'

export const Searcher = () => {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)
  const [result, setResult] = useState<RESULT>([])
  const ref = useRef<HTMLDivElement>(null)
  const width = useWidth()

  const clearSearch = () => {
    setActive(false)
    setResult([])
  }

  useClickOutside(ref, clearSearch)

  const fetch = async (value: string) => {
    if (value.length < 2) return
    const result = await searchQuery(value)

    if (!result) return

    setResult(result)
  }

  const debouncedSearch = debounce(async (value) => {
    setSearch(value)
    await fetch(value)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1 && width > 764) clearSearch()
    debouncedSearch(e.target.value)
  }

  useEffect(() => {
    if (search.length < 2) {
      clearSearch()
      return
    }
    if (active) return
    setActive(true)
  }, [search])

  const handleClick = async () => {
    // if screen is mobile, always show search box
    if (width <= 968) {
      setActive(true)
      return
    }
    // if screen is desktop, show search box only if search.length >= 4 which is working together with useEffect
    if (search.length >= 2) {
      setActive(true)
      await fetch(search)
    }
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clicked')
  }

  const output = (username: string) => {
    return username
      .split(new RegExp(`(${search})`, 'gi'))
      .map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span key={index}>{part}</span>
        ) : (
          <h4 key={index}>{part}</h4>
        )
      )
  }

  return (
    <S.SearchBox $active={active} ref={ref} onClick={handleClick}>
      <S.Search $active={active}>
        <TextField
          placeholder="Search"
          name="nav-search"
          type="search"
          $handleChange={handleChange}
        />
        <button
          disabled={width <= 968 && !active ? false : search.length < 2}
          onClick={handleSearchClick}
        >
          <Search size={18} />
        </button>
      </S.Search>
      {active && (
        <S.Results>
          {result.map((user) => (
            <Link href={`/${user.username}`} key={user.username}>
              <Flex $align="center" $justify="space-between">
                <Flex $align="center" $gapY="0.6rem" $padding="0.5rem">
                  {user.channel ? (
                    <Avatar
                      $url={user.profile!.avatar}
                      alt={user.username}
                      $size={30}
                      $rounded
                    />
                  ) : (
                    <Search size={20} />
                  )}
                  <Typrography $color="triadic2" $fontSize="small">
                    <span>
                      <Flex $align="center">{output(user.username)}</Flex>
                    </span>
                  </Typrography>
                </Flex>
                {user.channel?.live && (
                  <Flex $align="center">
                    <S.Streaming>Live</S.Streaming>
                  </Flex>
                )}
              </Flex>
            </Link>
          ))}
          {search.length >= 5 && (
            <Link href={`/${search}`}>
              <Flex $align="center" $gapY="0.5rem" $margin="0.5rem 0 0 0">
                {/* I'm using 5 because it's the minimum to create a username, so if the user searches for a string with length less than 6 he will receive the 404 page */}
                <Typrography
                  $color="triadic2"
                  $fontSize="small"
                  $type="span"
                  $text={`Go to "${search}"`}
                />
              </Flex>
            </Link>
          )}
        </S.Results>
      )}
    </S.SearchBox>
  )
}
