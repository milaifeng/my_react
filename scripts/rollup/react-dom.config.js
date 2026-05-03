import generatePackageJson from 'rollup-plugin-generate-package-json';
import {
	getPackageJson,
	resolvePkgPath,
	getBaseRollupPlugins
} from './utils.js';
import alias from '@rollup/plugin-alias';
const { name, module, peerDependencies } = getPackageJson('react-dom');

// react-dom包的路径
const pkgPath = resolvePkgPath(name);
// react-dom包的输出路径
const distPath = resolvePkgPath(name, true);

export default [
	// react-dom包
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${distPath}/index.js`,
				name: 'ReactDOM',
				format: 'umd'
			},
			{
				file: `${distPath}/client.js`,
				name: 'client',
				format: 'umd'
			}
		],
		external: [...Object.keys(peerDependencies)],
		plugins: [
			...getBaseRollupPlugins(),
			alias({
				entries: {
					find: 'hostConfig',
					replacement: `${pkgPath}/src/hostConfig.ts`
				}
			}),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	},
	// react-dom测试工具包
	{
		input: `${pkgPath}/test-utils.ts`,
		output: [
			{
				file: `${distPath}/test-utils.js`,
				name: 'testUtils.js',
				format: 'umd'
			}
		],
		external: ['react', 'react-dom'],
		plugins: getBaseRollupPlugins()
	}
];
