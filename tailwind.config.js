/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // PLACEHOLDER values — not final. To be settled with David Kunz against
        // klink-design-system-storyboard.html. Each name is reserved for exactly
        // one meaning (see docs/decisions.md and PRD §5.3/§10) — don't reuse
        // "ember" for anything but the tap ritual, "moss" for anything but money,
        // "slate" for anything but shared/social.
        ember: '#E8823C',
        moss: '#4C7A5E',
        slate: '#5B6B7A',
      },
    },
  },
  plugins: [],
}
