# Service Worker

service workers are similar to shared workers, but are not attached to a single window
they can be associated with 0 to many pages.

primarily used for cache management of a website or SPA, often used to intercept network requests and return cached assets
very helpful in applications that support offline mode.

these can be disabled by the user, and can fail to install or be stopped by the browser
so don't make your application rely on them to work
If you only want mulithreading support, use the other web workers instead.

## Limits

no blocking requests, and no access to the DOM
can only run on https in browser, except via localhost

## Debugging

You can go to specific pages in chrome/firefox to inspect service workers
You can also go to the Applications panel in dev tools to see service workers and unregister them
