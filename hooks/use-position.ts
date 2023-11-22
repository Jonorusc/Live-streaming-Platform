import { useState, MouseEvent, useCallback } from 'react'

interface Position {
  x: number
  y: number
}

const useMenuPosition = (
  callback?: () => void
): [Position, (event: MouseEvent<HTMLElement>) => void] => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      const target = event.target as HTMLElement
      const clickX = event.clientX
      const clickY = event.clientY
      const screenW = window.innerWidth
      const screenH = window.innerHeight
      const menuW = target.getBoundingClientRect().width
      const menuH = target.getBoundingClientRect().height
      const parentRect = target.parentElement?.getBoundingClientRect()

      let offsetX = clickX
      let offsetY = clickY

      if (parentRect) {
        if (clickX + menuW >= screenW) {
          offsetX = parentRect.left - menuW / 2
        }

        if (clickY + menuH >= screenH) {
          offsetY = parentRect.top - menuH / 2
        }
      }

      setPosition({
        x: offsetX,
        y: offsetY
      })

      if (callback) {
        callback()
      }
    },
    [callback]
  )

  return [position, handleClick]
}

export default useMenuPosition
