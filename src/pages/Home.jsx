import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import { BookOpen } from 'lucide-react'
import { generateStudyPlan, getStudyHistory, deleteStudyplan } from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [studyHistory, setStudyHistory] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)

  const handleSubmit = async () => {
    if (!topic.trim()) return

    setIsLoading(true)

    try {
      const data = await generateStudyPlan(topic)
      
      navigate(`/studyplan/${data.id}`, { 
        state: { studyData: data, isNew: true }
      })
    } catch (error) {
      console.error('Error generating study plan:', error)
      alert('Failed to generate study plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadHistory = (item) => {
    navigate(`/studyplan/${item.id}`)
    setShowSidebar(false)
  }

  const deleteHistory = async (id) => {
    try {
      const result = await deleteStudyplan(id)
      
      if (result.success) {
        setStudyHistory(prev => prev.filter(h => h.id !== id))
      }
    } catch (error) {
      console.error('Error deleting study plan:', error)
      alert('Failed to delete study plan')
    }
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getStudyHistory()
        setStudyHistory(history)
      } catch (error) {
        console.error('Error fetching study history:', error)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#374151] relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #1a2332 0, #1a2332 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px'
        }}></div>
      </div>

      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        studyHistory={studyHistory}
        loadHistory={loadHistory}
        deleteHistory={deleteHistory}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowSidebar(true)}
            className="px-6 py-2 bg-white text-[#374151] rounded-xl font-medium hover:bg-[#e5e7eb] transition-all duration-200 shadow-sm border border-[#e5e7eb]"
          >
            Study History ({studyHistory.length})
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center mb-16">
            <div className="inline-block mb-8">
              <BookOpen className="w-16 h-16 text-[#6b8e7f] stroke-[1.5]" />
            </div>
            
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl font-bold text-[#111827] mb-6">
              Learn Anything in Minutes
            </h1>
            
            <p className="text-xl text-[#6b8e7f] mb-16 max-w-2xl mx-auto">
              Type a topic and let AI build your personalized study plan
            </p>

            <InputForm
              topic={topic}
              setTopic={setTopic}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        
        @media print {
          button { display: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  )
}
