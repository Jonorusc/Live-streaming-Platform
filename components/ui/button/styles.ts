import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'

import { ButtonProps } from '@/components/ui/button'

import type { COLORS } from '@/components/ui/types'

type WrapperProps = Omit<ButtonProps, 'children'>

export const Wrapper = styled.button<WrapperProps>`
  ${({
    theme,
    $bgcolor,
    $hoverColor,
    $color,
    $fontSize,
    $fontWeight,
    $width,
    $padding,
    $position,
    $top,
    $left,
    $bottom,
    $right,
    $error,
    disabled,
    $border,
    $borderColor,
    $borderSize
  }) => css`
    ${$border && !$error
      ? css`
          ${!!$borderColor
            ? css`
                border: ${`${$borderSize}px`} solid
                  ${theme.palette[$borderColor as COLORS]};
              `
            : css`
                border: ${`${$borderSize}px`} solid ${theme.palette.primary};
              `};
        `
      : css`
          border: none;
        `};

    border-radius: 0.4rem;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    ${!!$bgcolor &&
    css`
      background-color: ${lighten(0.1, theme.palette[$bgcolor as COLORS])};
    `};
    ${!!$color &&
    css`
      color: ${theme.palette[$color]};
    `};
    ${!!$fontSize &&
    css`
      font-size: calc(${theme.font.size[$fontSize]} - 0.2rem);
    `};
    ${!!$fontWeight &&
    css`
      font-weight: ${theme.font[$fontWeight]};
    `};
    ${!!$padding &&
    css`
      padding: ${theme.spacing[$padding]};
    `};

    width: ${$width || 'auto'};

    ${!!$position &&
    css`
      position: ${$position};

      ${!!$top &&
      css`
        top: ${$top};
      `};

      ${!!$left &&
      css`
        left: ${$left};
      `};

      ${!!$bottom &&
      css`
        bottom: ${$bottom};
      `};

      ${!!$right &&
      css`
        right: ${$right};
      `};
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      background-color: #adadb838;
      color: #848494;
    `};

    &:hover {
      ${$error &&
      css`
        background-color: ${lighten(0.2, theme.palette.error)};
      `}

      ${!disabled &&
      !$error &&
      css`
        ${!!$hoverColor
          ? css`
              background-color: ${darken(
                0.1,
                theme.palette[$hoverColor as COLORS]
              )};
            `
          : css`
              background-color: ${darken(
                0.1,
                theme.palette[$bgcolor as COLORS]
              )};
            `}
      `}
    }

    &:focus,
    &:active {
      outline: solid 0.2rem
        ${$error ? theme.palette.error : theme.palette[$bgcolor as COLORS]};
      outline-offset: -0.1rem;
      border-color: ${$error
        ? theme.palette.error
        : theme.palette[$bgcolor as COLORS]};
      box-shadow:
        0 0 0 0.2rem
          ${$error ? theme.palette.error : theme.palette[$bgcolor as COLORS]},
        inset 0 0 0 0.2rem
          ${$error ? theme.palette.error : theme.palette[$bgcolor as COLORS]};
    }

    ${$error &&
    css`
        background-color: ${lighten(0.1, theme.palette.error)};
        outline: solid 0.2rem ${darken(0.1, theme.palette.error)};
      outline-offset: -0.1rem;
      border-color: ${darken(0.1, theme.palette.error)}
      box-shadow:
        0 0 0 0.2rem ${darken(0.1, theme.palette.error)},
        inset 0 0 0 0.2rem ${darken(0.1, theme.palette.error)};
      `};
  `};
`
