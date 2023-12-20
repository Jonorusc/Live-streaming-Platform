'use client'

import * as S from './styles'

import type { Views } from '.'

import { useRef, Dispatch, SetStateAction } from 'react'

import NoSsr from '@/components/NoSsr'
import { ArrowUpFromLine, Pencil } from 'lucide-react'
import Flex from '@/components/ui/flex'
import { useToast } from '@/hooks/use-toast'

const DefaultView = ({
  setView,
  setFile
}: {
  setView: Dispatch<SetStateAction<Views>>
  setFile: Dispatch<SetStateAction<File | null>>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // size hieher than 10mb
    const size = 10 * 1024 * 1024
    if (!file || file.size > size) {
      addToast({
        id: Date.now(),
        timeout: 5000,
        type: 'error',
        position: 'top-right',
        data: {
          message: 'File size is too large'
        }
      })
      return
    }
    setFile(file)
    setView('edit')
  }

  return (
    <NoSsr>
      <S.DefaultWrapper>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleOnChange}
        />
        <S.Button onClick={handleUploadClick}>
          <Flex
            $direction="column"
            $align="center"
            $justify="center"
            $padding="5rem"
            $gapX="0.6rem"
          >
            <ArrowUpFromLine />
            <span>Upload Photo</span>
          </Flex>
        </S.Button>
        <S.Button
          onClick={() => {
            setFile(null)
            setView('edit')
          }}
        >
          <Flex
            $direction="column"
            $align="center"
            $justify="center"
            $padding="5rem"
            $gapX="0.6rem"
          >
            <Pencil />
            <span>Edit Current Thumbnail</span>
          </Flex>
        </S.Button>
      </S.DefaultWrapper>
    </NoSsr>
  )
}

export default DefaultView
