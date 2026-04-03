// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.yanan.store',
	integrations: [
		starlight({
			title: 'YN Blog Docs',
			customCss: ['/src/styles/starlight-theme.css'],
			logo: {
				src: './src/assets/imgs/logo/logo.svg',
				alt: 'YN Blog Logo',
			},
			favicon: '/favicon.ico',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [],
		}),
	],
});
