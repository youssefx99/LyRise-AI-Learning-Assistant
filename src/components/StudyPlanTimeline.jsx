import React from 'react'
import { CheckCircle2, Clock } from 'lucide-react'

export default function StudyPlanTimeline({ steps, completedSteps, toggleStep }) {
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <h2 className="text-3xl font-semibold text-[#111827] mb-12 text-center">
          Your Study Plan
        </h2>
        <p className="text-center text-[#6b8e7f]">No steps available yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <h2 className="text-3xl font-semibold text-[#111827] mb-12 text-center">
        Your Study Plan
      </h2>
      
      <div className="relative space-y-8 max-w-2xl mx-auto">
        <div className="absolute left-4 top-8 bottom-8 w-[2px] bg-[#e5e7eb]"></div>
        
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isObject = typeof step === 'object' && step !== null
          
          return (
            <div key={index} className="flex items-start gap-6 relative pl-12">
              <div 
                onClick={() => toggleStep(index)}
                className="absolute left-0 w-8 h-8 rounded-full bg-white border-2 border-[#6b8e7f] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-[#6b8e7f]" />
                ) : (
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-sm font-semibold text-[#6b8e7f]">
                    {index + 1}
                  </span>
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <div className={`transition-opacity duration-200 ${isCompleted ? 'opacity-50' : ''}`}>
                  {isObject ? (
                    <>
                      <h3 className={`font-semibold text-[#111827] mb-2 text-lg ${isCompleted ? 'line-through' : ''}`}>
                        {step.title || `Step ${index + 1}`}
                      </h3>
                      
                      {step.description && (
                        <p className="text-[#374151] leading-relaxed mb-2">
                          {step.description}
                        </p>
                      )}
                      
                      {step.time_estimate_hours && (
                        <div className="flex items-center gap-2 text-sm text-[#6b8e7f] mt-2">
                          <Clock className="w-4 h-4" />
                          <span>{step.time_estimate_hours} hours</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className={`text-[#374151] text-lg leading-relaxed ${isCompleted ? 'line-through' : ''}`}>
                      {step}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
