'use client'

import * as S from './styles'

import {
  useToast,
  type Toast as ToastHookProps,
  type TYPE as ToastTypes
} from '@/hooks/use-toast'

import { useRouter } from 'next/navigation'
import Flex from '@/components/ui/flex'
import Avatar from '@/components/ui/image'
import Icon from '@/components/ui/icon'
import { Responses } from '@/components/ui/logos/svg'
import NoSsr from '@/components/NoSsr'

export type ToastComponentProps = {
  toast: ToastHookProps
}

const Toast = ({ toast }: ToastComponentProps) => {
  const router = useRouter()
  const { pauseToast, resumeToast, removeToast } = useToast()

  const hasProfile = toast.data.profile !== undefined

  const handleClick = () => {
    if (hasProfile) {
      removeToast(toast.id)
      setTimeout(() => {
        // redirects to profile streaming page
        // removes the spaces from the channel name for example? John Doe -> JohnDoe
        const channel_name = toast.data.profile!.name.replace(/\s/g, '')
        router.push(`/${channel_name}`)
      }, 200)
    }
  }
  const iconType = (type: ToastTypes) => {
    switch (type) {
      case 'success': {
        return <Responses $type="success" $size={30} />
      }
      case 'error': {
        return <Responses $type="fail" $size={30} />
      }
      case 'warning': {
        return <Responses $type="warning" $size={30} />
      }
      case 'info': {
        return <Responses $type="info" $size={30} />
      }
      default:
        return null
    }
  }

  return (
    <NoSsr>
      {toast.type === 'islive' ? (
        <S.WrapperLive
          onMouseEnter={() => pauseToast(toast.id)}
          onMouseLeave={() => resumeToast(toast.id)}
          onClick={handleClick}
          initial={{
            x: toast.position.includes('right') ? '100%' : '-100%',
            opacity: 0
          }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{
            x: toast.position.includes('right') ? '100%' : '-100%',
            opacity: 0
          }}
        >
          <Flex $gapY="1rem" $align="center">
            <Avatar
              $size={30}
              $url={toast.data.profile!.picture}
              alt={toast.data.profile!.name}
              $rounded
            />
            <Flex $direction="column" $align="flex-start">
              <S.Title>{toast.data.title!}</S.Title>
              <S.Message>{toast.data.message}</S.Message>
            </Flex>
          </Flex>
        </S.WrapperLive>
      ) : (
        <S.Wrapper
          onMouseEnter={() => pauseToast(toast.id)}
          onMouseLeave={() => resumeToast(toast.id)}
          onClick={handleClick}
          initial={{
            x: toast.position.includes('right') ? '100%' : '-100%',
            opacity: 0
          }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{
            x: toast.position.includes('right') ? '100%' : '-100%',
            opacity: 0
          }}
        >
          <Flex
            $justify="space-between"
            $align="center"
            $padding="0.4rem 0.5rem"
            onClick={(e) => {
              e.stopPropagation()
              removeToast(toast.id)
            }}
          >
            {hasProfile && (
              <Avatar
                $size={24}
                $url={toast.data.profile!.picture}
                alt={toast.data.profile!.name}
              />
            )}
            {!hasProfile && iconType(toast.type)}
            <Icon name="x" size={24} />
          </Flex>
          <S.Body $type={toast.type}>
            {toast.data.title && (
              <h1>
                <Flex $align="center">
                  {hasProfile && iconType(toast.type)}
                  {toast.data.title}
                </Flex>
              </h1>
            )}
            {toast.data.message}
          </S.Body>
        </S.Wrapper>
      )}
    </NoSsr>
  )
}

export default Toast
