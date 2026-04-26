import path from 'path';
import fs from 'fs';
import cjs from '@rollup/plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

export const pkgPath = path.resolve(__dirname, '../../packages');
export const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, 'utf8');
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ __DEV__ = true, typescript = {} } = {}) {
	return [
		replace({
			preventAssignment: true,
			values: { __DEV__: JSON.stringify(__DEV__) }
		}),
		cjs(),
		typescript2(typescript)
	];
}
