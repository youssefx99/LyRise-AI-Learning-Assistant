import React, { useState, useEffect } from 'react'
import { saveStudyHistory } from '../services/api'
import HeroSection from './HeroSection'
import OrnamentalDivider from './OrnamentalDivider'
import AISummaryQuote from './AISummaryQuote'
import StudyPlanTimeline from './StudyPlanTimeline'
import ResourcesSection from './ResourcesSection'

export default function ResultCard({ studyData, onBack, onSave, isSaving }) {
  const [completedSteps, setCompletedSteps] = useState([])
  const [chatText, setChatText] = useState('')
  const [isTyping, setIsTyping] = useState(false)


  const toggleStep = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const handlePrint = () => {
    window.print()
  }


  useEffect(() => {
    if (studyData?.summary) {
      typeText(studyData.summary)
    }
  }, [studyData])

  const typeText = (text) => {
    setIsTyping(true)
    setChatText('')
    
    if (window.typingInterval) {
      clearInterval(window.typingInterval)
    }
    
    let i = 0
    window.typingInterval = setInterval(() => {
      if (i < text.length) {
        setChatText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(window.typingInterval)
        setIsTyping(false)
      }
    }, 20)
  }

  if (!studyData) return null

  const totalSteps = studyData.steps?.length || 0
  const completedCount = completedSteps.length

  return (
    <div className="space-y-16">
      <button
        onClick={onBack}
        className="text-[#6b8e7f] hover:text-[#1a2332] transition-colors duration-200 flex items-center gap-2 font-medium"
      >
        ← Start New Topic
      </button>

      <HeroSection 
        topic={studyData.topic}
        completedCount={completedCount}
        totalSteps={totalSteps}
      />

      <OrnamentalDivider />

      <AISummaryQuote 
        chatText={chatText}
        isTyping={isTyping}
      />

      <StudyPlanTimeline 
        steps={studyData.steps}
        completedSteps={completedSteps}
        toggleStep={toggleStep}
      />

      <ResourcesSection 
        resources={studyData.resources}
        onSave={onSave} 
        onPrint={handlePrint}
        isLoading={isSaving} 
      />
    </div>
  )
}
