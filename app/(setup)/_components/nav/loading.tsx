import Flex from '@/components/ui/flex'
import { Twitch } from '@/components/ui/logos'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingNav() {
  return (
    <Flex
      $align="center"
      $justify="space-between"
      $width="100%"
      $height="5rem"
      $padding="1rem"
      $background="surface"
    >
      <Flex $align="center">
        <Twitch height="30px" width="30" />
        <Skeleton $width="8rem" $margin="0 3rem" $height="1rem" />
        <Skeleton $width="8rem" $height="1rem" />
      </Flex>
      <Skeleton $width="8rem" $margin="0 3rem" $height="1rem" />
    </Flex>
  )
}
