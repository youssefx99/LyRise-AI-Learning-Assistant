import React from 'react'

export default function InputForm({ topic, setTopic, onSubmit, isLoading }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#fef7ed] rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="What would you like to learn today?"
          className="w-full px-6 py-4 text-lg text-[#374151] bg-white rounded-xl border-2 border-[#e5e7eb] focus:border-[#6b8e7f] focus:outline-none transition-colors duration-200 mb-4"
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !topic.trim()}
          className="w-full py-4 bg-[#1a2332] text-white rounded-xl font-medium hover:bg-[#2d3748] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
        >
          {isLoading ? 'Creating your plan...' : 'Generate Study Plan'}
        </button>
      </div>
    </div>
  )
}
