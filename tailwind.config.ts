import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/flowbite/**/*.{js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: colors.cyan,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
export default config;
