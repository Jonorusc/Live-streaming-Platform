'use client'

import * as S from './styles'

import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'
import Grid from '@/components/ui/grid'
import Button from '@/components/ui/button'
import Icon from '@/components/ui/icon'

import { useModal } from '@/hooks/use-modal'
import { ModalWrapper } from '..'

import useKeyboardEvent from '@/hooks/use-keyboard'
import useClickOutside from '@/hooks/use-clickoutside'
import { useRef } from 'react'

const DialogModal = () => {
  const { onClose, data } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)
  const { title, message, onAccept, onDeny, acceptText, denyText } = data

  useKeyboardEvent('Escape', onClose)
  useClickOutside(modalRef, onClose)

  return (
    <>
      <NoSsr>
        <ModalWrapper>
          <S.ModalDialog ref={modalRef}>
            <Flex
              $direction="column"
              $width="50rem"
              $padding="2rem 2rem 1rem 2rem"
            >
              <Flex $align="center" $justify="space-between">
                <h4>{title}</h4>
                <Button $hoverColor="surface" onClick={onClose}>
                  <Grid $placeItems="center">
                    <Icon name="x" size={24} />
                  </Grid>
                </Button>
              </Flex>
              <Flex
                $direction="column"
                $gapY="1rem"
                $align="flex-start"
                $margin="1rem 0 0 0"
              >
                <p>{message}</p>
              </Flex>
              <Flex
                $gapY="1rem"
                $align="center"
                $justify="flex-end"
                $margin="1.5rem 0 0 0"
              >
                {onDeny && (
                  <Button
                    $color="triadic2"
                    $fontSize="small"
                    onClick={() => {
                      onDeny()
                      onClose()
                    }}
                  >
                    {denyText ? denyText : 'Cancel'}
                  </Button>
                )}
                {onAccept && (
                  <Button
                    $bgcolor="primary"
                    $hoverColor="primary"
                    $color="background"
                    $fontSize="small"
                    onClick={() => {
                      onClose()
                      onAccept()
                    }}
                  >
                    {acceptText ? acceptText : 'Ok'}
                  </Button>
                )}
              </Flex>
            </Flex>
          </S.ModalDialog>
        </ModalWrapper>
      </NoSsr>
    </>
  )
}

export default DialogModal
