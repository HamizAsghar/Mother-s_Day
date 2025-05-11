"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import {
  Heart,
  Gift,
  Stars,
  Music,
  MicOffIcon as MusicOff,
  ChevronLeft,
  ChevronRight,
  Cake,
  Camera,
  Sparkles,
  Flower,
  Crown,
  Sun,
} from "lucide-react"
import Confetti from "@/components/confetti"
import FloatingElements from "@/components/floating-elements"
import ParallaxBackground from "@/components/parallax-background"

const slides = [
  {
    id: "cover",
    title: "Happy Mother's Day",
    subtitle: "Salam to mother who instilled love for Muhammad(s.a.w.w) and his Ahlebait(a.s)  ",
    icon: Crown,
    color: "from-pink-300 via-purple-200 to-pink-200",
    bgImage: "/bg-pattern-1.png",
  },
  {
    id: "love",
    title: "With Love",
    subtitle: "A tribute to your endless love",
    content:
      "Your love is the foundation of our family. It's the warm embrace that comforts us, the gentle voice that guides us, and the unwavering support that strengthens us.",
    icon: Heart,
    color: "from-red-200 via-pink-200 to-red-100",
    bgImage: "/bg-pattern-2.png",
  },
  {
    id: "strength",
    title: "Your Strength",
    subtitle: "Celebrating your incredible strength",
    content:
      "Your strength amazes me every day. Through every challenge, you've shown courage, resilience, and grace. You've taught me that true strength comes from love.",
    icon: Sparkles,
    color: "from-purple-200 via-pink-200 to-purple-100",
    bgImage: "/bg-pattern-3.png",
  },
  {
    id: "guidance",
    title: "Your Guidance",
    subtitle: "The light that shows the way",
    content:
      "Your wisdom and guidance have shaped who I am. You've taught me to be kind, to be brave, to stand up for what's right. Your lessons are the compass by which I navigate life.",
    icon: Sun,
    color: "from-amber-200 via-yellow-200 to-amber-100",
    bgImage: "/bg-pattern-4.png",
  },
  {
    id: "memories",
    title: "Beautiful Memories",
    subtitle: "Cherishing our special moments",
    content:
      "From bedtime stories to life advice, from childhood adventures to heart-to-heart talks - every moment with you is a treasure I hold it in my heart.",
    icon: Camera,
    color: "from-blue-200 via-purple-200 to-blue-100",
  },
  {
    id: "gratitude",
    title: "Thank You",
    subtitle: "For everything you do",
    content:
      "For the countless meals prepared with love, for the late nights and early mornings, for the sacrifices big and small - thank you for being the amazing mother you are.",
    icon: Gift,
    color: "from-yellow-200 via-orange-200 to-yellow-100",
    bgImage: "/bg-pattern-6.png",
  },
  {
    id: "celebration",
    title: "Celebrating You",
    subtitle: "Today and always",
    content:
      "Today we celebrate you - not just as a mother, but as the incredible woman you are. Your kindness, wisdom, and love make our world beautiful.",
    icon: Cake,
    color: "from-green-200 via-teal-200 to-green-100",
    bgImage: "/bg-pattern-7.png",
  },
  {
    id: "message",
    title: "My Message",
    subtitle: "From the heart",
    content:
      "I love you more than words can express. You are my inspiration, my role model, and my best friend. Happy Mother's Day to the most amazing mom in the world!",
    icon: Flower,
    color: "from-pink-300 via-purple-200 to-pink-200",
    bgImage: "/bg-pattern-8.png",
  },
]

const images = ["/mother-1.png", "/mother-2.png", "/mother-3.png", "/mother-4.png"]

