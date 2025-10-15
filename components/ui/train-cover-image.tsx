import React from 'react'

interface TrainCoverImageProps {
  className?: string
  height?: string
}

export function TrainCoverImage({ className = '', height = 'h-48' }: TrainCoverImageProps) {
  return (
    <div className={`w-full ${height} ${className} relative overflow-hidden rounded-lg`}>
      <svg
        viewBox="0 0 800 300"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient representing tunnel/station */}
        <defs>
          <linearGradient id="tunnelBg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#134e4a" />
          </linearGradient>
          <linearGradient id="lightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          <filter id="motionBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          </filter>
        </defs>
        
        {/* Background */}
        <rect width="800" height="300" fill="url(#tunnelBg)" />
        
        {/* Motion blur effect */}
        <rect x="400" y="0" width="400" height="300" fill="url(#lightGlow)" filter="url(#motionBlur)" />
        
        {/* Train body */}
        <g transform="translate(100, 150)">
          {/* Main train body */}
          <path
            d="M 0 0 L 0 -40 L 300 -40 L 320 -20 L 320 20 L 300 40 L 0 40 Z"
            fill="url(#trainGradient)"
            stroke="#0f766e"
            strokeWidth="2"
          />
          
          {/* Train nose */}
          <path
            d="M 300 -20 L 350 0 L 300 20 Z"
            fill="#134e4a"
            stroke="#0f766e"
            strokeWidth="2"
          />
          
          {/* Windows */}
          <rect x="20" y="-25" width="200" height="15" fill="#1e293b" rx="2" />
          <rect x="20" y="10" width="200" height="15" fill="#1e293b" rx="2" />
          
          {/* Front windshield */}
          <path
            d="M 320 -15 L 340 0 L 320 15 Z"
            fill="#0f172a"
            stroke="#0f766e"
            strokeWidth="1"
          />
          
          {/* Side details */}
          <rect x="50" y="-35" width="120" height="8" fill="#0d9488" />
          <rect x="50" y="27" width="120" height="8" fill="#0d9488" />
          
          {/* Wheels */}
          <circle cx="80" cy="45" r="8" fill="#374151" />
          <circle cx="150" cy="45" r="8" fill="#374151" />
          <circle cx="220" cy="45" r="8" fill="#374151" />
          <circle cx="290" cy="45" r="8" fill="#374151" />
        </g>
        
        {/* Abstract overlay patterns */}
        <g opacity="0.6">
          <circle cx="600" cy="80" r="40" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
          <circle cx="650" cy="120" r="25" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 580 150 Q 620 140 660 150 T 720 150" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="8,4" />
          <path d="M 590 200 Q 630 190 670 200 T 730 200" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="5,5" />
        </g>
        
        {/* Speed lines */}
        <g opacity="0.7" filter="url(#motionBlur)">
          <line x1="350" y1="100" x2="450" y2="100" stroke="#14b8a6" strokeWidth="3" />
          <line x1="360" y1="120" x2="480" y2="120" stroke="#14b8a6" strokeWidth="2" />
          <line x1="370" y1="140" x2="510" y2="140" stroke="#14b8a6" strokeWidth="2" />
          <line x1="380" y1="160" x2="540" y2="160" stroke="#14b8a6" strokeWidth="1.5" />
          <line x1="390" y1="180" x2="570" y2="180" stroke="#14b8a6" strokeWidth="1.5" />
        </g>
        
        {/* Light rays */}
        <g opacity="0.4">
          <path d="M 400 50 L 500 30 L 600 50 L 700 30" stroke="#ffffff" strokeWidth="3" fill="none" />
          <path d="M 420 80 L 520 60 L 620 80 L 720 60" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path d="M 440 110 L 540 90 L 640 110 L 740 90" stroke="#ffffff" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  )
}

// Alternative simpler version
export function TrainCoverImageSimple({ className = '', height = 'h-48' }: TrainCoverImageProps) {
  return (
    <div className={`w-full ${height} ${className} relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-100 via-teal-50 to-white`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚄</div>
          <div className="text-teal-600 font-bold text-xl">High-Speed Innovation</div>
          <div className="text-gray-600 text-sm">Modern Transportation Solutions</div>
        </div>
      </div>
    </div>
  )
}
