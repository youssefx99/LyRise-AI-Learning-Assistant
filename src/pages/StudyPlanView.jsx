import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import { getStudyPlan, getStudyHistory, deleteStudyplan, saveStudyHistory } from '../services/api'

export default function StudyPlanView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [studyData, setStudyData] = useState(null)
  const [studyHistory, setStudyHistory] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.state?.studyData) {
          setStudyData(location.state.studyData)
          setIsLoading(false)
          
          const history = await getStudyHistory()
          setStudyHistory(history)
          return
        }
        
        const plan = await getStudyPlan(id)
        
        if (plan) {
          setStudyData(plan)
        } else {
          navigate('/')
        }
        
        const history = await getStudyHistory()
        setStudyHistory(history)
      } catch (error) {
        console.error('Error fetching study plan:', error)
        navigate('/')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [id, navigate, location.state])

  const handleBack = () => {
    navigate('/')
  }

  const handleSave = async () => {
    try {
      await saveStudyHistory(studyData)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      
      const history = await getStudyHistory()
      setStudyHistory(history)
    } catch (error) {
      console.error('Error saving study plan:', error)
      alert('Failed to save study plan')
    }
  }

  const loadHistory = (item) => {
    navigate(`/studyplan/${item.id}`)
    setShowSidebar(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteHistory = async (deleteId) => {
    try {
      await deleteStudyplan(deleteId)
      setStudyHistory(prev => prev.filter(h => h.id !== deleteId))
      
      if (parseInt(id) === deleteId) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error deleting study plan:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#374151] relative">
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
          <Loader />
        </div>
      </div>
    )
  }

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

        <ResultCard
          studyData={studyData}
          onBack={handleBack}
          onSave={handleSave}
        />
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#6b8e7f] text-white px-6 py-3 rounded-xl shadow-lg z-50">
          ✓ Saved successfully!
        </div>
      )}


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
