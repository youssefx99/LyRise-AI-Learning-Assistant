import React, { useState } from 'react'
import { BookOpen, Trash2 } from 'lucide-react'
import ButtonLoader from './ButtonLoader'

export default function Sidebar({ showSidebar, setShowSidebar, studyHistory, loadHistory, deleteHistory }) {
  const [deletingId, setDeletingId] = useState(null)
  
  if (!showSidebar) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowSidebar(false)}
      ></div>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#111827]">Study History</h2>
          <button onClick={() => setShowSidebar(false)} className="text-[#6b8e7f] hover:text-[#1a2332]">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {studyHistory.length === 0 ? (
            <p className="text-[#6b8e7f] text-center py-8">No saved plans yet</p>
          ) : (
            studyHistory.map((item) => (
              <div key={item.id} className="bg-[#fafafa] rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                <button
                  onClick={() => loadHistory(item)}
                  className="w-full text-left mb-2"
                >
                  <h3 className="font-medium text-[#111827] hover:text-[#6b8e7f]">{item.topic}</h3>
                  {item.timestamp && (
                    <p className="text-xs text-[#9ca3af] mt-1">{item.timestamp}</p>
                  )}
                </button>
                <button
                  onClick={async () => {
                    setDeletingId(item.id)
                    await deleteHistory(item.id)
                    setDeletingId(null)
                  }}
                  disabled={deletingId === item.id}
                  className="text-[#c55d3e] hover:text-[#a04a2f] text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === item.id ? (
                    <>
                      <ButtonLoader size="sm" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
