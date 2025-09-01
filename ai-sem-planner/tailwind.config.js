/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        knowledgeGreen: "#1abc9c",
        darkGreen: "#16a085",
        lightGreen: "#a8e6cf",
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(135deg, #1abc9c, #16a085)",
        "green-gradient-dark": "linear-gradient(135deg, #16a085, #145a47)",
        "green-gradient-light": "linear-gradient(135deg, #a8e6cf, #1abc9c)",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bounceSlowSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "bounce-slow": "bounceSlow 8s ease-in-out infinite",
        "bounce-slow-slow": "bounceSlowSlow 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
