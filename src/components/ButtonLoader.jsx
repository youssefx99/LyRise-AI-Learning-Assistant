import React from 'react'

export default function ButtonLoader({ size = 'sm' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-6 w-6 border-3'
  }

  return (
    <div className={`inline-block animate-spin rounded-full ${sizeClasses[size]} border-current border-t-transparent`}></div>
  )
}
