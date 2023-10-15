'use client'

import { Open_Sans } from 'next/font/google'
import { useLocalStorage } from 'usehooks-ts'
import { ThemeProvider } from 'styled-components'
import NextProgress from 'next-progress'

import StyledComponentsRegistry from '@/lib/registry'

import { defaultTheme } from '@/styles/themes/default-theme'
import GlobalStyles from '@/styles/themes/global-styles'

import { ModalProvider } from '@/components/providers/modal-provider'

const font = Open_Sans({ subsets: ['latin'] })
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [theme] = useLocalStorage('theme', defaultTheme)
  const [progressColor] = useLocalStorage(
    'progressColor',
    defaultTheme.palette.primary
  )

  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <NextProgress
            color={progressColor}
            delay={300}
            height={3}
            options={{ showSpinner: false }}
          />
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
