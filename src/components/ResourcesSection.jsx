import React from 'react'
import { Printer } from 'lucide-react'
import ResourceCard from './ResourceCard'
import ButtonLoader from './ButtonLoader'

export default function ResourcesSection({ resources, onSave, onPrint, isLoading }) {

  const resourcesArray = Array.isArray(resources) ? resources : []
  
  if (resourcesArray.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <h2 className="text-3xl font-semibold text-[#111827] mb-12 text-center">
          Learning Resources
        </h2>
        <p className="text-center text-[#6b8e7f] mb-8">No resources available yet.</p>
        
        <div className="flex gap-4">
          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex-1 py-4 bg-[#1a2332] text-white rounded-xl font-medium hover:bg-[#2d3748] transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <ButtonLoader size="sm" />}
            {isLoading ? 'Saving...' : 'Save for Later'}
          </button>
          <button
            onClick={onPrint}
            className="px-6 py-4 bg-[#fafafa] text-[#374151] rounded-xl font-medium hover:bg-[#e5e7eb] transition-all duration-200 border border-[#e5e7eb] flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <h2 className="text-3xl font-semibold text-[#111827] mb-12 text-center">
        Learning Resources
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {resourcesArray.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex-1 py-4 bg-[#1a2332] text-white rounded-xl font-medium hover:bg-[#2d3748] transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <ButtonLoader size="sm" />}
          {isLoading ? 'Saving...' : 'Save for Later'}
        </button>
        <button
          onClick={onPrint}
          className="px-6 py-4 bg-[#fafafa] text-[#374151] rounded-xl font-medium hover:bg-[#e5e7eb] transition-all duration-200 border border-[#e5e7eb] flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>
      </div>
    </div>
  )
}
