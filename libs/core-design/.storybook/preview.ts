import 'tailwindcss/tailwind.css';
import '../src/lib/global-styles/globals.css';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1B1C1D' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
};

export default preview;
