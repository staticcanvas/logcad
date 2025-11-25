

# <img src="https://raw.githubusercontent.com/staticcanvas/general-resources/main/logos/logcad/dist/png/logcad-128x128.png" width="64" > **Logcad**( log color and debug )

A lightweight utility for styled console logging and simple debug message capture.

[![gitlab-license](https://img.shields.io/gitlab/license/staticcanvas/logcad?style=flat&&labelColor=00ffff&color=0000af&logoColor=ffffff)](https://gitlab.com/staticcanvas/logcad/-/blob/main/README.md?ref_type=heads) [![gitlab](https://img.shields.io/gitlab/pipeline-status/staticcanvas/logcad?style=flat&logo=gitlab&labelColor=00ffff&color=0000af)](https://gitlab.com/staticcanvas) [![npm](https://img.shields.io/npm/v/logcad?style=flat&logo=npm&labelColor=00ffff&color=0000af)](https://www.npmjs.com/package/logcad) [![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/logcad?style=flat&logo=jsdelivr&labelColor=00ffff&color=0000af)](https://cdn.jsdelivr.net/package/npm/logcad)

## ◾**Overview**
- **Purpose**: Logs CSS-styled messages to the browser console and captures short debug entries to `localStorage` for lightweight client-side debugging.
- **Key exports**: `logc` (styled console output), `logd` (debug logger that records to `localStorage`).

## ◾ **Features**
- **Styled console output**: Compose messages using simple objects (color, background, bold/italic/underline, border).
- **Debug capture**: `logd` stores debug entries in `localStorage` under `_debug_log` and dispatches a `debuglog` event for realtime consumers.
- **Zero dependencies**: Pure JavaScript, designed for use in browser environments and CommonJS builds.

## ◾ **Installation**
- **Node / local**: 
  - Copy `src/logcad.js` into your project
  - or
  - link from a ***jsdelivr*** CDN `<script src="https://cdn.jsdelivr.net/npm/logcad@0.3.0/dist/logcad.js"></script>`
  - or
  - install via npm: `npm install logcad`
    - add `logcad` as a devDependency and don't forget to add it in your `package.json` dependencies. 
- **Requirements**: Node.js for local builds; runs in modern browsers that provide `console`, `localStorage`, and `CustomEvent`.

## 🟢 **Quick Start**

- **Vanilla(`UMD(browser)`)** via `<script src="path|url">` tag:
  ```html
  <script src="path/to/logcad.js"></script>
  <!-- or via cdn-->
  <script src="https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@0.3.0/dist/logcad.js"></script>
  ```
  ```javascript
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

- **ESM6 Module(`ESM6(browser)` with `type="module"`)**:

  ```javascript
  import { logc, logd } from 'path/to/logcad.js';
  // or
  import { logc, logd } from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@0.3.0/dist/logcad.esm.js';
  // or 
  import logcad from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@0.3.0/dist/logcad.esm.js';

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
  logdrl();
  ```

**Development**
- **Local edit**: Edit `src/logcad.js` directly. The module is dependency-free.
- **Testing in browser**: Open a page that imports or includes `src/logcad.js` and call `logc`/`logd` from the console.
- **Dev notes**: `logd` assumes `localStorage` and `window` are available. In Node-only environments, `logd` will not persist to `localStorage`.


## **License**

**MIT** — See `LICENSE` file in the repository.