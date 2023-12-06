'use client'

import NoSsr from '@/components/NoSsr'
import * as S from './styles'

import { useState, useCallback, SetStateAction, Dispatch } from 'react'
import Cropper from 'react-easy-crop'
import { Point, Area } from 'react-easy-crop/types'

export type CrooperProps = {
  imgSrc: string
  $width?: string
  $height?: string
  onCrop: (croppedArea: Area, croppedAreaPixels: Area) => void
  onCancel?: () => void
  shape?: 'rect' | 'round'
  aspectRatio?: number
  grid?: boolean
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
  rotate: number
}

const Crooper = ({
  imgSrc,
  aspectRatio = 1 / 1,
  shape = 'round',
  onCrop,
  $width,
  $height,
  grid = false,
  zoom,
  setZoom,
  rotate
}: CrooperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      onCrop(croppedArea, croppedAreaPixels)
    },
    []
  )

  return (
    <NoSsr>
      <S.Wrapper $height={$height} $width={$width}>
        <S.CrooperWrapper>
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            cropShape={shape}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={grid}
            rotation={rotate}
          />
        </S.CrooperWrapper>
      </S.Wrapper>
    </NoSsr>
  )
}

export default Crooper
