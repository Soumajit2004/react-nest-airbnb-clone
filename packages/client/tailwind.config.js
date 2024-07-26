/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
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

