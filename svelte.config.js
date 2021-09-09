import sveltePreprocess from 'svelte-preprocess';
import staticSiteAdapter from 'sveltejs-adapter-ipfs'
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.svx', '.md', '.svelte.md'],
	preprocess: [
		mdsvex({ 
			extensions: ['.svx', '.md', '.svelte.md' ],
			layout: {
				article: "src/lib/layouts/article.svelte", 
				}
			}),
		sveltePreprocess()
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: staticSiteAdapter()
	}
};

export default config;
