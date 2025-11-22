import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * 
 * @license ${pkg.license}
 * @author ${pkg.author.name}
 * @homepage ${pkg.homepage}
 */`;

export default {
    input: ['src/logcad.mjs'],
    output: [
        {
            file: 'dist/logcad.min.js',
            format: 'umd',
            name: 'Foxin',
            banner,
            sourcemap: !isProduction,
            plugins: isProduction ? [terser({
                format: {
                    comments: /^!/
                }
            })] : []
        },
        {
            file: 'dist/logcad.esm.js',
            format: 'es',
            banner,
            sourcemap: !isProduction
        }
    ],
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs({
            include: ['node_modules/lunr/**']
        })
    ]
};

