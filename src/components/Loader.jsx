import React from 'react'

export default function Loader() {
  return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#6b8e7f] border-t-transparent"></div>
      <p className="mt-4 text-[#6b8e7f]">Crafting your study plan...</p>
    </div>
  )
}
