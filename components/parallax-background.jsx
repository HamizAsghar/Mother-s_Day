"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export default function ParallaxBackground({ pattern = "/bg-pattern-1.png" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const backgroundX = useTransform(x, [-300, 300], [10, -10])
  const backgroundY = useTransform(y, [-300, 300], [10, -10])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY,
      })

      x.set(clientX - centerX)
      y.set(clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          x: backgroundX,
          y: backgroundY,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

      {/* Light effect */}
      <motion.div
        className="absolute w-[200%] h-[200%] rounded-full bg-white opacity-10 blur-3xl"
        style={{
          left: `${50 + mousePosition.x * 10}%`,
          top: `${50 + mousePosition.y * 10}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
