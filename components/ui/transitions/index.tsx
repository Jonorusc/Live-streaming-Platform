import { Variants, motion } from 'framer-motion'
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'

const PageTransition = ({
  children,
  variants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' }
  }
}: {
  children: React.ReactNode
  variants?: Variants
}) => {
  // const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChangeStart = () => {
  //    //...
  //   }

  //   const handleRouteChangeComplete = () => {
  //     // loading screen
  //   }

  //   router.events.on('routeChangeStart', handleRouteChangeStart)
  //   router.events.on('routeChangeComplete', handleRouteChangeComplete)

  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChangeStart)
  //     router.events.off('routeChangeComplete', handleRouteChangeComplete)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 40,
        mass: 1,
        duration: 0.5
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
