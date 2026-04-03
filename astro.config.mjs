// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.yanan.store',
	integrations: [
		starlight({
			title: 'Yn Knowledge base',
			customCss: ['/src/styles/starlight-theme.css'],
			logo: {
				src: './src/assets/imgs/logo/opacity_0_logo.png',
				alt: 'YN Blog Logo',
			},
			favicon: '/favicon.ico',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/creatwang' }],
			sidebar: [
				{
					label: '开始',
					collapsed: false,
					items: [{ label: '首页', slug: 'index' }],
				},
				{
					label: '前端核心',
					collapsed: false,
					items: [
						{ label: 'JavaScript', autogenerate: { directory: '01.javaScript' } },
						{
							label: 'JavaScript常用库和工具',
							autogenerate: { directory: '02.JavaScript_Library_and_Framework' },
						},
						{ label: '前端工程化', autogenerate: { directory: '03.WebProjectProcess' } },
						{ label: 'Css核心知识点及工程化', autogenerate: { directory: '06.Style' } },
						{ label: '虚拟机', autogenerate: { directory: '09.Visualization' } },
						{ label: '服务器及开发环境搭建', autogenerate: { directory: '10.Env' } },
						{ label: '开发工具', autogenerate: { directory: '14.development_tools' } },
						{ label: 'Node 基本使用', autogenerate: { directory: '15.backend_documentation' } },
					],
				},
				{
					label: '跨端|框架',
					collapsed: false,
					items: [
						{ label: 'React', autogenerate: { directory: '04_React' } },
						{ label: 'Vue', autogenerate: { directory: '05.Vue' } },
						{ label: '鸿蒙开发', autogenerate: { directory: '11.HarmonyOs_Next' } },
						{ label: 'Electron', autogenerate: { directory: '12.Electron' } },
						{ label: '小程序', autogenerate: { directory: '07.MiniProgram' } },
						{ label: 'Flutter', autogenerate: { directory: '08.Flutter' } },
					],
				},
				{
					label: '后端与基础设施',
					collapsed: false,
					items: [
						{ label: '数据库', autogenerate: { directory: '16.database' } },
					],
				},				{
					label: '优化',
					collapsed: false,
					items: [
						{ label: '前沿技术', autogenerate: { directory: '13.Cutting_edge_technology' } },
						{ label: '前端优化技术点', autogenerate: { directory: '17.optimize' } },
						{ label: 'Ps切图', autogenerate: { directory: '18.ps' } },
						{ label: '其他', autogenerate: { directory: '26.other' } },
					],
				},
			],
		}),
	],
});