export default function MothersDay() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const audioRef = useRef(null)

  // For 3D card effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  useEffect(() => {
    if (isOpen && currentSlide === 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, currentSlide])

  useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [playMusic])

  useEffect(() => {
    // Auto-advance gallery images
    if (slides[currentSlide].gallery) {
      const interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentSlide])

  // Add responsive sizing based on screen width
  useEffect(() => {
    const handleResize = () => {
      // This is just to trigger a re-render when the window size changes
      // The actual responsive styling is handled by Tailwind classes
      setIsOpen(isOpen)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const resetMousePosition = () => {
    x.set(0)
    y.set(0)
  }

  const openCard = () => {
    if (!isOpen) {
      setIsOpen(true)
      setPlayMusic(true)
    }
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const toggleMusic = (e) => {
    e.stopPropagation()
    setPlayMusic(!playMusic)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const shareCard = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Happy Mother's Day!",
          text: "I created a special Mother's Day card for you!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      alert("Link copied to clipboard. Share it with your mom!")
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!isOpen) {
    return (
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCard}
          style={{
            rotateX,
            rotateY,
            perspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMousePosition}
        >
          <div className="relative h-[500px] sm:h-[550px] bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 p-4 sm:p-6 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-400 mix-blend-multiply" />
              <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-purple-400 mix-blend-multiply" />
              <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-pink-300 mix-blend-multiply" />
            </div>

            {/* Animated ribbon */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rotate-45 bg-pink-500 shadow-lg z-10">
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs whitespace-nowrap rotate-[-45deg]">
                Special Gift by <br></br>     Muneeb Naqvi
              </div>
            </div>

            <FloatingElements count={15} />

            <div className="h-full flex flex-col items-center justify-center relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <Stars className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 absolute -top-8 sm:-top-10 -right-6 sm:-right-8 transform rotate-12" />
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  >
                    <Crown className="w-14 h-14 sm:w-16 sm:h-16 text-pink-600 mx-auto mb-4 sm:mb-6" />
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-pink-800 mb-2 sm:mb-4 font-serif drop-shadow-md">
                    Happy Mother's Day
                  </h1>
                </div>
                <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto my-3 sm:my-4" />
                <p className="text-center text-pink-700 italic font-medium text-sm sm:text-base md:text-xl px-2">
                  The best of all mothers is the mother of Hussain(a.s)
                </p>

                <motion.div
                  className="mt-6 sm:mt-8 flex justify-center"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 rotate-90" />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500" />
              </motion.div>
            </div>
            <p className="text-center text-gray-600 font-medium text-base sm:text-lg">
              A magical journey awaits inside...
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4 overflow-hidden">
      <audio ref={audioRef} src="/mothers-day-music.mp3.mp3" loop className="hidden" />

      {showConfetti && <Confetti />}

      {/* Music Toggle */}
      <div
        className="absolute top-4 right-4 z-10 bg-white/80 p-2 sm:p-3 rounded-full shadow-md cursor-pointer hover:bg-pink-100 transition-colors"
        onClick={toggleMusic}
      >
        {playMusic ? (
          <Music className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        ) : (
          <MusicOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        )}
      </div>

      {/* Share Button */}
      <div
        className="absolute top-4 left-4 z-10 bg-white/80 p-2 sm:p-3 rounded-full shadow-md cursor-pointer hover:bg-pink-100 transition-colors"
        onClick={shareCard}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-pink-600 w-4 h-4 sm:w-5 sm:h-5"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      </div>

      {/* Main Card Content */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className={`w-full bg-gradient-to-br ${slides[currentSlide].color} rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col relative overflow-hidden`}
            style={{
              rotateX,
              rotateY,
              perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMousePosition}
          >
            {/* Parallax Background */}
            <ParallaxBackground pattern={slides[currentSlide].bgImage} />

            {/* Floating elements */}
            <FloatingElements count={12} />

            {/* Slide content */}
            <div className="flex-1 flex flex-col items-center justify-center z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                {React.createElement(slides[currentSlide].icon, {
                  className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-pink-600 mx-auto mb-2 sm:mb-4",
                })}
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-pink-800 mb-2 font-serif">
                  {slides[currentSlide].title}
                </h2>
                <div className="w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto my-2 sm:my-3 md:my-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl text-center text-pink-700 mb-4 sm:mb-6 md:mb-8 italic font-medium px-2">
                  {slides[currentSlide].subtitle}
                </h3>
              </motion.div>

              {slides[currentSlide].gallery ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-4 border-white mb-4 sm:mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${images[activeImage]})` }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Image navigation dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveImage(index)
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeImage === index ? "bg-white w-4" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-pink-200 max-w-xs sm:max-w-sm mx-auto">
                    <p className="text-pink-800 text-center leading-relaxed text-sm sm:text-base">
                      {slides[currentSlide].content}
                    </p>
                  </div>
                </motion.div>
              ) : slides[currentSlide].content ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-pink-200 max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                >
                  <p className="text-pink-800 text-center leading-relaxed text-sm sm:text-base md:text-lg">
                    {slides[currentSlide].content}
                  </p>
                </motion.div>
              ) : null}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-6 sm:mt-8 z-10">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`rounded-full bg-white/70 backdrop-blur-sm border border-pink-200 text-pink-700 hover:bg-pink-100 hover:text-pink-800 px-2 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm flex items-center ${
                  currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex space-x-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      currentSlide === index ? "bg-pink-600 w-3 sm:w-4 md:w-6" : "bg-pink-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`rounded-full bg-white/70 backdrop-blur-sm border border-pink-200 text-pink-700 hover:bg-pink-100 hover:text-pink-800 px-2 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm flex items-center ${
                  currentSlide === slides.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(false)}
        className="mt-6 sm:mt-8 px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-white hover:bg-pink-100 text-pink-700 rounded-full text-sm sm:text-base font-medium transition-colors shadow-md border border-pink-200"
      >
        Close Card
      </motion.button>
    </div>
  )
}
