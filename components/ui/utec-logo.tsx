import React from 'react'

interface UtecLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function UtecLogo({ className = '', size = 'md' }: UtecLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-16',
    md: 'h-8 w-20',
    lg: 'h-10 w-24'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 80 32"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="80" height="32" fill="#1E40AF" rx="4" />
        
        {/* UTEC Text */}
        <text
          x="40"
          y="22"
          textAnchor="middle"
          className="font-mono font-bold text-white fill-white"
          fontSize="14"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          UTEC
        </text>
      </svg>
    </div>
  )
}

// Alternative version with CSS styling for better control
export function UtecLogoCSS({ className = '', size = 'md' }: UtecLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-16 text-xs',
    md: 'h-8 w-20 text-sm',
    lg: 'h-10 w-24 text-base'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${className}
        bg-blue-600 
        rounded-md 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold 
        font-mono
        tracking-wider
      `}
    >
      UTEC
    </div>
  )
}
