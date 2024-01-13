'use client'
import Flex from '@/components/ui/flex'

import { Responses } from '@/components/ui/logos/svg'
import Typrography from '@/components/ui/typography'
import Link from 'next/link'

const NotVerified = ({}) => {
  return (
    <>
      <Flex $gapY="1.5rem" $justify="flex-start" $align="center">
        <Responses $type="warning" $size={20} />
        <Typrography
          $text="You must verify your email address to have access to all features."
          $color="triadic2"
          $type="h5"
          $fontSize="small"
          $fontWeight="semiBold"
          $margin="0.5rem 0"
        />
      </Flex>
      <Link href="/user/settings/security">Go to secutiry</Link>
    </>
  )
}
export default NotVerified
