/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
      colors: {
        'chat-bg': '#f8fafc',
        'chat-bubble-user': '#3b82f6',
        'chat-bubble-bot': '#ffffff',
        'chat-border': '#e2e8f0',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
