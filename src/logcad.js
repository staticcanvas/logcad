/** * * * * * * * * * * * * * * * * * * * * * * * * * * **
 * @description This function logs styled messages to the console. It takes an array of objects, where each object specifies the text and optional style properties to apply.
 * @param {Array<Object>} objectArray - Array of objects defining the text and style properties for each message.
 * @returns {void}
 *
 * -------------
 *
 * @Properties
 * @param {Array<Object>} objectArray[].text - description
 * @param {string}  objectArray[].text - The text to be logged.
 * @param {string}  [objectArray[].c="#000"] - The color of the text. Default is black.
 * @param {string}  [objectArray[].bg="transparent"] - The background color of the text. Default is transparent.
 * @param {boolean} [objectArray[].b=false] - Whether the text should be bold. Default is false.
 * @param {boolean} [objectArray[].i=false] - Whether the text should be italic. Default is false.
 * @param {boolean} [objectArray[].u=false] - Whether the text should be underlined. Default is false.
 * @param {string}  [objectArray[].border="none"] - The border style of the text. Default is none.
 *
 * -------------
 *
 * @example
 *
 * // log a single message with defaults
 *
 * logc([ { text: "This is the first log message"} ]);
 *
 * // Log multiple messages with custom styles
 *
 * logc([
 *      { text: "This is the first log message", c: "blue", bg: "green", u: true, b: false, i: true },
 *      { text: "And this is another message", c: "red", bg: "yellow", b: true, u: true },
 *      { text: "And this is another message", c: "red", border: "1px solid red" },
 *  ]);
 *
 * // or
 * const messages = []
 *
 * messages.push({ text: "This is the first log message", c: "blue", bg: "green", u: true, b: false, i: true });
 * messages.push({ text: "And this is another message", c: "red", bg: "yellow", b: true, u: true });
 * messages.push({ text: "And this is another message", c: "red", border: "1px solid red" });
 *
 * logc(messages);
 */

