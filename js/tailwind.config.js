tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary": "#855300",
        "surface-bright": "#faf8ff",
        "surface": "#faf8ff",
        "inverse-primary": "#c3c0ff",
        "surface-container": "#eaedff",
        "on-tertiary-fixed": "#002113",
        "surface-variant": "#dae2fd",
        "on-primary-fixed": "#0f0069",
        "on-primary-container": "#dad7ff",
        "surface-container-low": "#f2f3ff",
        "primary": "#3525cd",
        "background": "#faf8ff",
        "error-container": "#ffdad6",
        "on-secondary-container": "#684000",
        "secondary-container": "#fea619",
        "primary-fixed": "#e2dfff",
        "outline": "#777587",
        "inverse-on-surface": "#eef0ff",
        "primary-container": "#4f46e5",
        "tertiary-container": "#006e4b",
        "on-secondary-fixed": "#2a1700",
        "on-secondary-fixed-variant": "#653e00",
        "on-background": "#131b2e",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "on-primary": "#ffffff",
        "outline-variant": "#c7c4d8",
        "primary-fixed-dim": "#c3c0ff",
        "surface-container-highest": "#dae2fd",
        "on-error": "#ffffff",
        "on-surface": "#131b2e",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed-variant": "#3323cc",
        "secondary-fixed-dim": "#ffb95f",
        "on-error-container": "#93000a",
        "surface-tint": "#4d44e3",
        "secondary-fixed": "#ffddb8",
        "on-secondary": "#ffffff",
        "tertiary-fixed-dim": "#4edea3",
        "tertiary": "#005338",
        "on-tertiary-fixed-variant": "#005236",
        "surface-container-high": "#e2e7ff",
        "tertiary-fixed": "#6ffbbe",
        "surface-dim": "#d2d9f4",
        "on-tertiary-container": "#67f4b7",
        "on-surface-variant": "#464555",
        "inverse-surface": "#283044",
        "teach": "#10B981",
        "learn": "#F97316"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-lg": "1.5rem",
        "gutter-mobile": "1rem",
        "margin-mobile": "1rem",
        "space-sm": "0.5rem",
        "gutter": "1.5rem",
        "space-xl": "2.5rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "margin": "2rem"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        "display": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-xl": ['"Plus Jakarta Sans"', 'sans-serif'],
        "body-sm": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-sm": ['"Plus Jakarta Sans"', 'sans-serif'],
        "label-sm": ['"Plus Jakarta Sans"', 'sans-serif'],
        "body-md": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-lg": ['"Plus Jakarta Sans"', 'sans-serif'],
        "label-lg": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-lg-mobile": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-md": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-xl-mobile": ['"Plus Jakarta Sans"', 'sans-serif'],
        "label-md": ['"Plus Jakarta Sans"', 'sans-serif'],
        "body-lg": ['"Plus Jakarta Sans"', 'sans-serif']
      },
      fontSize: {
        "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.025em", "fontWeight": "700" }],
        "body-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.005em", "fontWeight": "400" }],
        "headline-sm": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "label-sm": ["10px", { "lineHeight": "14px", "letterSpacing": "0.04em", "fontWeight": "600" }],
        "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }],
        "headline-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
        "headline-lg-mobile": ["26px", { "lineHeight": "34px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
        "headline-xl-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500" }],
        "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "-0.005em", "fontWeight": "400" }]
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-out forwards'
      }
    }
  }
}
