# **Logcad**

A lightweight utility for styled console logging and simple debug message capture.

![MIT](https://img.shields.io/badge/MIT-License-0000af?style=flat&labelColor=000080)

## **Overview**
- **Purpose**: Logs CSS-styled messages to the browser console and captures short debug entries to `localStorage` for lightweight client-side debugging.
- **Key exports**: `logc` (styled console output), `logd` (debug logger that records to `localStorage`).
- **License**: MIT

## **Features**
- **Styled console output**: Compose messages using simple objects (color, background, bold/italic/underline, border).
- **Debug capture**: `logd` stores debug entries in `localStorage` under `_debug_log` and dispatches a `debuglog` event for realtime consumers.
- **Zero dependencies**: Pure JavaScript, designed for use in browser environments and CommonJS builds.

## **Installation**
- **Node / local**: Copy `src/logcad.mjs` into your project or install the package if published.
- **Requirements**: Node.js for local builds; runs in modern browsers that provide `console`, `localStorage`, and `CustomEvent`.

## **Quick Start**
- **CommonJS (Node / bundlers that use require)**:

```javascript
const { logc, logd } = require('./src/logcad.mjs');

logc([
  { text: 'Hello world', c: 'white', bg: 'blue', b: true }
]);

logd({ name: 'app', logname: 'app' }, 'init', 'Application started', { env: 'dev' });
```

- **ES Module (browser with type="module")**:

```javascript
import { logc, logd } from './src/logcad.mjs';

logc([
  { text: 'Hello ESM', c: '#fff', bg: '#333', b: true }
]);

logd({ name: 'app', logname: 'app' }, 'init', 'App initialized', { user: 'alice' });
```

## **API**
- **`logc(objectArray)`**: Logs CSS-styled messages.
  - **Parameters**: `objectArray` — Array of objects where each object may include:
    - `text` (string): Text to display (required).
    - `c` (string): Text color (CSS color string). Default: `#000`.
    - `bg` (string): Background color (CSS color string).
    - `b` (boolean): Bold flag.
    - `i` (boolean): Italic flag.
    - `u` (boolean): Underline flag.
    - `border` (string): CSS border value (e.g., `1px solid red`).

- **`logd(name, action, message, args, trace = false)`**: Logs debug-style entries and records them in `localStorage`.
  - **Parameters**:
    - `name` (object): Logger metadata. Common properties: `name`, `logname`, `color`, `bg`, `logcolor`, `logbg`.
    - `action` (string): Short action label.
    - `message` (string): Descriptive message.
    - `args` (any): Additional data; will be stringified.
    - `trace` (boolean): If true, includes a stack trace in the output and saved entry.
  - **Behavior**: Appends a structured entry to the `_debug_log` array in `localStorage` (keeps last 100 entries) and dispatches `window` `CustomEvent` named `debuglog` with the new entry in `detail`.

### **Example**
- Perform a simple styled message and a debug entry:

```javascript
logc([
  { text: 'Server', c: 'white', bg: 'green', b: true },
  { text: ' ✓ ', c: 'lightgreen' },
  { text: 'Ready', c: 'white' }
]);

logd({ name: 'server', logname: 'server' }, 'listen', 'Server listening', { port: 8080 });
```

**Development**
- **Local edit**: Edit `src/logcad.mjs` directly. The module is dependency-free.
- **Testing in browser**: Open a page that imports or includes `src/logcad.mjs` and call `logc`/`logd` from the console.
- **Dev notes**: `logd` assumes `localStorage` and `window` are available. In Node-only environments, `logd` will not persist to `localStorage`.


## **License**

**MIT** — See `LICENSE` file in the repository.