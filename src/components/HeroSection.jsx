import React from 'react'
import { BookOpen } from 'lucide-react'

export default function HeroSection({ topic, completedCount, totalSteps }) {
  return (
    <div className="text-center relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#1a2332" />
          <rect x="120" y="30" width="40" height="40" fill="#6b8e7f" />
          <polygon points="100,150 120,170 80,170" fill="#c55d3e" />
        </svg>
      </div>
      
      <div className="inline-block mb-8">
        <BookOpen className="w-20 h-20 text-[#6b8e7f] stroke-[1.5]" />
      </div>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl font-bold text-[#111827] mb-8">
        {topic}
      </h1>

      <div className="flex items-center justify-center gap-2 text-sm text-[#6b8e7f] font-medium">
        <span>{completedCount} of {totalSteps} steps completed</span>
      </div>
    </div>
  )
}
