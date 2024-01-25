'use client'
import * as S from './styles'
import NoSsr from '@/components/NoSsr'
import Typrography from '@/components/ui/typography'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { useState } from 'react'
import ToolTip from '../tooltip'
import CustomScrollBar from '../custombar'

export type AsideProps = {
  $width?: string
  $height?: string
  $collapsedWidth?: string
  $collapsed?: boolean
  $title: string
  $reverse?: boolean
  children?: React.ReactNode
}

const Aside = ({
  $height,
  $width,
  $collapsedWidth,
  $collapsed,
  $title,
  $reverse,
  children
}: AsideProps) => {
  const [collapsed, setCollapsed] = useState($collapsed)
  return (
    <>
      <NoSsr>
        <S.Wrapper
          $collapsed={collapsed}
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
                        $fontWeight="semiBold"
                      >
                        <span>Expand</span>
                      </Typrography>
                    }
                  >
                    <>
                      {$reverse ? (
                        <ArrowLeftFromLine size={22} />
                      ) : (
                        <ArrowRightFromLine size={22} />
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
                        $fontWeight="semiBold"
                      >
                        <span>Collapse</span>
                      </Typrography>
                    }
                  >
                    <>
                      {$reverse ? (
                        <ArrowRightFromLine size={22} />
                      ) : (
                        <ArrowLeftFromLine size={22} />
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
