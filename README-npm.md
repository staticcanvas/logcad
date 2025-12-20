# <img src="https://raw.githubusercontent.com/staticcanvas/general-resources/main/logos/logcad/dist/png/logcad-128x128.png" width="64" > **Logcad**( log color and debug )

A lightweight utility for styled console logging and simple debug message capture.

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

#  **Installation**

* **CDN**:    
   - Link from a ***jsdelivr*** CDN
   - Link from a ***unpkg*** CDN
      > If you used a `CDN` link, you're good to go! `logcad` will be available in the global scope via `window.logc`, `window.logd`, and `window.logdrl` functions or just `logc`, `logd`, and `logdrl` functions as they are available in the global scope in browser environment.
  
  - if you use a `CND` with `type=module`:
    ```javascript
    import * as logcad from 'https://cdn.jsdelivr.net/npm/@staticcanvas/logcad@{version}/dist/logcad.esm.js';
    // logcad is now available in the global scope `window.logc`, `window.logd`, `window.logdrl` or just `logc`, `logd`, `logdrl`
    ```

* **NPM**: `npm install logcad@latest --save --save-dev`
    - Add `logcad` as a devDependency and don't forget to add it in your `package.json` dependencies.
    - Use: 
      ```javascript
      import * as logcad from 'logcad';`
      ```
> !note \
> **🛑 Requirements**: \
Node.js for local builds; runs in modern browsers that provide `console`, `localStorage`, and `CustomEvent`.


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