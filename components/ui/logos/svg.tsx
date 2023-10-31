import { Figure } from './styles'

export type SVGProps = 'fail' | 'success' | 'warning'

export const SVGLogo = ({ type }: { type: SVGProps }) => {
  switch (type) {
    case 'fail': {
      return (
        <Figure $fillColor="#eb0400">
          <svg width="18" height="18" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm12 1V9H6v2h8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Figure>
      )
    }
    case 'success': {
      return (
        <Figure $fillColor="#00f593">
          <svg width="18" height="18" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3 5 1.5 1.5L9 14l-3.5-3.5L7 9l2 2 4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Figure>
      )
    }
    case 'warning': {
      return (
        <Figure $fillColor="#fba12e">
          <svg width="18" height="18" viewBox="0 0 20 20" x="0px" y="0px">
            <g>
              <path
                fillRule="evenodd"
                d="M10.954 3.543c-.422-.724-1.486-.724-1.908 0l-6.9 11.844c-.418.719.11 1.613.955 1.613h13.798c.844 0 1.373-.894.955-1.613l-6.9-11.844zM11 15H9v-2h2v2zm0-3H9V7h2v5z"
                clipRule="evenodd"
              ></path>
            </g>
          </svg>
        </Figure>
      )
    }
    default: {
      return null
    }
  }
}
