import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        sand: "var(--sand)",
        wheat: "var(--wheat)",
        mocha: "var(--mocha)",
        espresso: "var(--espresso)",
      }
    }
  },
  plugins: [],
}

export default config