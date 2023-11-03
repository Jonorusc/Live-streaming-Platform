import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

interface NoSsrProps {
  children: ReactNode
}

const NoSsr = ({ children }: NoSsrProps) => <>{children}</>

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false })
