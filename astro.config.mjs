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
			sidebar: [
				{
					label: '开始',
					items: [
						{ label: '首页', slug: 'index' },
						{ label: '个人介绍', slug: '个人介绍' },
						{ label: '浏览器扩展', slug: 'chrom插件' },
						{ label: '未命名草稿', slug: '未命名' },
					],
				},
				{
					label: '前端基础',
					items: [
						{ label: 'JavaScript', autogenerate: { directory: '01.javaScript' } },
						{
							label: 'JavaScript Library and Framework',
							autogenerate: { directory: '02.JavaScript Library and Framework' },
						},
						{ label: 'Web Project Process', autogenerate: { directory: '03.WebProjectProcess' } },
						{ label: 'React', autogenerate: { directory: '04_React' } },
						{ label: 'Vue', autogenerate: { directory: '05.Vue' } },
						{ label: 'Style / CSS', autogenerate: { directory: '06.Style' } },
					],
				},
				{
					label: '多端与工程',
					items: [
						{ label: 'MiniProgram', autogenerate: { directory: '07.MiniProgram' } },
						{ label: 'Flutter', autogenerate: { directory: '08.Flutter' } },
						{ label: 'Visualization', autogenerate: { directory: '09.Visualization' } },
						{ label: 'Environment', autogenerate: { directory: '10.Env' } },
						{ label: 'HarmonyOS Next', autogenerate: { directory: '11.HarmonyOs_Next' } },
						{ label: 'Electron', autogenerate: { directory: '12.Electron' } },
					],
				},
				{
					label: '进阶与后端',
					items: [
						{
							label: 'Cutting Edge Technology',
							autogenerate: { directory: '13.Cutting_edge_technology' },
						},
						{ label: 'Development Tools', autogenerate: { directory: '14.development_tools' } },
						{ label: 'Node API', autogenerate: { directory: '15.node_api' } },
						{ label: 'Database', autogenerate: { directory: '16.database_blog' } },
						{ label: 'Optimize', autogenerate: { directory: '17.optimize' } },
						{ label: 'PS', autogenerate: { directory: '18.ps' } },
					],
				},
			],
		}),
	],
});
