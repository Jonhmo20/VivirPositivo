/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',],
  theme: {
    extend: {
      colors: {
        cerceta: {
          DEFAULT: '#00796B',
          light: '#ccfbf1',  // Variante más clara
          dark: '#004d40',
        },
        CIELO: {
        DEFAULT: '#87ceeb', // Color principal para 'cielo'
          light: '#0284c7',   // Variante más clara
          dark: '#0369a1',    // Variante más oscura
        },
        primary: {
          DEFAULT: '#3BACA3',
          hover: '#339994',
        },
        secondary: {
          DEFAULT: '#4A90B6',
          hover: '#3F7A9D',
        },
        support: {
          DEFAULT: '#7FC8A9',
          hover: '#6BB391',
        },
        accent: {
          DEFAULT: '#E2E6FF',
          hover: '#CCD2FF',
        },
        neutral: {
          DEFAULT: '#F5F7FA',
          dark: '#E1E5EB',
        }
       },
    },
  },
  plugins: [],
}

