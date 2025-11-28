import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'; // https://www.npmjs.com/package/rollup-plugin-copy
import { nodeResolve } from '@rollup/plugin-node-resolve'; // https://www.npmjs.com/package/@rollup/plugin-node-resolve
import terser from '@rollup/plugin-terser'; // https://www.npmjs.com/package/@rollup/plugin-terser
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

// Configure Minification (Strip ALL comments)
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
 * @github ${pkg.author.github}
 * @CompiledBy ${pkg.author.name}
 * @compiled ${new Date().toISOString()}
 */`;

/*  @SOURCES
 * @see {@link https://rollupjs.org/guide/en/#configuration-files}
*/
export default {
    input: ['src/logcad.js'],
    output: [
        // --- OUTPUT1:  UMD (Standard) ---
        {
            file: 'dist/logcad.js',
            format: 'umd',
            name: 'logcad',
            banner,
            sourcemap: !isProduction
        },

        // --- OUTPUT2: UMD (Minified) ---
        {
            file: 'dist/logcad.min.js',
            format: 'umd',
            name: 'logcad',
            // No banner usually for minified, but kept if you need it
            // sourcemap: !isProduction, 
            plugins: [minifyPlugin] // Apply minification specifically here
        },

        // --- OUTPUT3: ESM (Standard) ---
        {
            file: 'dist/logcad.esm.js',
            format: 'es',
            banner,
            sourcemap: !isProduction
        },

        // --- OUTPUT4: ESM (Minified) ---
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
        commonjs(),
        // FIX: rollup-plugin-copy 
        // - Instead using default package.json which has a contraint,
        //    FIX:rollup-plugin-copy use rollup to copy package.json, readme and license to dist and use
        //    dist as the package folder for npm 
        // -  Include src for furture debugging will increase bundle size but helps with debugging
        copy({
            targets: [
                { src: 'src', dest: 'dist' },
                { src: 'README-npm.md', dest: 'dist', rename: 'README.md' },
                { src: 'package.json', dest: 'dist' }
            ]
        })
    ]
};