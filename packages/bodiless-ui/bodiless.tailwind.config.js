/* eslint quote-props: ["error", "as-needed", { "unnecessary": false }] */
/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig');

const defaultGrid = {
  'auto': 'auto',
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

module.exports = {
  prefix: 'bl-',
  theme: {
    extend: {

      /*
      |---------------------------------------------------------------------------
      | Inset     https://tailwindcss.com/docs/top-right-bottom-left/#customizing
      |---------------------------------------------------------------------------
      |
      | By default Tailwind only provides 0 and auto top/right/bottom/left/inset utilities.
      |
      | If you'd like to add any negative top/right/bottom/left classes that take
      | the same form as Tailwind's negative margin classes,
      | prefix the keys in your config file with a dash.
      |
      | Class name: .bl-{top|right|bottom|left}-{size}
      |
      */

      inset: {
        ...defaultGrid,
        ...negativeGrid,
        ...percentGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Spacing                 https://tailwindcss.com/docs/customizing-spacing/
      |---------------------------------------------------------------------------
      |
      | By default the spacing scale is shared by the padding, margin, width, and height utilities
      | so it would generate classes like .bl-p-grid-0, .bl-mt-grid-1, .bl-h-xl-grid-1
      |
      | Class name: .bl-{p|m|w|h}-{size}
      |
      */

      spacing: {
        ...defaultGrid,
        ...xlGrid,
        ...negativeGrid,
        ...percentGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Maximum width                      https://tailwindcss.com/docs/max-width
      |---------------------------------------------------------------------------
      |
      | Here is where you define your maximum width utility sizes. These can
      | be percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based scale and a "full width" size,
      | which is basically a reset utility. You can, of course,
      | modify these values as needed.
      |
      | Class name: .bl-max-w-{size}
      |
      */

      maxWidth: {
        ...xlGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Minimum height                    https://tailwindcss.com/docs/min-height
      |---------------------------------------------------------------------------
      |
      | Here is where you define your minimum height utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | few common use-cases by default. You can, of course, modify these
      | values as needed.
      |
      | Class name: .min-h-{size}
      |
      */

      minHeight: {
        ...defaultGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Colors                                https://tailwindcss.com/docs/colors
      |---------------------------------------------------------------------------
      |
      | The color palette defined above is also assigned to the "colors" key of
      | your Tailwind config. This makes it easy to access them in your CSS
      | using Tailwind's config helper. For example:
      |
      | .error { color: theme('colors.red') }
      |
      | Here you can specify the colors used in your project. To get you started,
      | we've provided a generous palette of great looking colors that are perfect
      | for prototyping, but don't hesitate to change them for your project. You
      | own these colors, nothing will break if you change everything about them.
      |
      | We've used literal color names ("red", "blue", etc.) for the default
      | palette, but if you'd rather use functional names like "primary" and
      | "secondary", or even a numeric scale like "100" and "200", go for it.
      |
      */

      colors: {
        primary: '#0070c8',

        transparent: 'transparent',
        initial: 'initial',
        inherit: 'inherit',

        black: '#22292f',
        white: '#ffffff',

        'grey-100': '#f7fafc',
        'grey-200': '#edf2f7',
        'grey-400': '#cbd5e0',
        grey: '#a0aec0',
        'grey-600': '#718096',
        'grey-800': '#2d3748',
        'grey-900': '#1a202c',

        red: '#e3342f',
        green: '#309795',

        'black-transparent': '#00000066',
      },

      /*
      |---------------------------------------------------------------------------
      | Border radius                  https://tailwindcss.com/docs/border-radius
      |---------------------------------------------------------------------------
      |
      | Here is where you define your border radius values. If a `default` radius
      | is provided, it will be made available as the non-suffixed `.rounded`
      | utility.
      |
      | If your scale includes a `0` value to reset already rounded corners, it's
      | a good idea to put it first so other values are able to override it.
      |
      | Class name: .rounded{-side?}{-size?}
      |
      */

      borderRadius: {
        none: '0',
        sm: '2.5px',
        default: '5px',
        lg: '10px',
        full: '100%',
      },

      /*
      |---------------------------------------------------------------------------
      | Screens                    https://tailwindcss.com/docs/responsive-design
      |---------------------------------------------------------------------------
      |
      | Screens in Tailwind are translated to CSS media queries. They define the
      | responsive breakpoints for your project. By default Tailwind takes a
      | "mobile first" approach, where each screen size represents a minimum
      | viewport width. Feel free to have as few or as many screens as you
      | want, naming them in whatever way you'd prefer for your project.
      |
      | Tailwind also allows for more complex screen definitions, which can be
      | useful in certain situations. Be sure to see the full responsive
      | documentation for a complete list of options.
      |
      | Class name: .{screen}:{utility}
      |
      */

      // screens: { },

      /*
      |---------------------------------------------------------------------------
      | Fonts                                  https://tailwindcss.com/docs/fonts
      |---------------------------------------------------------------------------
      |
      | Here is where you define your project's font stack, or font families.
      | Keep in mind that Tailwind doesn't actually load any fonts for you.
      | If you're using custom fonts you'll need to import them prior to
      | defining them here.
      |
      | By default we provide a native font stack that works remarkably well on
      | any device or OS you're using, since it just uses the default fonts
      | provided by the platform.
      |
      | Class name: .font-{name}
      |
      */

      // fontFamily: { },

      /*
      |---------------------------------------------------------------------------
      | Text sizes                       https://tailwindcss.com/docs/text-sizing
      |---------------------------------------------------------------------------
      |
      | Here is where you define your text sizes. Name these in whatever way
      | makes the most sense to you. We use size names by default, but
      | you're welcome to use a numeric scale or even something else
      | entirely.
      |
      | By default Tailwind uses the "rem" unit type for most measurements.
      | This allows you to set a root font size which all other sizes are
      | then based on. That said, you are free to use whatever units you
      | prefer, be it rems, ems, pixels or other.
      |
      | Class name: .text-{size}
      |
      */

      // fontSize: { },

      /*
      |---------------------------------------------------------------------------
      | Font weights                     https://tailwindcss.com/docs/font-weight
      |---------------------------------------------------------------------------
      |
      | Here is where you define your font weights. We've provided a list of
      | common font weight names with their respective numeric scale values
      | to get you started. It's unlikely that your project will require
      | all of these, so we recommend removing those you don't need.
      |
      | Class name: .font-{weight}
      |
      */

      // fontWeight: { },

      /*
      |---------------------------------------------------------------------------
      | Leading (line height)            https://tailwindcss.com/docs/line-height
      |---------------------------------------------------------------------------
      |
      | Here is where you define your line height values, or as we call
      | them in Tailwind, leadings.
      |
      | Class name: .leading-{size}
      |
      */

      // lineHeight: { },

      /*
      |---------------------------------------------------------------------------
      | Tracking (letter spacing)     https://tailwindcss.com/docs/letter-spacing
      |---------------------------------------------------------------------------
      |
      | Here is where you define your letter spacing values, or as we call
      | them in Tailwind, tracking.
      |
      | Class name: .tracking-{size}
      |
      */

      // letterSpacing: { },

      /*
      |---------------------------------------------------------------------------
      | Text colors                       https://tailwindcss.com/docs/text-color
      |---------------------------------------------------------------------------
      |
      | Here is where you define your text colors. By default these use the
      | color palette we defined above, however you're welcome to set these
      | independently if that makes sense for your project.
      |
      | Class name: .text-{color}
      |
      */

      // textColor: theme => theme('colors'),

      /*
      |---------------------------------------------------------------------------
      | Background colors           https://tailwindcss.com/docs/background-color
      |---------------------------------------------------------------------------
      |
      | Here is where you define your background colors. By default these use
      | the color palette we defined above, however you're welcome to set
      | these independently if that makes sense for your project.
      |
      | Class name: .bg-{color}
      |
      */

      // backgroundColor: theme => theme('colors'),

      /*
      |---------------------------------------------------------------------------
      | Background sizes             https://tailwindcss.com/docs/background-size
      |---------------------------------------------------------------------------
      |
      | Here is where you define your background sizes. We provide some common
      | values that are useful in most projects, but feel free to add other sizes
      | that are specific to your project here as well.
      |
      | Class name: .bg-{size}
      |
      */

      // backgroundSize: { },

      /*
      |---------------------------------------------------------------------------
      | Border widths                   https://tailwindcss.com/docs/border-width
      |---------------------------------------------------------------------------
      |
      | Here is where you define your border widths. Take note that border
      | widths require a special "default" value set as well. This is the
      | width that will be used when you do not specify a border width.
      |
      | Class name: .border{-side?}{-width?}
      |
      */

      // borderWidth: { },

      /*
      |---------------------------------------------------------------------------
      | Border colors                   https://tailwindcss.com/docs/border-color
      |---------------------------------------------------------------------------
      |
      | Here is where you define your border colors. By default these use the
      | color palette we defined above, however you're welcome to set these
      | independently if that makes sense for your project.
      |
      | Take note that border colors require a special "default" value set
      | as well. This is the color that will be used when you do not
      | specify a border color.
      |
      | Class name: .border-{color}
      |
      */

      // borderColor: theme => ({
      //   default: theme('colors.grey-light'),
      //   ...theme('colors'),
      // }),

      /*
      |---------------------------------------------------------------------------
      | Width                                  https://tailwindcss.com/docs/width
      |---------------------------------------------------------------------------
      |
      | Here is where you define your width utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based numeric scale, a percentage
      | based fraction scale, plus some other common use-cases. You
      | can, of course, modify these values as needed.
      |
      |
      | It's also worth mentioning that Tailwind automatically escapes
      | invalid CSS class name characters, which allows you to have
      | awesome classes like .w-2/3.
      |
      | Class name: .w-{size}
      |
      */

      // width: { },

      /*
      |---------------------------------------------------------------------------
      | Height                                https://tailwindcss.com/docs/height
      |---------------------------------------------------------------------------
      |
      | Here is where you define your height utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based numeric scale plus some other
      | common use-cases. You can, of course, modify these values as
      | needed.
      |
      | Class name: .h-{size}
      |
      */

      // height: { },

      /*
      |---------------------------------------------------------------------------
      | Minimum width                      https://tailwindcss.com/docs/min-width
      |---------------------------------------------------------------------------
      |
      | Here is where you define your minimum width utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | couple common use-cases by default. You can, of course, modify
      | these values as needed.
      |
      | Class name: .min-w-{size}
      |
      */

      minWidth: {
        ...xlGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Maximum height                    https://tailwindcss.com/docs/max-height
      |---------------------------------------------------------------------------
      |
      | Here is where you define your maximum height utility sizes. These can
      | be percentage based, pixels, rems, or any other units. We provide a
      | couple common use-cases by default. You can, of course, modify
      | these values as needed.
      |
      | Class name: .max-h-{size}
      |
      */

      maxHeight: {
        ...xlGrid,
      },

      /*
      |---------------------------------------------------------------------------
      | Padding                              https://tailwindcss.com/docs/padding
      |---------------------------------------------------------------------------
      |
      | Here is where you define your padding utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default we
      | provide a sensible rem based numeric scale plus a couple other
      | common use-cases like "1px". You can, of course, modify these
      | values as needed.
      |
      | Class name: .p{side?}-{size}
      |
      */

      // padding: { },

      /*
      |---------------------------------------------------------------------------
      | Margin                                https://tailwindcss.com/docs/margin
      |---------------------------------------------------------------------------
      |
      | Here is where you define your margin utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default we
      | provide a sensible rem based numeric scale plus a couple other
      | common use-cases like "1px". You can, of course, modify these
      | values as needed.
      |
      | Class name: .m{side?}-{size}
      |
      | New for V1 - negative margins are included
      |
      */

      // margin: { },

      /*
      |---------------------------------------------------------------------------
      | Shadows                              https://tailwindcss.com/docs/shadows
      |---------------------------------------------------------------------------
      |
      | Here is where you define your shadow utilities. As you can see from
      | the defaults we provide, it's possible to apply multiple shadows
      | per utility using comma separation.
      |
      | If a `default` shadow is provided, it will be made available as the non-
      | suffixed `.shadow` utility.
      |
      | Class name: .shadow-{size?}
      |
      */

      // boxShadow: { },

      /*
      |---------------------------------------------------------------------------
      | Z-index                              https://tailwindcss.com/docs/z-index
      |---------------------------------------------------------------------------
      |
      | Here is where you define your z-index utility values. By default we
      | provide a sensible numeric scale. You can, of course, modify these
      | values as needed.
      |
      | Class name: .z-{index}
      |
      */

      zIndex: {
        max: '99999',
      },

      /*
      |---------------------------------------------------------------------------
      | Opacity                              https://tailwindcss.com/docs/opacity
      |---------------------------------------------------------------------------
      |
      | Here is where you define your opacity utility values. By default we
      | provide a sensible numeric scale. You can, of course, modify these
      | values as needed.
      |
      | Class name: .opacity-{name}
      |
      */

      // opacity: { },

      /*
      |---------------------------------------------------------------------------
      | SVG fill                                 https://tailwindcss.com/docs/svg
      |---------------------------------------------------------------------------
      |
      | Here is where you define your SVG fill colors. By default we just
      | provide `fill-current` which sets the fill to the current text color.
      | This lets you specify a fill color using existing text color utilities
      | and helps keep the generated CSS file size down.
      |
      | Class name: .fill-{name}
      |
      */

      // fill: { },

      /*
      |---------------------------------------------------------------------------
      | SVG stroke                               https://tailwindcss.com/docs/svg
      |---------------------------------------------------------------------------
      |
      | Here is where you define your SVG stroke colors. By default we just
      | provide `stroke-current` which sets the stroke to the current text
      | color. This lets you specify a stroke color using existing text color
      | utilities and helps keep the generated CSS file size down.
      |
      | Class name: .stroke-{name}
      |
      */

      // stroke: { },
    },
  },

  /*
  |-----------------------------------------------------------------------------
  | Variants                 https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what
  | variants are generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | As a V1 update 'modules' has a name change to 'variants'
  |
  */

  variants: {
    borderWidth: ['first', 'responsive'],
  },

  // corePlugins: {},

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

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
      };

      const components = {
        '.material-icons': {
          color: '#ddd',
          padding: '2px',
          'font-size': '30px',
          'vertical-align': 'text-bottom',
          'border-radius': '5px',

          '.active &': {
            color: '#fff',
            'background-color': '#0070c8',
          },
        },
      };

      addUtilities(newUtilities);
      addComponents(components);
    },
  ],
};
