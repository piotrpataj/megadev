import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

// Builds the kb as the desk sees it: every .svx page rendered through the kb's own layout and components.
// The output goes to docs/. The kb links from the site root (/kb/...), so base stays empty.
export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ pages: 'docs', assets: 'docs' }),
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) }
				})
			],
			paths: { base: process.env.BASE_PATH ?? '' }
		})
	]
});
