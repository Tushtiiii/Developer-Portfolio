import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  const trailConfig = { stiffness: 120, damping: 22, mass: 0.8 }
  const trailX = useSpring(rawX, trailConfig)
  const trailY = useSpring(rawY, trailConfig)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }

    const onEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover], input, textarea, [draggable="true"]')) {
        setHovered(true)
      }
    }
    const onLeaveInteractive = () => setHovered(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnterInteractive)
    document.addEventListener('mouseout', onLeaveInteractive)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnterInteractive)
      document.removeEventListener('mouseout', onLeaveInteractive)
    }
  }, [rawX, rawY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-[#CCFF00] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovered ? 44 : 28, height: hovered ? 44 : 28 }}
        transition={{ duration: 0.2 }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#CCFF00] mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovered ? 8 : 5, height: hovered ? 8 : 5 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
