'use client'

import NoSsr from '@/components/NoSsr'
import * as S from './styles'

import {
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
  useEffect
} from 'react'
import Cropper from 'react-easy-crop'
import { Point, Area } from 'react-easy-crop/types'

export type CrooperProps = {
  imgSrc: string
  $width?: string
  $height?: string
  onCrop: ({
    Blob,
    croppedArea,
    croppedAreaPixels
  }: {
    croppedArea: Area
    croppedAreaPixels: Area
    Blob: Blob
  }) => void
  onCancel?: () => void
  shape?: 'rect' | 'round'
  aspectRatio?: number
  grid?: boolean
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
  rotate?: number
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
      if (imgSrc) {
        const img = new Image()
        img.src = imgSrc
        img.onload = () =>
          createCroppedImage(img, croppedArea, croppedAreaPixels)
        img.onerror = () => {
          console.error('Error loading image')
        }
      }
    },
    [imgSrc, rotate]
  )

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180
  }

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation)

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
    }
  }

  const createCroppedImage = async (
    img: HTMLImageElement,
    croppedArea: Area,
    croppedAreaPixels: Area
  ) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Could not create canvas context')
      }

      const $rotate = rotate || 0
      const rotRad = getRadianAngle($rotate)

      const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        img.width,
        img.height,
        $rotate
      )

      canvas.width = bBoxWidth
      canvas.height = bBoxHeight

      ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
      ctx.rotate(rotRad)
      ctx.translate(-img.width / 2, -img.height / 2)

      ctx.drawImage(img, 0, 0)

      const data = ctx.getImageData(
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height

      ctx.putImageData(data, 0, 0)

      canvas.toBlob((blob) => {
        if (!blob) return
        onCrop({ croppedArea, croppedAreaPixels, Blob: blob as Blob })
      })
    } catch (error) {
      console.error(
        `%c Error creating cropped image blob: ${error}`,
        'color: red; padding: 0.5rem; font-size: 0.8rem;'
      )
    }
  }

  return (
    <>
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
              rotation={rotate || 0}
            />
          </S.CrooperWrapper>
        </S.Wrapper>
      </NoSsr>
    </>
  )
}

export default Crooper
