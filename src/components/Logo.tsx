import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 120, light = false }) => {
  const primaryColor = light ? '#ffffff' : '#123d6a';
  const cutoutColor = light ? '#0f172a' : '#ffffff'; // Matches bg-slate-900 in light mode on dark sidebar

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00a4e4" />
          <stop offset="100%" stopColor="#123d6a" />
        </linearGradient>

        <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc44" />
          <stop offset="100%" stopColor="#00b050" />
        </linearGradient>

        <linearGradient id="s-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00a4e4" />
          <stop offset="50%" stopColor="#00b050" />
          <stop offset="100%" stopColor="#00cc44" />
        </linearGradient>

        <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3399ff" />
          <stop offset="100%" stopColor="#0055ff" />
        </linearGradient>
      </defs>

      {/* Top Arc (Blue Gradient) */}
      <path
        d="M 28 85 A 76 76 0 0 1 172 85"
        fill="none"
        stroke="url(#blue-grad)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Bottom Arc (Green Gradient) */}
      <path
        d="M 45 140 A 75 75 0 0 0 155 140"
        fill="none"
        stroke="url(#green-grad)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Snowflake (Top Left) */}
      <g transform="translate(68, 52) scale(0.9)" stroke="#00a4e4" strokeWidth="2.5" strokeLinecap="round">
        <line x1="0" y1="-12" x2="0" y2="12" />
        <line x1="-12" y1="0" x2="12" y2="0" />
        <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
        <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
        {/* Branch ticks */}
        <path d="M -3 -8 L 0 -11 L 3 -8" fill="none" />
        <path d="M -3 8 L 0 11 L 3 8" fill="none" />
        <path d="M -8 -3 L -11 0 L -8 3" fill="none" />
        <path d="M 8 -3 L 11 0 L 8 3" fill="none" />
      </g>

      {/* Wrench (Top Right) */}
      <g transform="translate(125, 40) rotate(15) scale(0.95)" fill={primaryColor}>
        <path
          d="M 12 5 L 2 15 C 0.5 16.5 -1.5 16.5 -3 15 C -4.5 13.5 -4.5 11.5 -3 10 L 7 0 C 4.5 -3 4.5 -8 7.5 -11 C 10.5 -14 15.5 -14.5 19 -11.5 C 22.5 -8.5 22 -3.5 19 -0.5 C 16 2.5 11.5 2.5 8.5 -0.5 Z"
          fill={primaryColor}
        />
        {/* Mouth/jaw cutout */}
        <path
          d="M 16.5 -4.5 C 18.5 -6.5 18.5 -9.5 16.5 -11.5 C 14.5 -13.5 11.5 -13.5 9.5 -11.5 L 14 -7 Z"
          fill={cutoutColor}
        />
      </g>

      {/* JMS Center Text */}
      <text
        x="100"
        y="120"
        fontSize="44"
        fontWeight="900"
        fontFamily="'Outfit', 'Inter', 'Montserrat', 'Arial Black', sans-serif"
        textAnchor="middle"
        letterSpacing="-1"
      >
        <tspan fill={primaryColor}>J</tspan>
        <tspan fill={primaryColor}>M</tspan>
        <tspan fill="url(#s-grad)">S</tspan>
      </text>

      {/* House Roof & Window (Bottom Center) */}
      <g transform="translate(100, 142)">
        {/* Roof */}
        <path
          d="M -30 20 L 0 0 L 30 20"
          fill="none"
          stroke={primaryColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Window grid */}
        <rect x="-6" y="10" width="5" height="5" fill={primaryColor} rx="0.5" />
        <rect x="1" y="10" width="5" height="5" fill={primaryColor} rx="0.5" />
        <rect x="-6" y="16" width="5" height="5" fill={primaryColor} rx="0.5" />
        <rect x="1" y="16" width="5" height="5" fill={primaryColor} rx="0.5" />
      </g>

      {/* Water Droplet (Bottom Left) */}
      <g transform="translate(42, 146) scale(0.9)">
        <path
          d="M 10 -15 C 10 -15, 0 -3, 0 5 A 10 10 0 0 0 20 5 C 20 -3, 10 -15, 10 -15 Z"
          fill="url(#water-grad)"
        />
        {/* Highlight */}
        <path
          d="M 4 4 A 7 7 0 0 1 5 -1"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Lightning Bolt (Bottom Right) */}
      <path
        d="M 154 135 L 143 151 L 151 151 L 146 167 L 160 147 L 151 147 Z"
        fill="#00cc44"
        stroke="#00b050"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
};
