import React from 'react'
import { ExternalLink, Youtube, FileText, Clock } from 'lucide-react'

export default function ResourceCard({ resource }) {
  return (
    <a
      href={resource.url}
      className="group bg-[#fafafa] rounded-xl p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-1 border border-transparent hover:border-[#6b8e7f]"
    >
      <div className="flex justify-center mb-4">
        {resource.type === 'youtube' ? (
          <Youtube className="w-10 h-10 text-[#c55d3e]" />
        ) : (
          <FileText className="w-10 h-10 text-[#6b8e7f]" />
        )}
      </div>
      <h3 className="font-medium text-[#111827] mb-2 group-hover:text-[#6b8e7f] transition-colors duration-200">
        {resource.title}
      </h3>
      {resource.duration && (
        <div className="flex items-center justify-center gap-2 text-sm text-[#6b8e7f] mb-3">
          <Clock className="w-4 h-4" />
          <span>{resource.duration}</span>
        </div>
      )}
      <div className="text-sm text-[#6b8e7f] flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View Resource
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  )
}
