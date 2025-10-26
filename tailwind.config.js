/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
        },
        success: '#22c55e',
        warning: '#f97316',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
}

