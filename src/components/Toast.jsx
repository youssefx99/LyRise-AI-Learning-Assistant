import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function Toast({ show, message }) {
  if (!show) return null

  return (
    <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideIn z-50">
      <CheckCircle2 className="w-6 h-6" />
      <span className="font-semibold">{message}</span>
    </div>
  )
}
