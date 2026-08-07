/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#030712',
          surface: '#080e21',
          card: '#0d1533',
          cardHover: '#131f47',
          border: '#1e295d',
          neonCyan: '#00f0ff',
          neonCyanDim: '#00f0ff33',
          neonPurple: '#a855f7',
          neonPink: '#ec4899',
          neonGreen: '#10b981',
          neonAmber: '#f59e0b',
          neonBlue: '#3b82f6',
          textMuted: '#94a3b8',
          textBright: '#f8fafc',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Rajdhani"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'glow-cyan-lg': '0 0 35px rgba(0, 240, 255, 0.65)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.45)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.45)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.45)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 240, 255, 0.12)',
        'cyber-card-active': '0 8px 32px 0 rgba(0, 240, 255, 0.15), inset 0 0 0 1px rgba(0, 240, 255, 0.35)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'border-flow': 'borderFlow 4s ease infinite',
        'glitch': 'glitch 1s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.03)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        borderFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
