"use client"

import { useEffect, useRef } from "react"

export default function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiPieces = []
    const colors = [
      "#f9a8d4",
      "#f472b6",
      "#ec4899", // Pink
      "#d8b4fe",
      "#c084fc",
      "#a855f7", // Purple
      "#fcd34d",
      "#fb923c",
      "#f59e0b", // Yellow/Orange
      "#60a5fa",
      "#3b82f6",
      "#2563eb", // Blue
      "#a7f3d0",
      "#34d399",
      "#10b981", // Green
    ]

    class ConfettiPiece {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -20 - Math.random() * 100
        this.size = Math.random() * 10 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speed = Math.random() * 3 + 2
        this.angle = Math.random() * Math.PI * 2
        this.rotation = 0
        this.rotationSpeed = Math.random() * 0.2 - 0.1
        this.shape = ["circle", "square", "triangle", "heart", "star", "diamond"][Math.floor(Math.random() * 6)]
        this.wobble = Math.random() * 10
        this.wobbleSpeed = Math.random() * 0.1
      }

      update() {
        this.y += this.speed
        this.x += Math.sin(this.angle) * 2 + Math.sin(this.y * this.wobbleSpeed) * this.wobble
        this.rotation += this.rotationSpeed
        if (this.y > canvas.height) {
          this.y = -20
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 5

        switch (this.shape) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case "square":
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
            ctx.closePath()
            ctx.fill()
            break
          case "heart":
            ctx.beginPath()
            const size = this.size / 2
            ctx.moveTo(0, -size / 4)
            ctx.bezierCurveTo(size / 2, -size, size, -size / 4, 0, size)
            ctx.bezierCurveTo(-size, -size / 4, -size / 2, -size, 0, -size / 4)
            ctx.fill()
            break
          case "star":
            ctx.beginPath()
            const outerRadius = this.size / 2
            const innerRadius = this.size / 4
            const spikes = 5

            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius
              const angle = (Math.PI * 2 * i) / (spikes * 2) - Math.PI / 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }

            ctx.closePath()
            ctx.fill()
            break
          case "diamond":
            ctx.beginPath()
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(this.size / 2, 0)
            ctx.lineTo(0, this.size / 2)
            ctx.lineTo(-this.size / 2, 0)
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()
      }
    }

    // Create confetti pieces
    for (let i = 0; i < 200; i++) {
      confettiPieces.push(new ConfettiPiece())
    }

    // Animation loop
    let animationId
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confettiPieces.forEach((piece) => {
        piece.update()
        piece.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
