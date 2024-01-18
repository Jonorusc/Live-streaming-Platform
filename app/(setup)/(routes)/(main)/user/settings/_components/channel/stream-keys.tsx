'use client'
import * as S from '../styles'
import { CURRENTUSER } from '@/actions/user'
import Typrography from '@/components/ui/typography'
import { useState } from 'react'

const StreamKeys = ({ user }: { user: CURRENTUSER }) => {
  return (
    <>
      <Typrography
        $color="triadic2"
        $text="Manage your stream keys for OBS, XSplit, and more."
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <S.Section>stream keys</S.Section>
    </>
  )
}

export default StreamKeys
