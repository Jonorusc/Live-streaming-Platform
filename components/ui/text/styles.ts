import styled, { DefaultTheme, css } from 'styled-components'
import { lighten } from 'polished'
import { COLORS } from '@/components/ui/types'

const backgroundModifier = (theme: DefaultTheme) => {
  switch (theme.name) {
    case 'dark': {
      return css`
        background: url('/svg/x-button-dark.svg') no-repeat center center;
      `
    }
    case 'light': {
      return css`
        background: url('/svg/x-button-light.svg') no-repeat center center;
      `
    }
    default: {
      return css`
        background: url('/svg/x-button-light.svg') no-repeat center center;
      `
    }
  }
}

export const Wrapper = styled.div<{ $error?: boolean; $bgColor?: COLORS }>`
  ${({ theme, $error, $bgColor }) => css`
    color: ${theme.palette.text.base};
    background-color: ${
      $bgColor ? theme.palette[$bgColor] : theme.palette.background
    };
    vertical-align: baseline;
    width: 100%;
    margin-bottom: ${theme.spacing.large};

    /* takes the div which have aria-label="input" */
    & > div[aria-label='action-button'] {
      position: relative;

      .icons {
        height: 80%;
        background-color: ${
          theme.name === 'light'
            ? theme.palette.lightGrey
            : theme.palette.background
        };
        padding: 0 0.5rem;
        position: absolute;
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        top: 50%;
        right: 0.3rem;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        z-index: ${theme.layers.menu};

        svg {
          stroke: ${theme.palette.text.base};
        }
      }
    }
    
    input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none; 
      height: 2rem;
      width: 2rem;
      ${backgroundModifier(theme)}
    }


    & > div {
      width: 100%;
      & > input, textarea {
      transform: translateZ(0);
      background-color: transparent;
      color: ${theme.palette.text.base};
      font-family: inherit;
      font-size: calc(${theme.font.size.small} - 0.2rem);
      appearance: none;
      font-size: ${theme.font.size.small};
      font-weight: 400;
      height: 3rem;
      outline: none;
      resize: none;
      margin: 0;
      width: inherit;
      padding: 0.5rem 1rem;
      box-shadow: inset 0 0 0 1px
        ${$error ? theme.palette.error : theme.palette.grey};
      border-radius: 0.5rem;
      line-height: 1.5;
      border: solid 0.1rem transparent;
      transition: border 100ms ease-in;

      &:focus {
        outline: solid 0.2rem ${
          $error ? theme.palette.error : theme.palette.primary
        };
        outline-offset: -0.1rem;
        border-color: ${$error ? theme.palette.error : theme.palette.primary};
        box-shadow:
          0 0 0 0.2rem ${$error ? theme.palette.error : theme.palette.primary};,
          inset 0 0 0 0.2rem ${
            $error ? theme.palette.error : theme.palette.primary
          };
      }

      &:disabled {
        background-color: ${theme.palette.surface};
        color: ${theme.palette.grey};
        cursor: not-allowed;
      }

      &::placeholder {
        color: ${theme.palette.grey};
        font-family: inherit;
      }

      &:not(:focus):hover {
        border-color: ${lighten(
          0.1,
          $error ? theme.palette.error : theme.palette.grey
        )};
      }
    }

    textarea {
      height: 6rem;

    }
  }`}
`

export const Top = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    vertical-align: baseline;
    font-family: ${theme.font.family};
    padding-bottom: calc(${theme.spacing.small} - 0.5rem);
    height: 2.8rem;

    label {
      font-size: calc(${theme.font.size.small} - 0.2rem);
      flex-grow: 1;
      font-weight: ${theme.font.bold};
      color: ${theme.palette.text.label};
      text-transform: capitalize;
      text-align: left;
    }
  `}
`

export const Span = styled.span<{ color?: string }>`
  ${({ theme, color }) => css`
    color: ${color || theme.palette.text.label};
    font-size: calc(${theme.font.size.small} - 0.2rem);
    font-weight: ${theme.font.bold};
    text-transform: capitalize;
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.palette.error};
    font-size: calc(${theme.font.size.small} - 0.4rem);
    font-weight: ${theme.font.bold};
    margin-top: 0.5rem;
    line-height: 1.2;
    white-space: pre-wrap;
    text-align: justify;
    transform: translateZ(0);

    &::before {
      content: '⚠ ';
    }

    &::first-letter {
      text-transform: uppercase;
    }

    & > span {
      color: ${theme.palette.text.label};
      font-size: calc(${theme.font.size.small} - 0.2rem);
      font-weight: ${theme.font.bold};
      text-transform: capitalize;
    }
  `}
`
