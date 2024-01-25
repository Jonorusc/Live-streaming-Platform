'use client'
import { Figure, Svg } from './styles'
import NoSsr from '@/components/NoSsr'

import { useEffect, useRef } from 'react'

export const TwitchAnimated = ({
  fillColor,
  $pointer = false,
  width = '40',
  height = '40',
  ...props
}: {
  fillColor?: string
  $pointer?: boolean
  width?: string
  height?: string
  onClick?: () => void
}) => {
  const animateonhover = true
  const ref = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (!animateonhover || loaded.current) return
    const element = ref.current
    if (!element) return

    setTimeout(() => {
      const animations = element.querySelectorAll('animate, animateTransform')
      const outerSvg = element.querySelector(
        '#twitch-animated-brand'
      ) as SVGSVGElement
      const playAnimation = (animation: SVGAnimationElement) => {
        animation.beginElementAt(0)
      }

      const playAnimations = () => {
        animations.forEach((animation: any) => {
          outerSvg!.unpauseAnimations()
          const animationElement = animation as SVGAnimationElement
          animation.setAttribute('fill', 'freeze')
          playAnimation(animationElement)
        })
      }

      const pauseAnimations = () => {
        animations.forEach((animation: any) => {
          animation.setAttribute('fill', 'remove')
          outerSvg!.pauseAnimations()
          animation.beginElementAt(0)
        })
      }

      element.addEventListener('mouseenter', playAnimations)
      element.addEventListener('mouseleave', pauseAnimations)
    }, 500)
    loaded.current = true
  }, [])

  return (
    <div ref={ref}>
      <NoSsr>
        <Figure $fillColor={fillColor} $pointer={$pointer} {...props}>
          <Svg
            overflow="visible"
            width={width}
            height={height}
            viewBox="0 0 40 40"
            id="twitch-animated-brand"
            x="0px"
            y="0px"
            $animateonhover={animateonhover}
            $animationName="blink"
            $elementClass="Eyes"
          >
            <g>
              <polygon points="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8">
                <animate
                  dur="150ms"
                  begin="indefinite"
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                  end="indefinite"
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
                    end="indefinite"
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
                    end="indefinite"
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
                    end="indefinite"
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
                    end="indefinite"
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
          </Svg>
        </Figure>
      </NoSsr>
    </div>
  )
}
