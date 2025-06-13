/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dusty-rose': '#D8AFA0',
        'sage': '#97A68D',
        'bone': '#F9F6F0',
        'marigold': '#E8A87C',
        'muted-teal': '#6D9DAA',
      },
      fontFamily: {
        'recoleta': ['Georgia', 'serif'], // Fallback for Recoleta
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(151, 166, 141, 0.08)',
        'warm': '0 8px 32px rgba(216, 175, 160, 0.12)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};