import type { Config } from "tailwindcss";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        secondary: "var(--secondary)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-secondary-2": "var(--text-secondary-2)",
        footer: "var(--footer)",
        orange:"var(--orange)",
        yellow:"var(--yellow)",
        blue:"var(--blue)",
        input:"var(--input)",
        // gradient:{
        //   blue:"var(--gradient-blue)",
        //   yellow:"var(--gradient-yellow)",
        //   orange: "var(--gradient-orange)",
        //   "blue-reverse":"var(--gradient-blue-reverse)",
        //   black:"var(--gradient-black)",
        // },
        d:{
          main: "var(--d-main)",
          secondary: "var(--d-secondary)",
          sidebar:"var(--d-sidebar)",
          text:"var(--d-text)"
        },
        b:{
          main: "var(--b-main)",
          secondary: "var(--b-secondary)",
        },
      },
      backgroundImage: {
        "cross-pattern": "url('/images/cross2.svg')",
        "dotted-pattern": "url('/images/aboutpattern.png')",
        landing: "url('/images/landing2.png')",
        "gradient-blue": "var(--gradient-blue)",
        "gradient-yellow": "var(--gradient-yellow)",
        "gradient-orange": "var(--gradient-orange)",
        "gradient-blue-reverse": "var(--gradient-blue-reverse)",
        "gradient-black": "var(--gradient-black)",
      },
      backgroundSize:{
        'medium': '40px 40px 4px',
      },
      screens: {
        '3xl': '1800px', // Custom breakpoint
      },
    },
  },
  safelist: [
    {
      pattern: /col-span-(\d+)/, // Allow col-span-1 to col-span-12
    },
  ],
  plugins: [aspectRatio],
} satisfies Config;
