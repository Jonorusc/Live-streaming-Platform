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
    <Figure fillColor={fillColor}>
      <svg width={width} height={height} viewBox="0 0 24 28">
        <g fill-rule="evenodd">
          <path d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0 0 5v18h6v5l5-5h4l9-9V0H5zm17 13-4 4h-4l-4 4v-4H6V2h16v11z"></path>
          <path
            fill="#FFF"
            d="m18 17 4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"
          ></path>
        </g>
      </svg>
      {/* <svg
        overflow="visible"
        width={width}
        height={height}
        version="1.1"
        viewBox="0 0 40 40"
        x="0px"
        y="0px"
      >
        <g>
          <polygon points="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8">
            <animate
              dur="150ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
              to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            ></animate>
            <animate
              dur="250ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
              to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            ></animate>
            <animate
              dur="50ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
              from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            ></animate>
            <animate
              dur="75ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
              from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            ></animate>
          </polygon>
          <polygon
            points="26 25 30 21 30 10 14 10 14 25 18 25 18 29 22 25"
            fill="#FFF"
            className="Face"
          >
            <animateTransform
              dur="150ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
            <animateTransform
              dur="250ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="50ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="75ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
          </polygon>
          <g className="Eyes">
            <path d="M20,14 L22,14 L22,20 L20,20 L20,14 Z M27,14 L27,20 L25,20 L25,14 L27,14 Z">
              <animateTransform
                dur="150ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="0 0"
                to="3 -3"
              ></animateTransform>
              <animateTransform
                dur="250ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="3 -3"
                to="0 0"
              ></animateTransform>
              <animateTransform
                dur="50ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="3 -3"
                to="0 0"
              ></animateTransform>
              <animateTransform
                dur="75ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="0 0"
                to="3 -3"
              ></animateTransform>
            </path>
          </g>
        </g>
      </svg> */}
    </Figure>
  )
}
