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
					label: '快速开始',
					collapsed: false,
					items: [
						{ label: '首页', slug: 'index', badge: { text: 'Start', variant: 'tip' } },
					],
				},
				{
					label: '前端核心',
					collapsed: false,
					items: [
						{
							label: 'JavaScript',
							badge: { text: 'Core', variant: 'success' },
							autogenerate: { directory: '01.javaScript' },
						},
						{
							label: 'JavaScript常用库和工具',
							badge: { text: 'Hot', variant: 'tip' },
							autogenerate: { directory: '02.JavaScript_Library_and_Framework' },
						},
						{ label: '前端工程化文档', autogenerate: { directory: '03.WebProjectProcess' } },
						{ label: 'React', autogenerate: { directory: '04_React' } },
						{
							label: 'Vue',
							badge: { text: 'Core', variant: 'success' },
							autogenerate: { directory: '05.Vue' },
						},
						{ label: 'Css核心知识点及工程化', autogenerate: { directory: '06.Style' } },
					],
				},
				{
					label: '跨端与图形',
					collapsed: true,
					items: [
						{ label: '小程序', autogenerate: { directory: '07.MiniProgram' } },
						{ label: 'Flutter', autogenerate: { directory: '08.Flutter' } },
						{ label: '虚拟机', autogenerate: { directory: '09.Visualization' } },
						{
							label: 'Electron',
							badge: { text: 'Desktop', variant: 'note' },
							autogenerate: { directory: '12.Electron' },
						},
						{
							label: '前沿技术',
							badge: { text: 'New', variant: 'caution' },
							autogenerate: { directory: '13.Cutting_edge_technology' },
						},
					],
				},
				{
					label: '后端与基础设施',
					collapsed: true,
					items: [
						{ label: '服务器及开发环境搭建', autogenerate: { directory: '10.Env' } },
						{ label: '鸿蒙开发', autogenerate: { directory: '11.HarmonyOs_Next' } },
						{
							label: 'node 基本使用',
							badge: { text: 'Infra', variant: 'tip' },
							autogenerate: { directory: '15.backend_documentation' },
						},
						{ label: '常见的数据库', autogenerate: { directory: '16.database' } },
						{ label: '前端优化技术点', autogenerate: { directory: '17.optimize' } },
					],
				},
				{
					label: '工具与附录',
					collapsed: true,
					items: [
						{
							label: '开发工具',
							badge: { text: 'Tools', variant: 'note' },
							autogenerate: { directory: '14.development_tools' },
						},
						{ label: 'Ps切图', autogenerate: { directory: '18.ps' } },
						{ label: '其他', autogenerate: { directory: '26.other' } },
					],
				},
			],
		}),
	],
});
