// Circuit & Soil design tokens (from DESIGN.md)
// Edit colors, spacing, or fonts here — every page picks up the change automatically.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#31394d",
        "primary": "#f2ffef",
        "on-primary-fixed": "#00210b",
        "on-secondary-fixed": "#001f24",
        "surface-container-highest": "#2d3449",
        "primary-fixed": "#63ff93",
        "error-container": "#93000a",
        "on-background": "#dae2fd",
        "secondary-fixed": "#9cf0ff",
        "on-tertiary-fixed": "#101c2c",
        "on-tertiary-fixed-variant": "#3c475a",
        "on-tertiary-container": "#576276",
        "surface-container": "#171f33",
        "outline": "#849584",
        "tertiary-fixed-dim": "#bbc7dd",
        "outline-variant": "#3b4b3c",
        "on-primary-fixed-variant": "#005225",
        "surface-container-low": "#131b2e",
        "surface-variant": "#2d3449",
        "on-secondary-fixed-variant": "#004f58",
        "secondary": "#bdf4ff",
        "on-primary-container": "#007235",
        "on-surface-variant": "#b9cbb8",
        "on-tertiary": "#253142",
        "inverse-on-surface": "#283044",
        "surface-dim": "#0b1326",
        "surface-container-lowest": "#060e20",
        "tertiary": "#fbfaff",
        "tertiary-fixed": "#d7e3fa",
        "surface": "#0b1326",
        "background": "#0b1326",
        "inverse-primary": "#006d33",
        "secondary-fixed-dim": "#00daf3",
        "primary-container": "#22ff82",
        "on-primary": "#003917",
        "on-surface": "#dae2fd",
        "on-error": "#690005",
        "secondary-container": "#00e3fd",
        "on-error-container": "#ffdad6",
        "primary-fixed-dim": "#00e471",
        "inverse-surface": "#dae2fd",
        "on-secondary": "#00363d",
        "error": "#ffb4ab",
        "on-secondary-container": "#00616d",
        "surface-tint": "#00e471",
        "tertiary-container": "#d3dff6",
        "surface-container-high": "#222a3d"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        "margin-desktop": "80px",
        unit: "4px",
        "margin-mobile": "20px",
        "container-max": "1280px"
      },
      fontFamily: {
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Space Grotesk"],
        "headline-lg": ["Space Grotesk"],
        "label-sm": ["JetBrains Mono"],
        "data-display": ["JetBrains Mono"],
        "headline-xl": ["Space Grotesk"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-lg": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        "data-display": ["24px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "700" }],
        "headline-xl": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    }
  }
};
