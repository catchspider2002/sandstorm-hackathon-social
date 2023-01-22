import { sveltekit } from '@sveltejs/kit/vite';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

const config = {
	build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })]
		}
	},
	resolve: {
		alias: {
			path: 'path-browserify'
		}
	},
	plugins: [
		sveltekit()
		// , nodePolyfills()
	],
	// define: {
		// global: {}
		// process: {}
		// 'process.env.ANCHOR_BROWSER': true
	// },
	// optimizeDeps: {
	// 	exclude: ['Buffer']
	// },
};

export default config;
