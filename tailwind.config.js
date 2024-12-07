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
       },
    },
  },
  plugins: [],
}

