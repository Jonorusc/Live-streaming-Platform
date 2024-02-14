'use client'

import { useState, useEffect } from 'react'

export const onResize = (callback: (width: number) => void) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => callback(window.innerWidth))
  }
}
export const getScreenWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth
  }
  return 0
}

export const useWidth = () => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    onResize(setWidth)
    setWidth(getScreenWidth())
  }, [])
  return width
}
