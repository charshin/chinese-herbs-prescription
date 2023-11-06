import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: colors.sky,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
