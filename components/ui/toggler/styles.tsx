import styled, { css } from 'styled-components'

export const Wrapper = styled.button<{ $isTrue: boolean }>`
  ${({ theme, $isTrue }) => css`
    position: relative;
    outline: none;
    border: 0.1rem solid
      ${!$isTrue ? theme.palette.text.base : theme.palette.primary};
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: ${!$isTrue ? 'flex-start' : 'flex-end'};
    border-radius: 2.5rem;
    padding: 0 0.1rem;
    cursor: pointer;
    overflow: hidden;
    width: 4rem;
    height: 2rem;

    /* indicator */
    &::after {
      content: '';
      position: absolute;
      display: 'block';
      scale: ${!$isTrue ? '0' : '1'};
      left: 0.5rem;
      width: 0.3rem;
      height: 0.8rem;
      border: solid ${theme.palette.primary};
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
      transition: scale 0.2s ease-in-out;
    }

    input {
      &[type='checkbox'] {
        cursor: pointer;
        appearance: none;
        position: relative;
        width: 1.4rem;
        height: 1.4rem;
        background-color: ${!$isTrue
          ? theme.palette.text.base
          : theme.palette.primary};
        border-radius: 50%;
      }
    }
  `};
`
