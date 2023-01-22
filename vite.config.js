import { sveltekit } from '@sveltejs/kit/vite';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

const config = {
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
	build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
			// external: [/^bigint-buffer*/]
		}
	}
	// resolve: {
	// 	alias: {
	// 		path: 'path-browserify'
	// 	}
	// }
};

export default config;
