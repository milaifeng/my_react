import generatePackageJson from 'rollup-plugin-generate-package-json';
import {
	getPackageJson,
	resolvePkgPath,
	getBaseRollupPlugins
} from './utils.js';
const { name, module } = getPackageJson('react');

// react包的路径
const pkgPath = resolvePkgPath(name);
// react包的输出路径
const distPath = resolvePkgPath(name, true);

export default [
	// react包
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${distPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// react-jsx-runtime包
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				//jsx-runtime
				file: `${distPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				//jsx-dev-runtime
				file: `${distPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
