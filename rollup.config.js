import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

// 1. Configure Minification (Strip ALL comments)
const minifyPlugin = terser({
    format: {
        comments: false, // Removes all comments (including license headers)
    }
});

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * 
 * @license ${pkg.license}
 * @author ${pkg.author.name}
 * @homepage ${pkg.homepage}
 */`;

/*  @SOURCES
 * @see {@link https://rollupjs.org/guide/en/#configuration-files}
 * @see {@link https://rollupjs.org/guide/en/#configuration-files}
*/
export default {
    input: ['src/logcad.js'],
    output: [
        // --- 1. UMD (Standard) ---
        {
            file: 'dist/logcad.js',
            format: 'umd',
            name: 'logcad',
            banner,
            sourcemap: !isProduction
        },

        // --- 2. UMD (Minified) ---
        {
            file: 'dist/logcad.min.js',
            format: 'umd',
            name: 'logcad',
            // No banner usually for minified, but kept if you need it
            // sourcemap: !isProduction, 
            plugins: [minifyPlugin] // Apply minification specifically here
        },

        // --- 3. ESM (Standard) ---
        {
            file: 'dist/logcad.esm.js',
            format: 'es',
            banner,
            sourcemap: !isProduction
        },

        // --- 4. ESM (Minified) ---
        {
            file: 'dist/logcad.esm.min.js',
            format: 'es',
            // sourcemap: !isProduction,
            plugins: [minifyPlugin] // Apply minification specifically here
        }
    ],
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs()
    ]
};