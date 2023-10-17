import formsPlugin from '@tailwindcss/forms'
import headlessuiPlugin from '@headlessui/tailwindcss'
import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

// for react-email previews
import { cyanDarkA, slateDarkA } from '@radix-ui/colors'
const iOsHeight = plugin(function ({ addUtilities }) {
  const supportsTouchRule = '@supports (-webkit-touch-callout: none)'
  const webkitFillAvailable = '-webkit-fill-available'

  const utilities = {
    '.min-h-screen-ios': {
      [supportsTouchRule]: {
        minHeight: webkitFillAvailable,
      },
    },
    '.h-screen-ios': {
      [supportsTouchRule]: {
        height: webkitFillAvailable,
      },
    },
  }

  addUtilities(utilities)
})

const backgroundStripes = ({ addUtilities }) => {
  const newUtilities = {}

  Object.keys(colors).forEach((colorGroup) => {
    Object.keys(colors[colorGroup]).forEach((color) => {
      const bgColor = colors[colorGroup][color] + '1a'
      const stripeColor = colors[colorGroup][color] + '80'

      newUtilities[`.bg-stripes-${colorGroup}-${color}`] = {
        backgroundImage: `linear-gradient(
          135deg,
          ${stripeColor} 10%,
          ${bgColor} 0,
          ${bgColor} 50%,
          ${stripeColor} 0,
          ${stripeColor} 60%,
          ${bgColor} 0,
          ${bgColor}
        )`,
        backgroundSize: '7.07px 7.07px',
        backgroundColor: bgColor,
      }
    })
  })

  addUtilities(newUtilities, ['responsive', 'hover'])
}

export default {
  darkMode: ['class'],
  content: [
    './content/**/*.{md,mdx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './emails/**/*.{js,jsx,ts,tsx}',
  ],
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-inter)',
      },
      maxWidth: {
        '2xl': '40rem',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          ...colors.neutral,
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // cyan/slate for react-email previews
        cyan: {
          ...colors.cyan,
          '1': cyanDarkA.cyanA1,
          '2': cyanDarkA.cyanA2,
          '3': cyanDarkA.cyanA3,
          '4': cyanDarkA.cyanA4,
          '5': cyanDarkA.cyanA5,
          '6': cyanDarkA.cyanA6,
          '7': cyanDarkA.cyanA7,
          '8': cyanDarkA.cyanA8,
          '9': cyanDarkA.cyanA9,
          '10': cyanDarkA.cyanA10,
          '11': cyanDarkA.cyanA11,
          '12': cyanDarkA.cyanA12,
        },
        slate: {
          ...colors.slate,
          '1': slateDarkA.slateA1,
          '2': slateDarkA.slateA2,
          '3': slateDarkA.slateA3,
          '4': slateDarkA.slateA4,
          '5': slateDarkA.slateA5,
          '6': slateDarkA.slateA6,
          '7': slateDarkA.slateA7,
          '8': slateDarkA.slateA8,
          '9': slateDarkA.slateA9,
          '10': slateDarkA.slateA10,
          '11': slateDarkA.slateA11,
          '12': slateDarkA.slateA12,
        },
      },
      borderRadius: {
        '4xl': '2rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        // shine/dash for react-email previews
        shine: {
          '0%': { backgroundPosition: '-100%' },
          '100%': { backgroundPosition: '100%' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate(0, 0)',
            opacity: '1',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        // shine/gradient/gradientHover for react-email previews
        gradient: 'linear-gradient(145.37deg, rgba(255, 255, 255, 0.09) -8.75%, rgba(255, 255, 255, 0.027) 83.95%)',
        gradientHover: 'linear-gradient(145.37deg, rgba(255, 255, 255, 0.1) -8.75%, rgba(255, 255, 255, 0.057) 83.95%)',
        shine:
          'linear-gradient(45deg, rgba(255,255,255,0) 45%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 55%,rgba(255,255,255,0) 100%)',
      },
      animation: {
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        text: 'text 5s ease infinite',
      },
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [
    iOsHeight,
    formsPlugin,
    headlessuiPlugin,
    require('tailwindcss-animate'),
    backgroundStripes, // custom made by GPT-4
  ],
} satisfies Config
