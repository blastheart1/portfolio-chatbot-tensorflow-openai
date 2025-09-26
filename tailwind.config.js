/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
      colors: {
        'chat-bg': '#f8fafc',
        'chat-bubble-user': '#3b82f6',
        'chat-bubble-bot': '#ffffff',
        'chat-border': '#e2e8f0',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      minHeight: {
        '44': '44px',
        '48': '48px',
      },
      minWidth: {
        '44': '44px',
        '48': '48px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
