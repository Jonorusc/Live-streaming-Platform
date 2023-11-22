import NoSsr from '@/components/NoSsr'
import { Figure } from './styles'

export const Twitch = ({
  fillColor,
  width = '50',
  height = '50'
}: {
  fillColor?: string
  width?: string
  height?: string
}) => {
  return (
    <NoSsr>
      <Figure $fillColor={fillColor}>
        <svg width={width} height={height} viewBox="0 0 24 28">
          <g fillRule="evenodd">
            <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0 0 5v18h6v5l5-5h4l9-9V0H5zm17 13-4 4h-4l-4 4v-4H6V2h16v11z"></path>
            <path
              fill="#FFF"
              d="m18 17 4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"
            ></path>
          </g>
        </svg>
      </Figure>
    </NoSsr>
  )
}
