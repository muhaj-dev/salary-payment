/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          grey: "#F4F0F6",
          pink: "#FF8A62",
          primary: "#662483",
          'pink-rgba': "rgba(217, 135, 107, 0.5)"
        },
        screens: {
          phone: "279px",
          mobile: "360px",
          tablet: "580px",
          laptop: "780px",
          laptop_l: "1000px",
          desktop: "1020px",
          xl: "1400px",
        },
      },
    },
    plugins: []
  }
  