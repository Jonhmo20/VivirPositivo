import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* SVG Background - Now fixed position relative to viewport */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#F5F7FA' }} />
              <stop offset="100%" style={{ stopColor: '#E2E6FF' }} />
            </linearGradient>
            
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#4A90B6" opacity="0.1" />
            </pattern>

            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3BACA3', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#7FC8A9', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {/* Base background */}
          <rect width="100%" height="100%" fill="url(#bgGradient)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
          
          {/* Hexagon Pattern - Now positioned relative to viewport */}
          <g transform="translate(150,250) scale(1.5)">
            <path d="M0,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M70,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)"/>
            <path d="M140,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)">
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite"/>
            </path>
          </g>

          <g transform="translate(1500,800) scale(1.5)">
            <path d="M0,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M70,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)"/>
            <path d="M140,0 l30,0 l15,26 l-15,26 l-30,0 l-15,-26 z" fill="url(#hexGradient)">
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite"/>
            </path>
          </g>

            {/* Animated Wave Forms */}
            <path d="M0,700 Q480,650 960,700 T1920,700" fill="#7FC8A9" opacity="0.1">
            <animate
              attributeName="d"
              dur="20s"
              repeatCount="indefinite"
              values="
                M0,700 Q480,650 960,700 T1920,700;
                M0,700 Q480,660 960,690 T1920,700;
                M0,700 Q480,670 960,680 T1920,700;
                M0,700 Q480,680 960,670 T1920,700;
                M0,700 Q480,690 960,660 T1920,700;
                M0,700 Q480,700 960,650 T1920,700;
                M0,700 Q480,690 960,660 T1920,700;
                M0,700 Q480,680 960,670 T1920,700;
                M0,700 Q480,670 960,680 T1920,700;
                M0,700 Q480,660 960,690 T1920,700;
                M0,700 Q480,650 960,700 T1920,700"
              calcMode="spline"
              keySplines="
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95"
            />
          </path>
          <path d="M0,720 Q480,670 960,720 T1920,720" fill="#3BACA3" opacity="0.08">
            <animate
              attributeName="d"
              dur="19s"
              repeatCount="indefinite"
              values="
                M0,720 Q480,670 960,720 T1920,720;
                M0,720 Q480,680 960,710 T1920,720;
                M0,720 Q480,690 960,700 T1920,720;
                M0,720 Q480,700 960,690 T1920,720;
                M0,720 Q480,710 960,680 T1920,720;
                M0,720 Q480,720 960,670 T1920,720;
                M0,720 Q480,710 960,680 T1920,720;
                M0,720 Q480,700 960,690 T1920,720;
                M0,720 Q480,690 960,700 T1920,720;
                M0,720 Q480,680 960,710 T1920,720;
                M0,720 Q480,670 960,720 T1920,720"
              calcMode="spline"
              keySplines="
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95;
                0.45 0.05 0.55 0.95"
            />
          </path>
          
          {/* Other decorative elements positioned within viewport */}
          <g transform="translate(300,350)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="#4A90B6" strokeWidth="1" opacity="0.2">
              <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="0" r="30" fill="none" stroke="#3BACA3" strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* Beating Heart - adjusted position */}
          <g transform="translate(930,550) scale(0.7)">
            <path 
              d="M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z" 
              fill="#FF69B4" 
              opacity="0.4"
            >
              <animate 
                attributeName="d" 
                dur="2s"
                repeatCount="indefinite"
                values="M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z;
                        M0,35 A25,25 0,0,1 40,35 A25,25 0,0,1 80,35 Q80,65 40,95 Q0,65 0,35 Z;
                        M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z"
              />
              <animate
                attributeName="fill-opacity"
                values="0.4;0.6;0.4"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          <g transform="translate(330,850) scale(0.7)">
            <path 
              d="M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z" 
              fill="3BACA3" 
              opacity="0.4"
            >
              <animate 
                attributeName="d" 
                dur="2s"
                repeatCount="indefinite"
                values="M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z;
                        M0,35 A25,25 0,0,1 40,35 A25,25 0,0,1 80,35 Q80,65 40,95 Q0,65 0,35 Z;
                        M0,30 A20,20 0,0,1 40,30 A20,20 0,0,1 80,30 Q80,60 40,90 Q0,60 0,30 Z"
              />
              <animate
                attributeName="fill-opacity"
                values="0.4;0.6;0.4"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Stylized DNA - adjusted position and scale */}
          <g transform="translate(1600,400) rotate(-30) scale(1.2)">
            <path d="M0,0 Q20,-20 40,0 T80,0 T120,0" fill="none" stroke="#4A90B6" strokeWidth="2">
              <animate 
                attributeName="d" 
                dur="4s" 
                repeatCount="indefinite"
                values="M0,0 Q20,-20 40,0 T80,0 T120,0;
                        M0,5 Q20,-15 40,5 T80,5 T120,5;
                        M0,0 Q20,-20 40,0 T80,0 T120,0"
              />
            </path>
            <path d="M0,20 Q20,40 40,20 T80,20 T120,20" fill="none" stroke="#3BACA3" strokeWidth="2">
              <animate 
                attributeName="d" 
                dur="4s" 
                repeatCount="indefinite"
                values="M0,20 Q20,40 40,20 T80,20 T120,20;
                        M0,15 Q20,35 40,15 T80,15 T120,15;
                        M0,20 Q20,40 40,20 T80,20 T120,20"
              />
            </path>
            <line x1="20" y1="0" x2="20" y2="20" stroke="#7FC8A9" strokeWidth="1.5" opacity="0.5"/>
            <line x1="60" y1="0" x2="60" y2="20" stroke="#7FC8A9" strokeWidth="1.5" opacity="0.5"/>
            <line x1="100" y1="0" x2="100" y2="20" stroke="#7FC8A9" strokeWidth="1.5" opacity="0.5"/>
          </g>
          
          {/* Connection Network - Adjusted position */}
          <g transform="translate(400,650)">
            <circle cx="0" cy="0" r="5" fill="#4A90B6" opacity="0.3"/>
            <circle cx="40" cy="-20" r="5" fill="#4A90B6" opacity="0.3"/>
            <circle cx="80" cy="0" r="5" fill="#4A90B6" opacity="0.3"/>
            <line x1="5" y1="0" x2="35" y2="-17" stroke="#4A90B6" strokeWidth="1" opacity="0.2"/>
            <line x1="45" y1="-20" x2="75" y2="-3" stroke="#4A90B6" strokeWidth="1" opacity="0.2"/>
          </g>

          <g transform="translate(960,330)">
            <circle cx="0" cy="0" r="5" fill="#4A90B6" opacity="0.3"/>
            <circle cx="40" cy="-20" r="5" fill="#4A90B6" opacity="0.3"/>
            <circle cx="80" cy="0" r="5" fill="#4A90B6" opacity="0.3"/>
            <line x1="5" y1="0" x2="35" y2="-17" stroke="#4A90B6" strokeWidth="1" opacity="0.2"/>
            <line x1="45" y1="-20" x2="75" y2="-3" stroke="#4A90B6" strokeWidth="1" opacity="0.2"/>
          </g>

           {/* Progress Elements - adjusted position */}
          <g transform="translate(900,650)">
            <path d="M50,-40 A40,40 0 0 1 70,-40" fill="none" stroke="#7FC8A9" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M40,-40 A40,40 0 0 1 80,-40" fill="none" stroke="#3BACA3" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" values="100,0;0,100" dur="2s" repeatCount="indefinite"/>
            </path>
          </g>

        </svg>
      </div>

      {/* Content Container - Now properly layered over background */}
      <div className="relative min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Background;