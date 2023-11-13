'use client'

import { Inter } from 'next/font/google'
import { useLocalStorage } from 'usehooks-ts'
import { ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from '@/lib/styled_components/registry'

import { defaultTheme } from '@/styles/themes/default-theme'
import GlobalStyles from '@/styles/themes/global-styles'

import { ModalProvider } from '@/components/providers/modal-provider'
import { ToastProvider } from '@/components/providers/toast-provider'

const font = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [theme] = useLocalStorage('theme', defaultTheme)

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <GlobalStyles />
            <ModalProvider />
            <ToastProvider />
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
