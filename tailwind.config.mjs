import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Bangladesh-flag-derived brand palette — deliberate, not the default
        // cream/terracotta AI palette.
        brand: {
          50: '#e8f5ef',
          100: '#c9e8da',
          200: '#93d1b6',
          300: '#5cb890',
          400: '#2c9a6e',
          500: '#0b6e4f',   // primary — deep flag green
          600: '#095c42',
          700: '#084a36',
          800: '#06392a',
          900: '#04241a',
        },
        urgent: {
          50: '#fdeaee',
          400: '#ee4463',
          500: '#e4002b',  // flag red — deadline / urgent accent
          600: '#b8001f',
        },
        amber: {
          400: '#f7b84b',
          500: '#f5a623',  // closing-soon accent
          600: '#cf8710',
        },
        paper: {
          DEFAULT: '#f7f6f2',
          soft: '#efeee7',
        },
        ink: {
          DEFAULT: '#0e1b14',
          soft: '#16261c',
          muted: '#3a4a3f',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0b6e4f 0%, #06392a 100%)',
        'urgent-gradient': 'linear-gradient(135deg, #e4002b 0%, #ad0021 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(6, 57, 42, 0.12)',
        card: '0 1px 2px rgba(14,27,20,0.04), 0 8px 24px -8px rgba(14,27,20,0.10)',
        'card-hover': '0 1px 2px rgba(14,27,20,0.06), 0 20px 40px -12px rgba(14,27,20,0.18)',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(228,0,43,0.35)' },
          '50%': { boxShadow: '0 0 0 6px rgba(228,0,43,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [typography],
};
