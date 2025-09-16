/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "31px",
      },
      screens: {
        DEFAULT: "100%",
      },
    },
    extend: {
      keyframes: {
        initialShow: {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
            transform: "scale(.95)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0px)",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        initialShow: "initialShow 250ms forwards",
        "will-change": "transform",
      },
      fontFamily: {
        "dana-sm": "dana-sm",
        "dana-md": "dana-md",
        "peyda-md": "peyda-md",
        "peyda-bold": "peyda-bold",
      },
      colors: {
        // light -------------------------------- >>
        // accents --------- >>
        "danger-light": "#EF3826",
        "success-light": "#00B69B",
        "warning-light": "#FEC53D",
        "info-light": "#BA29FF",
        // main ----------- >>
        "primary-light": "#4880FF",
        "secondary-light": "#FFFFFF",
        "background-light": "#F5F6FA",
        // text ------------ >>
        // dark : I mean color :
        "text-dark": "#202224",
        // dark ----------------------------------- >>
        // accents >>
        "danger-dark": "#FF9066",
        "success-dark": "#4AD991",
        "warning-dark": "#FEC53D",
        "info-dark": "#8280FF",
        // main >>
        "secondary-dark": "#273142",
        "background-dark": "#1B2431",
        // text ------------ >>
        // dark : I mean color :
        "text-light": "#FFFFFF",
        // others >>>
        "serach-strok-light": "#D5D5D5",
        "button-strok-light": "#5C5C5C",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/scrollbar"),
    // require("@tailwindcss/scrollbar")({ nocompatible: true }),
  ],
  corePlugins: {
    content: true,
  },
};

/* 
accents color :
.danger-theme =  EF3826 / hsl 20. ______________ dark -> FF9066
.success-theme =  00B69B / hsl 20. ____________ dark -> 4AD991
.warning-theme =  FFA756 / hsl 20. ______ dark -> FEC53D
.info-theme =  BA29FF / hsl 20.  _____ dark-> 8280FF
main-color :
primary = 4880FF .
background = F5F6FA __________ dark -> 1B2431 
secondary = FFFFFF ____________ dark -> 273142

text color :
black = 202224 / has many opacities . _________ dark -> FFFFFF / opacity
*/
