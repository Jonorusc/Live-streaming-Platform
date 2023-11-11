import Image from 'next/image'

export type ImageProps = {
  $url: string
  alt: string
  $size?: number
  $rounded?: boolean
} & { [key: string]: any }

const Avatar = ({
  $url,
  alt,
  $size = 50,
  $rounded = false,
  ...props
}: ImageProps) => {
  const styles = $rounded
    ? {
        clipPath: 'circle(50% at 50% 50%)'
      }
    : {
        borderRadius: '0.4rem'
      }
  return (
    <Image
      src={$url}
      alt={alt}
      width={$size}
      height={$size}
      style={styles}
      loading="eager"
      quality={80}
      {...props}
    />
  )
}

export default Avatar
