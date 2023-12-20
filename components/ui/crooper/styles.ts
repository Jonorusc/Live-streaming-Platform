import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $width?: string; $height?: string }>`
  ${({ $height, $width }) => css`
    width: ${$width || '100%'};
    height: ${$height || '100%'};
    position: absolute;
    inset: 0;
  `}
`

export const CrooperWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    bottom: 0.8rem;
    background-color: rgba(0, 0, 0, 0.5);
    .reactEasyCrop_CropArea {
      color: ${theme.name === 'dark'
        ? 'rgba(24, 24, 27, 0.6)'
        : 'rgba(255, 255, 255, 0.5)'};
      border: none;
    }
  `}
`
