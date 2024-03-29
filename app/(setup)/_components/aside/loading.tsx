'use client'
import Flex from '@/components/ui/flex'
import { Skeleton } from '@/components/ui/skeleton'
import { SkeleletonWrapper } from './styles'
import { useReadLocalStorage } from 'usehooks-ts'

export default function LoadingAside() {
  const collapsed = useReadLocalStorage<boolean>('aside-collapsed') || false
  return (
    <SkeleletonWrapper>
      <Flex
        $height="100dvh"
        $background="surface"
        $width={collapsed ? '5rem' : '22rem'}
        $align="flex-start"
        $direction="column"
        $padding="1rem"
        $gapX="3rem"
      >
        <Flex
          $align="center"
          $justify="space-between"
          $width="100%"
          $margin="2rem 0"
        >
          <Skeleton $width="10rem" $height="0.5rem" />
          <Skeleton $width="3rem" $height="1rem" />
        </Flex>
        <Flex
          $align="center"
          $direction="column"
          $width="100%"
          $margin="2rem 0"
          $gapX="1rem"
        >
          <Skeleton $width="100%" $height="1.5rem" />
          <Skeleton $width="100%" $height="1.5rem" />
          <Skeleton $width="100%" $height="1.5rem" />
        </Flex>
      </Flex>
    </SkeleletonWrapper>
  )
}
