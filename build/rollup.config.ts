import type { RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import typescript from '@rollup/plugin-typescript'
import alias, { type ResolverObject } from '@rollup/plugin-alias'
import filesize from 'rollup-plugin-filesize'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from '../package.json' assert { type: 'json' }
import { banner, extensions, reporter } from './config'

const nodeResolver = nodeResolve({
	// Use the `package.json` "browser" field
	browser: false,
	extensions,
	preferBuiltins: true,
	exportConditions: ['node'],
	moduleDirectories: ['node_modules']
})
const iifeGlobals = {}

const options: RollupOptions = {
	plugins: [
		alias({
			customResolver: nodeResolver as ResolverObject,
			entries: [
				// {
				//     find: /^#lib(.+)$/,
				//     replacement: resolve(__dirname, '..', 'src', '$1.mjs')
				// }
			]
		}),
		nodeResolver,
		babel({
			babelHelpers: 'bundled',
			extensions,
			exclude: [/node_modules[\\/]core-js/]
		}),
		commonjs({
			sourceMap: false,
			exclude: ['core-js']
		}),
		typescript({
			compilerOptions: {
				outDir: undefined,
				declaration: false,
				declarationDir: undefined,
				target: 'es5'
			}
		}),
		filesize({ reporter }),
		visualizer()
	]
}

function externalCjsEsm(id: string) {
	return ['core-js', '@babel/runtime'].some(k => new RegExp('^' + k).test(id))
}

const distDir = (path: string) =>
	process.env.BABEL_ENV === 'es5' ? path.replace('index', 'es5/index') : path

export default (process.env.BABEL_ENV !== 'es5'
	? ([
			{
				input: 'src/index.ts',
				output: [
					{
						file: pkg.main,
						exports: 'auto',
						format: 'cjs'
					},
					{
						file: pkg.module,
						exports: 'auto',
						format: 'es'
					}
				],
				external: externalCjsEsm,
				...options
			}
	  ] as RollupOptions[])
	: ([
			{
				input: pkg.module,
				output: [
					{
						file: distDir(pkg.main),
						exports: 'auto',
						format: 'cjs'
					},
					{
						file: distDir(pkg.module),
						exports: 'auto',
						format: 'es'
					}
				],
				external: externalCjsEsm,
				...options
			}
	  ] as RollupOptions[])
).concat([
	{
		input: distDir(pkg.main),
		output: [
			{
				file: distDir('dist/index.iife.js'),
				format: 'iife',
				name: 'GraceSpeak',
				extend: true,
				globals: iifeGlobals,
				banner
			},
			{
				file: distDir(pkg.unpkg),
				format: 'iife',
				name: 'GraceSpeak',
				extend: true,
				globals: iifeGlobals,
				banner,
				plugins: [terser()]
			}
		],
		plugins: [
			nodeResolver,
			commonjs({
				sourceMap: false,
				exclude: ['core-js']
			}),
			cleanup({
				comments: 'all'
			}),
			filesize({ reporter }),
			visualizer()
		]
	}
])