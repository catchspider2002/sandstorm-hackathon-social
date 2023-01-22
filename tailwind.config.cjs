/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				impact: ['Impact', 'sans-serif'],
				gloryItalic: ['GloryItalic', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
