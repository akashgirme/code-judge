const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    join(__dirname, 'apps/client/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, 'libs/ui/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, 'libs/core-design/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '420px',
        lg: '1030px',
        '2xl': '1440px',
      },
      padding: {
        18: '4.5rem',
        30: '7.5rem',
      },
      width: {
        100: '25rem',
        90: '22.375rem',
      },
      minWidth: { 100: '25rem' },
      maxWidth: {
        100: '25rem',
      },
      height: {
        18: '4.5rem',
      },
      minHeight: {
        18: '4.5rem',
      },
      fontFamily: {
        roboto: ['var(--font-roboto-flex)'],
        inter: ['var(--font-inter)'],
        // TODO: Remove Helvetica
        helvetica: ['var(--font-inter)'],
      },
      fontWeight: {
        heading: 700,
      },
      fontSize: {
        heading: '28px',
        '13px': '0.8125rem',
        '32px': '2rem',
        '44px': '2.75rem',
        '56px': '3.5rem',
        '64px': '4rem',
      },
      lineHeight: {
        heading: '38.25px',
        '120%': '120%',
        '160%': '160%',
      },
      letterSpacing: {
        heading: '-1.5%',
      },
      boxShadow: {
        small: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'cn-primary': {
          DEFAULT: 'hsl(var(--cn-primary))',
          foreground: 'hsl(var(--cn-primary-foreground))',
        },
        'cn-secondary': {
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
        //
        outline: {
          DEFAULT: 'var(--outline)',
          border: 'var(--outline-border)',
          variant: 'var(--outline-variant)',
        },
        success: {
          DEFAULT: 'var(--success)',
        },
        error: {
          DEFAULT: 'var(--error)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
        },

        body: {
          secondary: 'var(--body-secondary)',
          tertiary: 'var(--body-tertiary)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          disabled: 'var(--primary-disabled)',
          text: {
            disabled: 'var(--primary-text-disabled)',
          },
          border: {
            DEFAULT: 'var(--primary-border)',
            fill: 'var(--primary-border-fill)',
            text: {
              DEFAULT: 'var(--primary-border-text)',
              disabled: 'var(--primary-border-text-disabled)',
            },
          },
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
          active: 'var(--secondary-active)',
          disabled: 'var(--secondary-disabled)',
          text: {
            DEFAULT: 'var(--secondary-text)',
            hover: 'var(--secondary-text-hover)',
            disabled: 'var(--secondary-text-disabled)',
          },
          border: {
            DEFAULT: 'var(--secondary-border)',
            hover: 'var(--secondary-border-hover)',
            fill: 'var(--secondary-border-fill)',
          },
        },
        link: {
          active: 'var(--link-active)',
          hover: 'var(--link-hover)',
          disabled: 'var(--link-disabled)',
        },
        surface: {
          on: {
            DEFAULT: 'var(--surface-on)',
            varient: 'var(--surface-on-varient)',
          },
          container: {
            DEFAULT: 'var(--surface-container)',
            low: 'var(--surface-container-low)',
          },
        },
        yellow: {
          container: 'var(--yellow-container)',
          burst: 'var(--yellow-burst)',
          text: 'var(--yellow-text)',
          'on-container': 'var(--yellow-on-container)',
        },
        blue: {
          container: 'var(--blue-container)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        slideOpen: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        slideup: 'slideup 270ms ease-in-out',
        slidedown: 'slidedown 270ms ease-in-out',
        slideleft: 'slideleft 100ms ease-in-out',
        slideright: 'slideright 100ms ease-in-out',
        wave: 'wave 0.3s linear',
        slowfade: 'slowfade 0.4s ease-in-out',
        slideOpen: 'slideOpen 1s ease-in-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
