/* eslint quote-props: ["error", "as-needed", { "unnecessary": false }] */

const defaultUtility = {
  'auto': 'auto',
};

const defaultGrid = {
  'grid-0': '0px',
  'grid-1': '5px',
  'grid-2': '10px',
  'grid-3': '15px',
  'grid-4': '20px',
  'grid-5': '25px',
  'grid-6': '30px',
  'grid-7': '35px',
  'grid-8': '40px',
  'grid-9': '45px',
  'grid-10': '50px',
  'grid-11': '55px',
  'grid-12': '60px',
  'grid-13': '65px',
  'grid-14': '70px',
  'grid-15': '75px',
  'grid-16': '80px',
};

const xlGrid = {
  'xl-grid-0': '100px',
  'xl-grid-1': '250px',
  'xl-grid-2': '500px',
  'xl-grid-3': '750px',
  'xl-grid-4': '1000px',
};

const negativeGrid = {
  '-grid-1': '-5px',
  '-grid-2': '-10px',
  '-grid-3': '-15px',
  '-grid-4': '-20px',
  '-grid-5': '-25px',
  '-grid-6': '-30px',
};

const percentGrid = {
  'quarter': '25%',
  'third': '33.33%',
  'half': '50%',
  'three-quarters': '75%',
  'full': '100%',
};

const remGrid = {
  'rem-1': '1rem',
};

// eslint-disable-next-line import/no-extraneous-dependencies
const tailwindcssDir = require('tailwindcss-dir');

module.exports = {
  content: [
    '../bodiless-*/src/**/!(*.d).{ts,js,jsx,tsx}',
    '../fclasses/src/**/!(*.d).{ts,js,jsx,tsx}'
  ],
  prefix: 'bl-',
  theme: {
    extend: {
      inset: {
        ...defaultUtility,
        ...defaultGrid,
        ...negativeGrid,
        ...percentGrid,
        ...remGrid,
      },
      spacing: {
        ...defaultGrid,
        ...xlGrid,
        ...negativeGrid,
        ...percentGrid,
      },
      maxWidth: {
        ...xlGrid,
      },
      minHeight: {
        ...defaultUtility,
        ...defaultGrid,
      },
      colors: {
        primary: '#0070c8',
        transparent: 'transparent',
        initial: 'initial',
        inherit: 'inherit',
        black: '#22292f',
        tooltip: '#373737',
        white: '#ffffff',
        'gray-100': '#f7fafc',
        'gray-200': '#edf2f7',
        'gray-600': '#718096',
        'gray-900': '#1a202c',
        red: '#e3342f',
        green: '#309795',
        yellow: {
          500: '#ecc94b',
        },
      },
      borderRadius: {
        none: '0',
        sm: '2.5px',
        DEFAULT: '5px',
        lg: '10px',
        full: '100%',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      minWidth: {
        ...xlGrid,
      },
      maxHeight: {
        ...xlGrid,
      },
      zIndex: {
        max: '99999',
      },
    },
  },
  plugins: [
    // Warning: Unexpected unnamed function
    // eslint-disable-next-line func-names
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.active.highlighted': {
          outline: '5px solid #e3342f',
        },
        '.transition-opacity': {
          transition: 'opacity 0.75s',
        },
        '.rotate-45deg': {
          transform: 'rotate(45deg)',
        },
        '.rotate-90deg': {
          transform: 'rotate(90deg)',
        },
        '.rotate-180deg': {
          transform: 'rotate(180deg)',
        },
        '.link-disabled': {
          outline: '3px #ff00d1 dashed',
          'background-color': '#ff00d166',
        },
      };

      const components = {
        '.material-icons': {
          'font-family': 'Material Icons',
          'font-weight': 'normal',
          'font-style': 'normal',
          padding: '2px',
          'font-size': '30px',
          'vertical-align': 'text-bottom',
          'border-radius': '5px',
          'line-height': 1,
          'letter-spacing': 'normal',
          'text-transform': 'none',
          'display': 'inline-block',
          'white-space': 'nowrap',
          'word-wrap': 'normal',
          direction: 'ltr',
          '-webkit-font-feature-settings': 'liga',
          '-webkit-font-smoothing': 'antialiased',
          '.active &': {
            color: '#fff',
            'background-color': '#0070c8',
          },
        },
      };

      addUtilities(newUtilities);
      addComponents(components);
    },
    tailwindcssDir(),
  ],
};
