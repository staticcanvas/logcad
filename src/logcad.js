/**
 * @description This function logs styled messages to the console. It takes an array of objects, where each object specifies the text and optional style properties to apply.
 * @param {Array<Object>} objectArray - Array of objects defining the text and style properties for each message.
 * @returns {void}
 * -------------
 * @Properties
 * @param {Array<Object>} objectArray[].text - description
 * @param {string} objectArray[].text - The text to be logged.
 * @param {string} [objectArray[].c="#000"] - The color of the text. Default is black.
 * @param {string} [objectArray[].bg="transparent"] - The background color of the text. Default is transparent.
 * @param {boolean} [objectArray[].b=false] - Whether the text should be bold. Default is false.
 * @param {boolean} [objectArray[].i=false] - Whether the text should be italic. Default is false.
 * @param {boolean} [objectArray[].u=false] - Whether the text should be underlined. Default is false.
 * @param {string} [objectArray[].border="none"] - The border style of the text. Default is none.
 *
 * @example

 *  logc([
 *       { text: "This is the first log message", c: "blue", bg: "green", u: true, b: false, i: true },
 *       { text: "And this is another message", c: "red", bg: "yellow", b: true, u: true },
 *       { text: "And this is another message", c: "red", border: "1px solid red" },
 *   ]);
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


/**
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
*  logd(
*      { name: 'logd' },
*      'action',
*      'message',
*      {args},
*      trace = false
*  );
*  logd({ name: 'logd', color: '#fff', bg: '#7A5ACF', logname: '🐼', logcolor: white }, action, message, args, trace = false);
*/

function logd(name, action, message, args, trace = false) {
    if (args === null) {
        args = '';
    } else {
        args = JSON.stringify(args);
    }

    // check name object and set defaults
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
        name.logname = '🐼logd';
    }
    if (!name.logcolor) {
        name.logcolor = 'white';
    }
    if (!name.logbg) {
        name.logbg = '#DD3224';
    }

    const traceString = new Error().stack.split('\n').slice(1)
        .map(line => line.trim()).join(' ▷ ');

    const styles = [
        { text: `${' ' + name.logname + ' ' || ' debug '}`, c: `${name.logcolor || 'lightgreen'}`, bg: `${name.logbg || '#DD3224'}`, b: true },
        { text: ` ${name.name || 'logd'} `, c: name.color || '#fff', bg: name.bg || '#7A5ACF' },
        { text: ' ▷ ', c: 'magenta' },
        { text: action, c: 'lightgreen' },
        { text: ' • ', c: 'magenta' },
        { text: message, c: 'white' }
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
            { text: traceString, c: 'white' }
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
        styles: styles
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


/** *********************EXPORTS************************* */
// Attach to the window object
if (typeof window !== 'undefined') {
    window.logc = logc;
    window.logd = logd;
}

// Export it using ES6 syntax for default export
export { logc, logd };
