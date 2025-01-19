'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sun, Moon, Stars } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { zodiacSigns } from '@/Components/zodiac-data'
export default function AstrologyHomePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
        <div className="z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Celestial Insights</h1>
          <p className="text-xl mb-8">Unlock the secrets of the stars</p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Discover Your Zodiac
          </Button>
        </div>
      </header>

      {/* Zodiac Wheel Section */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Explore the Zodiac</h2>
        <div className="relative w-80 h-80 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-spin-slow"></div>
          {zodiacSigns.map((sign, index) => (
            <motion.div
              key={sign.name}
              className="absolute w-16 h-16 flex items-center justify-center cursor-pointer"
              style={{
                top: `${50 - 40 * Math.cos((index * Math.PI) / 6)}%`,
                left: `${50 + 40 * Math.sin((index * Math.PI) / 6)}%`,
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedSign(sign.name)}
            >
              <Image src={sign.icon || "/placeholder.svg"} alt={sign.name} width={40} height={40} />
            </motion.div>
          ))}
        </div>
        {selectedSign && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold mb-2">{selectedSign}</h3>
            <p>{zodiacSigns.find(sign => sign.name === selectedSign)?.description}</p>
          </div>
        )}
      </section>

      {/* Daily Horoscope Section */}
      <section className="bg-purple-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Today&apos;s Celestial Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-700 p-6 rounded-lg">
              <Sun className="w-12 h-12 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Sun Sign</h3>
              <p>Embrace new opportunities today. Your creativity is at its peak.</p>
            </div>
            <div className="bg-purple-700 p-6 rounded-lg">
              <Moon className="w-12 h-12 mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Moon Sign</h3>
              <p>Your emotions may be intense. Take time for self-reflection.</p>
            </div>
            <div className="bg-purple-700 p-6 rounded-lg">
              <Stars className="w-12 h-12 mb-4 text-yellow-200" />
              <h3 className="text-xl font-bold mb-2">Rising Sign</h3>
              <p>Communication is key today. Express yourself with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Unlock Your Personal Star Map</h2>
        <p className="text-xl mb-8">Get a detailed analysis of your astrological profile</p>
        <Button size="lg" className="bg-yellow-500 text-purple-900 hover:bg-yellow-400">
          Get Your Personal Reading
        </Button>
      </section>
    </div>
  )
}