import { sveltekit } from '@sveltejs/kit/vite';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import inject from '@rollup/plugin-inject';

const config = {
	plugins: [
		sveltekit()
		// , nodePolyfills()
	]
	// define: {
	// global: {}
	// process: {}
	// 'process.env.ANCHOR_BROWSER': true
	// }
	// build: {
	// 	rollupOptions: {
	// 		plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })]
	// 	}
	// }
};

export default config;
