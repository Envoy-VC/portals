import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#89EDF1',
				secondary: '#0092A2',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
