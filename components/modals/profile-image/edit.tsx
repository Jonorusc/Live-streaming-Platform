'use client'

import * as S from './styles'

import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Area } from 'react-easy-crop/types'
import { RotateCw } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'

import Crooper from '@/components/ui/crooper'
import NoSsr from '@/components/NoSsr'
import Slider from '@/components/ui/slider'
import Flex from '@/components/ui/flex'
import Grid from '@/components/ui/grid'
import { toDataUrl } from '@/lib/utils/image'

const EditProfilePicture = ({
  file,
  setFileList
}: {
  file: File | null
  setFileList: Dispatch<SetStateAction<FileList | null>>
}) => {
  const [zoom, setZoom] = useState<number>(1)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [rotate, setRotate] = useState<number>(0)
  const { data } = useModal()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImgSrc(reader.result as string)
      }
      reader.onerror = () => {
        console.error('Error reading file')
      }
      return
    }
    if (data?.profile?.avatar) {
      toDataUrl(data?.profile?.avatar, (data) => {
        setImgSrc(data)
      })
    }
  }, [file])

  if (!data) {
    return null
  }

  return (
    <NoSsr>
      <S.EditWrapper>
        <Crooper
          setZoom={setZoom}
          zoom={zoom}
          imgSrc={imgSrc || ''}
          onCrop={({ Blob }) => {
            const file = new File([Blob], `${data.username}-avatar.png`, {
              type: 'image/png'
            })

            const list = new DataTransfer()
            list.items.add(file)
            setFileList(list.files)
          }}
          rotate={rotate}
        />
      </S.EditWrapper>
      <Flex $align="center" $justify="space-between" $padding="1rem">
        <motion.div animate={{ rotate: rotate }} transition={{ duration: 0.5 }}>
          <Grid>
            <RotateCw
              size={16}
              style={{ cursor: 'pointer', rotate: `${rotate}deg` }}
              onClick={() => {
                setRotate((prevRotate) => prevRotate + 90)
              }}
            />
          </Grid>
        </motion.div>
        <Slider
          $value={zoom}
          onChange={(value) => {
            setZoom(value)
          }}
          min={1}
          max={3}
          step={0.1}
          showIcons
          name="edit-profile-picture-zoom"
        />
      </Flex>
    </NoSsr>
  )
}

export default EditProfilePicture
