// import * as Sentry from '@sentry/node';
// // const Tracing = require('@sentry/tracing');

// Sentry.init({
// 	dsn: 'https://c68d5ef42e134fa492caa2a45f651fae@o4504525083115521.ingest.sentry.io/4504525084426240'

// 	// Set tracesSampleRate to 1.0 to capture 100%
// 	// of transactions for performance monitoring.
// 	// We recommend adjusting this value in production
// 	// tracesSampleRate: 1.0,
// });

// export function handleError({ error, event }) {
// 	console.log('error: ' + error);
// 	console.log('event: ' + event);
// 	// example integration with https://sentry.io/
// 	Sentry.captureException(error, { event });

// 	return {
// 		message: 'Whoops!',
// 		code: error?.code ?? 'UNKNOWN'
// 	};
// }
