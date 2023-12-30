'use client'
import * as S from './styles'

import NoSsr from '@/components/NoSsr'
import { ModalWrapper } from '@/components/modals'

import Icon from '@/components/ui/icon'
import Button from '@/components/ui/button'
import Grid from '@/components/ui/grid'
import Flex from '@/components/ui/flex'

import { useModal } from '@/hooks/use-modal'
import ReactLoading from 'react-loading'
import useKeyboardEvent from '@/hooks/use-keyboard'
import { useToast } from '@/hooks/use-toast'
import { useState, useTransition } from 'react'
import { mutate } from 'swr'

import DefaultView from './default'
import EditProfilePicture from './edit'
import { updateUserProfile } from '@/actions/user'
import { uploadFilesToStorage } from '@/lib/firebase/storage'

export type Views = 'edit' | 'default'

const ProfileImageModal = () => {
  const { onClose, data } = useModal()
  const [view, setView] = useState<Views>('default')
  const [file, setFile] = useState<File | null>(null)
  const [fileList, setFileList] = useState<FileList | null>(null)
  const { addToast } = useToast()
  const [isPending, startTransition] = useTransition()

  const views = {
    edit: <EditProfilePicture setFileList={setFileList} file={file} />,
    default: <DefaultView setView={setView} setFile={setFile} />
  }

  const ViewComponent = views[view] as JSX.Element

  useKeyboardEvent('Escape', onClose)

  const handleSaveProfilePicture = () => {
    startTransition(async () => {
      try {
        const path = await uploadFilesToStorage({
          fileList: fileList as FileList,
          collectionName: data.username,
          document: 'avatar'
        })

        // update user data
        await updateUserProfile({
          username: data!.username,
          key: 'avatar',
          value: path[0]
        })
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'success',
          position: 'top-right',
          data: {
            message: 'Profile picture updated successfully.'
          }
        })

        mutate('/api/user')
      } catch {
        addToast({
          id: Date.now(),
          timeout: 5000,
          type: 'error',
          position: 'top-right',
          data: {
            message:
              'Something went wrong while updating your profile picture. Please try again later.'
          }
        })
      } finally {
        onClose()
      }
    })
  }

  return (
    <>
      <NoSsr>
        <ModalWrapper>
          <S.ModalProfilePicture>
            <Flex
              $direction="column"
              $width="50rem"
              $padding="2rem 2rem 1rem 2rem"
            >
              <Flex $align="center" $justify="space-between">
                <h4>Update Profile Picture</h4>
                <Button $hoverColor="surface" onClick={onClose}>
                  <Grid $placeItems="center">
                    <Icon name="x" size={24} />
                  </Grid>
                </Button>
              </Flex>
              {ViewComponent}
              <Flex
                $align="center"
                $alingSelf="end"
                $gapY="1rem"
                $justify="flex-end"
                $margin="1rem 0 0 0"
              >
                <Button
                  $color="triadic2"
                  $bgcolor="darkGrey"
                  $fontSize="small"
                  $width="max-content"
                  $fontWeight="bold"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                {view === 'edit' && fileList && (
                  <Button
                    $color="triadic2"
                    $bgcolor="primary"
                    $fontSize="small"
                    $width="max-content"
                    $fontWeight="bold"
                    disabled={isPending}
                    onClick={handleSaveProfilePicture}
                  >
                    {isPending ? (
                      <Flex $align="center" $justify="center" $gapY="0.3rem">
                        <ReactLoading
                          type="spin"
                          color="#B4BDc7"
                          height={16}
                          width={16}
                        />
                        <span>Saving...</span>
                      </Flex>
                    ) : (
                      'Save Profile Picture'
                    )}
                  </Button>
                )}
              </Flex>
            </Flex>
          </S.ModalProfilePicture>
        </ModalWrapper>
      </NoSsr>
    </>
  )
}

export default ProfileImageModal
