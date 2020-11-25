const { mergeWithBodilessConfigs } = require('@bodiless/gatsby-theme-bodiless/dist/tailwindcss');

module.exports = mergeWithBodilessConfigs({
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  /*
  New for V1 - the legacy 'options' is now top-level
  */

  // prefix: '',
  // important: false,
  // separator: ':',

  /*
  New for V1 - the theme section
  */

  theme: {
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

    // colors: {},

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

    // fontFamily: {},

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

    // fontSize: {},

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

    // fontWeight: {},

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

    // lineHeight: {},

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

    // letterSpacing: {},

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

    // backgroundColor: theme => ({
    //   ...theme('colors'),
    // }),

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

    // backgroundSize: {},

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

    // borderWidth: {},

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

    // borderRadius: {},

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

    // width: {},

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

    // height: {},

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

    // minWidth: {},

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

    // minHeight: {},

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
    | Class name: .max-w-{size}
    |
    */

    // maxWidth: {},

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

    // maxHeight: {},

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

    // padding: {},

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

    // margin: {},

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

    // boxShadow: {},

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

    // zIndex: {},

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

    // opacity: {},

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

    // fill: {
    //   current: 'currentColor',
    // },

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

    // stroke: {
    //   current: 'currentColor',
    // },

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

  variants: {},

  corePlugins: {},

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
  ],
});
