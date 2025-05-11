"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Flower, Star, Sparkles, Gift, Crown, Sun, Moon } from "lucide-react"

export default function FloatingElements({ count = 10 }) {
  const [elements, setElements] = useState([])

  useEffect(() => {
    const types = ["heart", "flower", "star", "sparkle", "gift", "crown", "sun", "moon"]
    const colors = ["pink", "purple", "rose", "fuchsia", "violet", "indigo"]
    const colorIntensities = [300, 400, 500, 600]

    const newElements = []

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const intensity = colorIntensities[Math.floor(Math.random() * colorIntensities.length)]

      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.floor(Math.random() * 4),
        rotation: Math.random() * 360,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5,
        type,
        color: `${color}-${intensity}`,
        opacity: 0.3 + Math.random() * 0.7,
      })
    }

    setElements(newElements)
  }, [count])

  const getIcon = (type, size, color) => {
    const className = `w-${size} h-${size} text-${color}`

    switch (type) {
      case "heart":
        return <Heart className={className} fill="currentColor" />
      case "flower":
        return <Flower className={className} />
      case "star":
        return <Star className={className} fill="currentColor" />
      case "sparkle":
        return <Sparkles className={className} />
      case "gift":
        return <Gift className={className} />
      case "crown":
        return <Crown className={className} />
      case "sun":
        return <Sun className={className} />
      case "moon":
        return <Moon className={className} />
      default:
        return <Heart className={className} fill="currentColor" />
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: `${element.x}%`,
            y: `${element.y}%`,
            rotate: element.rotation,
            opacity: 0,
          }}
          animate={{
            y: [`${element.y}%`, `${element.y - 20}%`, `${element.y}%`],
            x: [`${element.x}%`, `${element.x + (Math.random() > 0.5 ? 10 : -10)}%`, `${element.x}%`],
            rotate: [element.rotation, element.rotation + 20, element.rotation],
            opacity: [0, element.opacity, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: element.duration,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {getIcon(element.type, element.size, element.color)}
        </motion.div>
      ))}
    </div>
  )
}
