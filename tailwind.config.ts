import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  darkMode: ['class'],
  theme: {
    screens: {
      xs: '300px',
      // => @media (min-width: 300px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      custom : '1220px',

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      
      colors: {
        'custom-gray': 'rgba(102, 102, 102, 0.35)',
        bodyColor: 'var(--body)',
        headingColor: 'var(--heading)',
        subheadingColor: 'var(--subheading)',

        searchBarBg: 'var(--search-bar-bg)',
        inputBg: 'var(--input-bg)',
        inputBorder: 'var(--input-border)',
        inputText: 'var(--inputText)',

        border: 'var(--border)',
        input: 'var(--accent)',
        ring: 'var(--accent)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        navBorder: 'var(--navBorder)',

        formBg: 'var(--formBg)',
        formBorder: 'var(--formBorder)',
        checkboxBg : 'var(--checkbox)',
        dropdownBg : 'var(--dropdownBackground)',
        dropdownIcon : 'var( --dropdownIcon)',

        agTableTop : 'var(--agTabletopText)',

        underline: 'var(--underline)',
        underlineTop: 'var(--underlineTop)',

        resendText: 'var(--resendText)',
        verifyField: 'var(--verifyField)',

        back: 'var(--backcolor)',
        cardbg: 'var(--cardbg)',
        cardBorder: 'var(--card-border)',
        cardHeading: 'var(--cardheading)',
        cardText: 'var(--cardText)',

        iconText: 'var(--iconText)',
        loader: 'var( --loader)',

        hoverNav: 'var(--hover)',
        detailsBtn: 'var(--detailsbutton)',

        btnText: 'var(--btn-text)',
        btnHover: 'var(--btn-hover)',

        detailsCheck: 'var(--detailsCheck)',
        detailsChecked: 'var(--detailsChecked)',

        tableBg: 'var(--tableBg)',
        tableBorder: 'var(--tableBorder)',

        accordionText: 'var(--accordionText)',
        accordionBg: 'var(--accordionBg)',
        accodionBorder: 'var(--accodionBorder)',

        logoutText: 'var(--logoutText)',
        userMail: 'var(--userMail)',
        zakatText: 'var(--zakatText)',

        primary: {
          DEFAULT: 'var(--primary)',
          background: 'var(--primary-background)',
          hover: 'var(--primary-hover)',
        },

        secondary: 'var(--secondary)',

        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
          light: 'var(--destructive-light)',
          medium: 'var(--destructive-medium)',
        },

        accent: {
          DEFAULT: 'var(--accent)',
          background: 'var(--accent-background)',
        },

        calendar: {
          text: 'var(--calendar-text)',
          active: 'var(--calendar-active)',
          field: 'var(--dropdown-calendar)',
          boundary: 'var(--dropdown-outline)',
        },

        event: {
          heading: 'var(--event-heading)',
        },
        
      },
      animation: {
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
      },
      
      keyframes: {
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
