'use client'

import styled, { css } from 'styled-components'
import { Wrapper as TextField } from '@/components/ui/text/styles'
import { Wrapper as Button } from '@/components/ui/button/styles'

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    position: relative;
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    z-index: ${theme.layers.overlay};
    background-color: ${
      theme.name === 'light' ? theme.palette.white : theme.palette.dark
    };
    border-bottom: 0.2rem solid ${
      theme.name === 'light' ? 'rgba(0,0,0,.13)' : theme.palette.black
    };
    box-shadow: 0px 1px 2px rgba(0,0,0,.13), 0px 0px 2px rgba(0,0,0,.08)
    align-items: stretch;
    flex-wrap: nowrap;
    height: 5rem;
    flex-shrink: 0;
    justify-content: space-between;
    
    a {
      cursor: pointer;
      h5 {
        margin: 0 1.5rem;
        font-weight: ${theme.font.semiBold};
        color: ${theme.palette.text.base}!important;
        font-size: ${theme.font.size.small};
        &:hover {
          color: ${theme.palette.primary}!important;
        }

        @media (max-width: 600px) {
          margin: 0 0.6rem;
          font-size: 1.2rem
        }
      }
      &:hover {
        text-decoration: none;
      }
    }

    ${Button} {
      width: max-content;
    }

    @media (max-width: 600px) {
      justify-content: flex-end;

      /* first child */
      & > :first-child {
        margin-right: auto;
      }

      ${Button} {
        width: max-content;
        padding: 0.3rem;
        font-size: 1.2rem;
      }
    }
  `};
`

export const SearchBox = styled.div<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    z-index: ${theme.layers.overlay};
    box-shadow:
      ${theme.shadow.box.small} rgba(0, 0, 0, 0.45),
      0px 0px 4px rgba(0, 0, 0, 0.45);
    border-radius: 0.6rem;
    background-color: inherit;
    padding: 0.6rem 0.5rem 0.5rem 0.5rem;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% 0;

    ${!$active &&
    css`
      padding: 0;
      top: unset;
      box-shadow: unset;

      @media (max-width: 600px) {
        position: static;
        translate: unset;
        left: unset;
      }
    `};
  `};
`

export const Search = styled.div<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    width: 39rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    column-gap: 0;

    div {
      height: 100%;
    }

    ${TextField} {
      margin-bottom: 0;

      div {
        input {
          height: 100% !important;
          border-radius: 0.6rem 0 0 0.6rem;
          font-weight: ${theme.font.semiBold} !important;
          font-size: calc(${theme.font.size.xsmall} + 0.1rem) !important;
        }
      }
    }

    button {
      height: calc(100% - 0.2rem);
      outline: none;
      border: none;
      background-color: ${theme.name === 'light'
        ? theme.palette.surface
        : theme.palette.darkGrey};
      padding: 0.6rem;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      color: ${theme.palette.text.base};
      display: grid;
      place-items: center;
      margin-left: -0.1rem;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }

    @media (max-width: 768px) {
      width: 35vw;
    }
    @media (max-width: 600px) {
      width: fit-content;
      ${!$active &&
      css`
        ${TextField} {
          display: none;
        }
        button {
          background-color: transparent;
          border-radius: unset;
        }
      `}
    }
  `};
`

export const Streaming = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.size.xsmall};
    font-weight: ${theme.font.semiBold};
    color: ${theme.palette.white};
    width: 3.8rem;
    padding: 0.3rem 0.6rem;
    background-color: ${theme.palette.red};
    text-align: center;
    border-radius: 0.4rem;
    text-transform: uppercase;
  `};
`

export const Results = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    a {
      svg {
        stroke: ${theme.palette.text.base};
      }
    }
  `};
`

export const Avatar = styled.div`
  ${({ theme }) => css`
    width: 3rem;
    height: 3rem;
    /* clip-path: circle(50%); */
    border-radius: 50%;
    background-color: ${theme.palette.triadic1};
    display: grid;
    place-items: center;
    svg {
      stroke: ${theme.palette.text.base};
    }

    &:focus,
    &:active {
      outline: solid 0.1rem ${theme.palette.primary};
      outline-offset: -0.1rem;
      border-color: ${theme.palette.primary};
      box-shadow:
        0 0 0 0.2rem ${theme.palette.primary},
        inset 0 0 0 0.2rem ${theme.palette.primary};
    }
  `};
`

export const DropDown = styled.div`
  ${() => css`
    display: grid;
    position: relative;
    place-items: center;
    cursor: pointer;
  `};
`

export const DropDownBody = styled.div`
  ${({ theme }) => css`
    cursor: default;
    position: absolute;
    top: calc(100% + 0.5rem);
    color: ${theme.palette.text.base};

    right: 0;
    box-shadow:
      ${theme.shadow.box.small} rgba(0, 0, 0, 0.45),
      0px 0px 4px rgba(0, 0, 0, 0.45);
    border-radius: 0.6rem;
    width: 13dvw;
    min-width: 20.4rem;
    background-color: ${theme.name === 'light'
      ? theme.palette.white
      : theme.palette.dark};
    padding: calc(${theme.spacing.small} + 0.2rem);
  `};
`

export const DropDownItem = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    svg {
      stroke: ${theme.palette.text.base};
    }
    &:hover {
      background-color: ${theme.palette.surface};
      border-radius: 0.5rem;
    }
  `};
`
