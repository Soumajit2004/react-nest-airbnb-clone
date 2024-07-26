/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#FF5A5F",
          "secondary": "#FC642D",
          "accent": "#00A699",
          "neutral": "#0f0f3d",
          "base-100": "#fbfbfe",
        },
      },
    ],
  },
}

