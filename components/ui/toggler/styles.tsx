import styled, { css } from 'styled-components'

export const Wrapper = styled.button<{ $isTrue: boolean }>`
  ${({ theme, $isTrue }) => css`
    position: relative;
    outline: none;
    border: 0.1rem solid
      ${!$isTrue ? theme.palette.text.base : theme.palette.primary};
    background-color: ${!$isTrue ? 'transparent' : theme.palette.black};
    display: flex;
    align-items: center;
    /* justify-content: ${!$isTrue ? 'flex-start' : 'flex-end'}; */
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
      display: ${!$isTrue ? 'none' : 'block'};
      left: 0.5rem;
      width: 0.3rem;
      height: 0.8rem;
      border: solid ${theme.palette.primary};
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
    }

    input {
      &[type='checkbox'] {
        cursor: pointer;
        width: 1rem;
        height: 1rem;
        appearance: none;
        position: relative;
        transform: translate(${!$isTrue ? '0' : '135%'}, 0);
        transition: transform 0.1s ease-in-out;
        transition-delay: 0.2s;
        width: 1.5rem;
        height: 1.5rem;
        background-color: ${!$isTrue
          ? theme.palette.text.base
          : theme.palette.primary};
        border-radius: 50%;
      }
    }
  `};
`
