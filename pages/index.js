// This file (pages/index.js) has been intentionally modified
// to resolve a routing conflict with app/page.tsx for the root path (/).
// The App Router (app/page.tsx) is now serving the root page.
//
// If the Pages Router is no longer intended for use in your project,
// you can safely delete this 'pages' directory and its contents.

// To ensure this file does not act as a page, it does not export a default React component.
const message = "This Pages Router file (pages/index.js) is currently inactive for the root route due to a conflict with App Router's app/page.tsx.";
console.warn(message);

// You can export non-component values if needed for other purposes,
// but no default React component export.
export const inactivePageMessage = message;
