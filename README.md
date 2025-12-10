

# <img src="https://raw.githubusercontent.com/staticcanvas/general-resources/main/logos/logcad/dist/png/logcad-128x128.png" width="64" > **Logcad**( log color and debug )

A lightweight utility for styled console logging and simple debug message capture.

[![gitlab-license](https://img.shields.io/gitlab/license/staticcanvas/logcad?style=flat&&labelColor=00ffff&color=0000af&logoColor=ffffff)](https://gitlab.com/staticcanvas/logcad/-/blob/main/README.md?ref_type=heads) [![gitlab](https://img.shields.io/gitlab/pipeline-status/staticcanvas/logcad?style=flat&logo=gitlab&labelColor=00ffff&color=0000af)](https://gitlab.com/staticcanvas) [![npm](https://img.shields.io/npm/v/@staticcanvas/logcad?style=flat&logo=npm&labelColor=00ffff&color=0000af)](https://www.npmjs.com/package/logcad) [![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/logcad?style=flat&logo=jsdelivr&labelColor=00ffff&color=0000af)](https://www.jsdelivr.com/package/npm/@staticcanvas/logcad)

## ◾**Overview**
- **Purpose**: Logs CSS-styled messages to the browser console and captures short debug entries to `localStorage` for lightweight client-side debugging.
- **Key exports**: 
  - `logcad.logc` (styled console output)
  - `logcad.logd` (debug logger that records to `localStorage`, dispatches a `debuglog` event).
  - `logcad.logdrl` (debug log reader that reads from `localStorage` and dispatches a `debuglog` event).

## ◾ **Features**
- **Styled console output**: Compose messages using simple objects (color, background, bold/italic/underline, border).
- **Debug log Event**: Dispatches a `debuglog` event for realtime consumers.
- **Debug capture**: `logd` stores debug entries in `localStorage` under `_debug_log` and dispatches a `debuglog` event for realtime consumers.
- **Zero dependencies**: Pure JavaScript, designed for use in browser environments and CommonJS builds.

## Build

Build uses `vite.js` and custom `rollup.js` config to bundle and or minify for targets `esm`, and `umd`.

> `vite.config.js` and `package.json`

***◾ Scripts***:

```pre
scripts:
    dev
    build
    lint
    lint:fix
    serve:example
    publish:npm
```

## ◾ **Installation**

1. **CDN**:    
   - Link from a ***jsdelivr*** CDN
   - Link from a ***unpkg*** CDN
  
    > If you used a `CDN` link, you're good to go! `logcad` will be available in the global scope via `window.logc`, `window.logd`, and `window.logdrl` functions or just `logc`, `logd`, and `logdrl` functions.
    > if you use a `CND` with `type=module`:
    ```javascript
    import * as logcad from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.js';
    // logcad is now available in the global scope `window.logc`, `window.logd`, `window.logdrl` or just `logc`, `logd`, `logdrl`
    ```

2. **NPM**: `npm install logcad@latest --save --save-dev`
    - add `logcad` as a devDependency and don't forget to add it in your `package.json` dependencies.

    > If you used `npm install`, you can require it from your code with `require('logcad')` or `import logcad from 'logcad'` in your code.

**🛑 Requirements**: \
Node.js for local builds; runs in modern browsers that provide `console`, `localStorage`, and `CustomEvent`.

## 🌐 CDNS

Packages are available on npm by related jsdilver and unpkg cdns.

| ***JSDELIVR*** | LINK |
|---|---|
| **umd** | `https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.js` |
| **umd-minified** | `https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.min.js` |
| **esm** | `https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.js` |
| **esm-minified** | `https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.min.js`  |

| ***UNPKG*** | LINK |
|---|---|
| **umd** | `https://unpkg.com/@staticcanvas/logcad@{version}/dist/logcad.js` |
| **umd-minified** | `https://unpkg.com/@staticcanvas/logcad@{version}/dist/logcad.min.js` |
| **esm** | `https://unpkg.com/@staticcanvas/logcad@{version}/dist/logcad.esm.min.js` |
| **esm-minified** | `https://unpkg.com/@staticcanvas/logcad@{version}/dist/logcad.esm.min.js`  |

## 🟢 **Quick Start**

- **Vanilla(`UMD(browser)`)** via `<script src="path|url">` tag: will be available in the global scope via `window.logcad`, `window.logc`,  `window.logd`. `window.logdrl`.
  ```html
  <script src="path/to/logcad.js"></script>
  <!-- or via cdn: jsdelivr -->
  <script src="https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@0.3.0/dist/logcad.js"></script>
  <!-- or via cdn: unpkg -->
  <script src="https://unpkg.com/@staticcanvas/logcad@0.3.0/dist/logcad.js"></script>
  ```
  ```javascript
  // UMD
  logcad.logc([
    { text: 'Hello UMD(browser)', c: '#fff', bg: '#333', b: true },
    { text: ' Export Type', c: '#fff', bg: '#333', b: true }
  ]);

  logcad.logd(
    { name: 'app', logname: 'app' }, 
    'init', 
    'App initialized', 
    { user: 'alice' }
  );

  logcad.logdrl(
    { name: 'app', logname: 'app' }, 
    'init', 
    'App initialized',
  )
  // or access via `window.logc` and `window.logd` which can be called via logc, logd, logdrl as they are available in the global scope in browser environment
  ```

- **ESM6 Module(`ESM6(browser)` with `type="module"`)**: import from file or cdn and walla!

  ```javascript
  import { logc, logd } from 'path/to/logcad.js';
  // or
  import { logc, logd } from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.js';
  // or 
  import logcad from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.js';

  // UMD
  logc([
    { text: 'Hello UMD(browser)', c: '#fff', bg: '#333', b: true },
    { text: ' Export Type', c: '#fff', bg: '#333', b: true }
  ]);

  logd(
    { name: 'app', logname: 'app' }, 
    'init', 
    'App initialized', 
    { user: 'alice' }
  );
  ```

## 🟡 **API Reference**
- **`logc(objectArray)`**: Logs CSS-styled messages.
  - **Parameters**: `objectArray` — Array of objects where each object may include:
    - `text` (***string***): Text to display (required).
    - `c` (***string***): Text color (CSS color string). Default: `#000`.
    - `bg` (***string***): Background color (CSS color string).
    - `b` (***boolean***): Bold flag.
    - `i` (***boolean***): Italic flag.
    - `u` (***boolean***): Underline flag.
    - `border` (***string***): CSS border value (e.g., `1px solid red`).

- **`logd(name, action, message, args, trace = false)`**: Logs debug-style entries and records them in `localStorage`.
  - **Parameters**:
    - `name` (***object***): Logger metadata. Common properties: `name`, `logname`, `color`, `bg`, `logcolor`, `logbg`.
    - `action` (***string***): Short action label.
    - `message` (***string***): Descriptive message.
    - `args` (***any***): Additional data; will be stringified.
    - `trace` (***boolean***): If true, includes a stack trace in the output and saved entry.
  - **Behavior**: Appends a structured entry to the `_debug_log` array in `localStorage` (keeps last 100 entries) and dispatches `window` `CustomEvent` named `debuglog` with the new entry in `detail`.

- **`logdrl()`**: Prints the `_debug_log` array from `localStorage` to the console.
  - **Behavior**: Reads the `_debug_log` array from `localStorage` and prints it to the console.
  - **Returns**: The `_debug_log` array.
  - **Example**: `logdrl({ name: 'server', logname: 'server' });`
  - **Notes**: This function does not clear the `_debug_log` array in `localStorage`.

### **Example**
- Perform a simple styled message and a debug entry:

  ```javascript
  // log message in the color
  logc([
    { text: 'Server', c: 'white', bg: 'green', b: true },
    { text: ' ✓ ', c: 'lightgreen' },
    { text: 'Ready', c: 'white' }
  ]);

  // log debug
  logd({ name: 'server', logname: 'server' }, 'listen', 'Server listening', { port: 8080 });

  // read debug log
  logdrl({ name: 'server', logname: 'server' });
  ```

**Development**
- **Local edit**: Edit `src/logcad.js` directly. The module is dependency-free.
- **Testing in browser**: Open a page that imports or includes `src/logcad.js` and call `logc`/`logd` from the console.
- **Dev notes**: `logd` assumes `localStorage` and `window` are available. In Node-only environments, `logd` will not persist to `localStorage`.

## Roadmap

- [ ] Support for multiple log levels (debug, info, warning, error)
  - controlled by `loglevel` variable in `src/logcad.js`
  - cant pull from `localStorage` `_debug_log_level` variable


## **Artifacts**

Artifacts are available on [GitLab](https://gitlab.com/staticcanvas/logcad/-/releases) 



## **License**

**MIT** — See `LICENSE` file in the repository.