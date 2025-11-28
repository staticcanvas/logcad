/**
 * @file vite.config.js
 * @description Vite configuration file for staticcanvas javascript UMD build
 * @version v1.0
 */

import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';
import fs from 'fs';
import terser from '@rollup/plugin-terser';

// 1. Read the package.json to get version/author for the banner
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// if you have a namespace/org in space the @namespace/package-name format
// string.split('/').pop() will return package-name without the namespace
// as files will be written to dist/package-name
const pkg_name_WNNS = pkg.name.split('/').pop();

const bannerText = `
  ${pkg.name} v${pkg.version}
  ${pkg.description}
  @license ${pkg.license}
  @author ${pkg.author.name}
  @homepage ${pkg.homepage}
  @github ${pkg.author.github}
  @gitlab ${pkg.author.gitlab}
  @CompiledBy ${pkg.extras.compliedBy}
  @lintedBy ${pkg.extras.lintedBy}
  @compiled ${new Date().toISOString()}
`;

export default defineConfig({
    build: {
        // Output to dist
        outDir: 'dist',
        emptyOutDir: true,

        // Target ES2015 (ES6) to ensure broad compatibility (closest to ES5 without bloating)
        target: 'es2015',

        lib: {
            entry: resolve(__dirname, `src/${pkg_name_WNNS}.js`),
            name: pkg_name_WNNS,
            fileName: pkg_name_WNNS
        },

        // We disable global minification to handle it per-file below
        minify: false,

        rollupOptions: {
            // Your 4-File Output Strategy
            output: [
                // 1. UMD Standard
                {
                    format: 'umd', 
                    name: pkg_name_WNNS, 
                    dir: 'dist', 
                    entryFileNames: `${pkg_name_WNNS}.js`,
                    sourcemap: true
                },
                // 2. UMD Minified
                { 
                    format: 'umd', 
                    name: pkg_name_WNNS, 
                    dir: 'dist', entryFileNames: 
                    `${pkg_name_WNNS}.min.js`, 
                    sourcemap: true,
                    plugins: [terser({ format: { comments: false } })] 
                },
                // 3. ESM Standard
                { 
                    format: 'es', 
                    dir: 'dist', 
                    entryFileNames: `${pkg_name_WNNS}.esm.js`,
                    sourcemap: true
                },
                // 4. ESM Minified
                { 
                    format: 'es', 
                    dir: 'dist', 
                    entryFileNames: `${pkg_name_WNNS}.esm.min.js`,
                    sourcemap: true,
                    plugins: [terser({ format: { comments: false } })]
                }
            ]
        }
    },
    plugins: [
        banner(bannerText),
        copy({
            targets: [
                // A. Handle README: Rename README-npm.md to README.md in dist
                { src: 'README-npm.md', dest: 'dist', rename: 'README.md' },

                // B. Handle License
                { src: 'LICENSE', dest: 'dist' },

                // C. MAGIC STEP: Copy & Patch package.json
                {
                    src: 'package.json',
                    dest: 'dist',
                    transform: (contents) => {
                        const json = JSON.parse(contents.toString());

                        // 1. Strip 'dist/' from paths (since this file will BE inside dist)
                        json.main = `${pkg_name_WNNS}.js`;
                        json.module = `${pkg_name_WNNS}.esm.js`;
                        json.jsdelivr = `${pkg_name_WNNS}.min.js`;
                        json.unpkg = `${pkg_name_WNNS}.min.js`;

                        // 2. Fix Exports (Remove dist/)
                        json.exports = {
                            "import": `./${pkg_name_WNNS}.esm.js`,
                            "require": `./${pkg_name_WNNS}.js` // Good practice to add require for UMD
                        };

                        // 3. Clean up dev noise
                        delete json.scripts;
                        delete json.devDependencies;
                        delete json.files; // No longer needed as we are inside the folder

                        return JSON.stringify(json, null, 2);
                    }
                }
            ],
            hook: 'writeBundle' // Run after build finishes
        })
    ]
});