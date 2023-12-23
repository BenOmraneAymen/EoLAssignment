/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login': "url('/src/assets/bg.jpg')",
    }
    )
  },
  plugins: [],
}
}
