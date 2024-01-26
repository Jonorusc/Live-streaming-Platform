import Flex from '@/components/ui/flex'
import { Twitch } from '@/components/ui/logos'
import { Skeleton } from '@/components/ui/skeleton'
import { SkeleletonWrapper } from './styles'

export default function LoadingNav() {
  return (
    <SkeleletonWrapper>
      <Flex
        $align="center"
        $justify="space-between"
        $width="100%"
        $height="5rem"
        $padding="1rem"
      >
        <Flex $align="center">
          <Twitch height="28px" width="28px" />
          <Skeleton $width="8rem" $margin="0 3rem" $height="0.5rem" />
          <Skeleton $width="8rem" $height="0.5rem" />
        </Flex>
        <Skeleton $width="3rem" $height="3rem" $radius="50%" />
      </Flex>
    </SkeleletonWrapper>
  )
}
