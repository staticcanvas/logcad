## ◾ **Features**
- **Styled console output**: Compose messages using simple objects (color, background, bold/italic/underline, border).
- **Debug log Event**: Dispatches a `debuglog` event for realtime consumers.
- **Debug capture**: `logd` stores debug entries in `localStorage` under `_debug_log` and dispatches a `debuglog` event for realtime consumers.
- **Zero dependencies**: Pure JavaScript, designed for use in browser environments and CommonJS builds.


## ◾ **Installation**

1. **CDN**:    
   - Link from a ***jsdelivr*** CDN
   - Link from a ***unpkg*** CDN
  
    > If you used a `CDN` link, you're good to go! `logcad` will be available in the global scope via `window.logc`, `window.logd`, and `window.logdrl` functions.

2. **NPM**: `npm install logcad@latest --save --save-dev`
    - add `logcad` as a devDependency and don't forget to add it in your `package.json` dependencies.

    > If you used `npm install`, you can require it from your code with `require('logcad')` or `import logcad from 'logcad'` in your code.

**🛑 Requirements**: \
Node.js for local builds; runs in modern browsers that provide `console`, `localStorage`, and `CustomEvent`.

## 🟢 **Quick Start**

- **Vanilla(`UMD(browser)`)** via `<script src="path|url">` tag:
  ```html
  <script src="path/to/logcad.js"></script>
  <!-- or via cdn: jsdelivr -->
  <script src="https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@0.3.0/dist/logcad.js"></script>
  <!-- or via cdn: unpkg -->
  <script src="https://unpkg.com/@staticcanvas/logcad@0.3.0/dist/logcad.js"></script>
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
## **License**

**MIT** — See `LICENSE` file in the repository.