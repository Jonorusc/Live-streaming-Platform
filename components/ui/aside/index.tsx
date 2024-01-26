'use client'
import * as S from './styles'
import NoSsr from '@/components/NoSsr'
import Typrography from '@/components/ui/typography'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import ToolTip from '../tooltip'
import CustomScrollBar from '../custombar'
import { useLocalStorage } from 'usehooks-ts'

export type AsideProps = {
  $width?: string
  $height?: string
  $collapsedWidth?: string
  $collapsed?: boolean
  $title: string
  $reverse?: boolean
  children?: React.ReactNode
  onChange?: (collapsed: boolean) => void
}

const Aside = ({
  $height,
  $width,
  $collapsedWidth,
  $collapsed,
  $title,
  $reverse,
  onChange,
  children
}: AsideProps) => {
  const [collapsed, setCollapsed] = useLocalStorage('aside-collapsed', false)

  useEffect(() => {
    if (onChange) {
      onChange(collapsed || false)
    }
  }, [collapsed])

  return (
    <>
      <NoSsr>
        <S.Wrapper
          $collapsed={collapsed || $collapsed}
          $height={$height}
          $width={$width}
          $collapsedWidth={$collapsedWidth}
        >
          <CustomScrollBar>
            <S.Header $reverse={$reverse}>
              {!collapsed && (
                <Typrography
                  $color="triadic2"
                  $fontSize="xsmall"
                  $fontWeight="semiBold"
                >
                  <h4>{$title}</h4>
                </Typrography>
              )}
              {collapsed ? (
                <button
                  onClick={() => {
                    setCollapsed(false)
                  }}
                >
                  <ToolTip
                    $arrow
                    $position={$reverse ? 'left' : 'right'}
                    $content={
                      <Typrography
                        $color="background"
                        $fontSize="xsmall"
                        $fontWeight="bold"
                      >
                        <span>Expand</span>
                      </Typrography>
                    }
                  >
                    <>
                      {$reverse ? (
                        <ArrowLeftFromLine size={20} />
                      ) : (
                        <ArrowRightFromLine size={20} />
                      )}
                    </>
                  </ToolTip>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCollapsed(true)
                  }}
                >
                  <ToolTip
                    $arrow
                    $position={$reverse ? 'left' : 'right'}
                    $content={
                      <Typrography
                        $color="background"
                        $fontSize="xsmall"
                        $fontWeight="bold"
                      >
                        <span>Collapse</span>
                      </Typrography>
                    }
                  >
                    <>
                      {$reverse ? (
                        <ArrowRightFromLine size={20} />
                      ) : (
                        <ArrowLeftFromLine size={20} />
                      )}
                    </>
                  </ToolTip>
                </button>
              )}
            </S.Header>
            <>{children}</>
          </CustomScrollBar>
        </S.Wrapper>
      </NoSsr>
    </>
  )
}

export default Aside
