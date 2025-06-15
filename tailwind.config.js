/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Great Vibes"', 'cursive'], // For headings/titles
        sans: ['Inter', 'sans-serif'],         // For content/body
      },
      colors: {
        nouveau: {
          bg: "#0f0f1b",         // Deep background
          card: "#1a1a2e",       // Panel backgrounds
          accent: "#6c63ff",     // Indigo-violet accent
          gold: "#ffd700",       // Gold highlight
          rose: "#ff6f91",       // Rose pink
          emerald: "#50fa7b",    // Subtle green
        },
      },
      boxShadow: {
        glow: "0 0 12px #6c63ff",
        gold: "0 0 12px #ffd700",
      },
    },
  },
  plugins: [],
};