function logc(objectArray) {
  const strings = [];
  const styles = [];

  objectArray.forEach((object) => {
    // Build the CSS styles for the current object
    let cssStyles = '';

    if (object.c) {
      cssStyles += `color: ${object.c};`;
    } else {
      cssStyles += 'color: #000;'; // Default color
    }

    if (object.bg) {
      cssStyles += `background-color: ${object.bg};`;
    }

    if (object.b) {
      cssStyles += 'font-weight: bold;';
    }

    if (object.i) {
      cssStyles += 'font-style: italic;';
    }

    if (object.u) {
      cssStyles += 'text-decoration: underline;';
    }

    if (object.border) {
      cssStyles += `border: ${object.border};`;
    }

    // Add the formatted text and styles
    strings.push(`%c${object.text}`);
    styles.push(cssStyles);
  });

  // Use Function.prototype.apply to spread the arrays for console.log
  console.log(strings.join(''), ...styles);
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * **
 * @description This function uses the `logc` function to logs styled debug messages to the console.
 * @param {object} name - name of the logger and styling
 * @param {string} action - The action being performed.
 * @param {string} message - The message to be logged.
 * @param {any} args - The arguments to be logged.
 * @param {object} config - The configuration object.
 * @param {boolean} [trace=false] - Whether to include the stack trace.
 * @returns {void}
 *
 * @example
 *  // log message with default styling and meta
 *  logd( { name: 'logd' }, 'action', 'message' );
 *
 *  // log message with custom styling, meta, and stack trace
 *  logd(
 *      { name: 'logd', color: '#fff', bg: '#7A5ACF', logname: '🐼', logcolor: white },
 *      action,
 *      message,
 *      args,
 *      trace = true
 *  );
 */

function logd(name, action, message, args, trace = false) {

  if (args === null) {
    args = '';
  } else {
    args = JSON.stringify(args);
  }

  // check name object and set defaults
  // TODO: add styling for message color and action
  // TODO: add styling for json!optional and args
  // NOTE: keep or remove stack trace as from within console. line number is provide by console output
  if (!name.name) {
    name.name = 'logd';
  }
  if (!name.color) {
    name.color = '#fff';
  }
  if (!name.bg) {
    name.bg = '#7A5ACF';
  }
  if (!name.logname) {
    name.logname = '⊖ logd';
  }
  if (!name.logcolor) {
    name.logcolor = 'white';
  }
  if (!name.logbg) {
    name.logbg = '#DD3224';
  }

  const traceString = new Error().stack
    .split('\n')
    .slice(1)
    .map((line) => line.trim())
    .join(' ▷ ');

  const styles = [
    {
      text: `${' ' + name.logname + ' ' || ' debug '}`,
      c: `${name.logcolor || 'lightgreen'}`,
      bg: `${name.logbg || '#DD3224'}`,
      b: true,
    },
    { text: ` ${name.name || 'logd'} `, c: name.color || '#fff', bg: name.bg || '#7A5ACF' },
    { text: ' ▷ ', c: 'magenta' },
    { text: action, c: 'lightgreen' },
    { text: ' • ', c: 'magenta' },
    { text: message, c: 'white' },
  ];

  if (args) {
    styles.push({ text: ' • ', c: 'magenta' });
    styles.push({ text: ' { ', c: 'magenta' });
    styles.push({ text: `${args}`, c: 'white' });
    styles.push({ text: ' }', c: 'magenta' });
  }

  // Output to console with styling
  logc(styles);

  if (trace) {
    logc([
      { text: ' • ', c: 'magenta' },
      { text: traceString, c: 'white' },
    ]);
  }

  // Store for debug bar
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: 'debug',
    name: name.name || 'logd',
    action: action,
    message: message,
    args: args,
    trace: trace ? traceString : null,
    styles: styles,
  };

  // Store in localStorage
  try {
    const debugLog = JSON.parse(window.localStorage.getItem('_debug_log') || '[]');
    debugLog.push(logEntry);

    // Keep only last 100
    if (debugLog.length > 100) {
      debugLog.shift();
    }

    localStorage.setItem('_debug_log', JSON.stringify(debugLog));

    // Dispatch event for real-time update
    // NOTE: This requires an event listener elsewhere in snailtrail debug bar or other event consumers
    window.dispatchEvent(new CustomEvent('debuglog', { detail: logEntry }));
  } catch (e) {
    console.error('Failed to store debug log:', e);
  }
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * **
* @function logdrl(filter)
* @description This function filters the debug log based on the provided filter object.
* @param {object} filter - The filter object.

* @properties { }
* @property {string} filter.name - The name of the logger.
* @property {string} [filter.message] - The message of the log.
* @property {string} [filter.action] - The action of the log.
* @property {string[]} [filter.args] - The arguments of the log.
* @returns {void}
*
* @example
*  // filter by name
*  logdrl({ name: 'logd' });
*  // filter by message
*  logdrl({ message: 'message' });
*  // filter by action
*  logdrl({ action: 'action' });
*  // filter by args
*  logdrl({ args: ['arg1', 'arg2'] });
*  // filter by multiple fields
*  logdrl({ name: 'logd', message: 'message', action: 'action', args: ['arg1', 'arg2'] });
*/

function logdrl(filter = {}) {
  let log_messages = JSON.parse(localStorage.getItem('_debug_log') || '[]');

  // Normalize filters
  const filter_name = typeof filter.name === 'string' ? filter.name.toLowerCase() : null;
  const filter_message = typeof filter.message === 'string' ? filter.message.toLowerCase() : null;
  const filter_action = typeof filter.action === 'string' ? filter.action.toLowerCase() : null;
  const filter_args = Array.isArray(filter.args) ? filter.args : null;

  // Apply filtering only for fields that exist
  log_messages = log_messages.filter((log) => {
    const name = (log.name || '').toLowerCase();
    const message = (log.message || '').toLowerCase();
    const action = (log.action || '').toLowerCase();
    const args = Array.isArray(log.args) ? log.args : [];

    // Only match if the filter field exists
    if (filter_name && !name.includes(filter_name)) {
      return false;
    }
    if (filter_message && !message.includes(filter_message)) {
      return false;
    }
    if (filter_action && !action.includes(filter_action)) {
      return false;
    }

    // args filter: ALL filter args must be in log.args
    if (filter_args && !filter_args.every((a) => args.includes(a))) {
      return false;
    }

    return true;
  });

  // Output logs
  for (const log of log_messages) {
    logc(log.styles);
  }
}

/** *********************EXPORTS************************* */
// Attach to the window object
if (typeof window !== 'undefined') {
  window.logc = logc;
  window.logd = logd;
  window.logdrl = logdrl;
}

// Export it using ES6 syntax for default export
export default { 
  logc, 
  logd, 
  logdrl 
};
