import React from 'react'

export default function AISummaryQuote({ chatText, isTyping }) {
  return (
    <div className="bg-[#fef7ed] bg-opacity-50 rounded-2xl p-8 border-l-4 border-[#6b8e7f] shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative">
      <div className="absolute top-6 left-6 text-6xl text-[#6b8e7f] opacity-20" style={{ fontFamily: "'Playfair Display', serif" }}>
        "
      </div>
      <p className="text-[#374151] text-lg leading-relaxed pl-8">
        {chatText}
        {isTyping && <span className="inline-block w-1 h-5 bg-[#6b8e7f] ml-1 animate-pulse"></span>}
      </p>
    </div>
  )
}
