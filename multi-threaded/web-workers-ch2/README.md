# Web Workers

run with `npx server .`

## Dedicated Workers

Web workers use `self` as a global this, which is a WorkerGlobalScope instance
this exposes an `importScripts` function, which cam load scripts synchronously

workers have access to many apis, including localstorage and indexedDB, but do not have access to the DOM.

instantiating a worker can take options with the following props

- type - specifies how the JS will be loaded
  - `classic` for a js file,
  - `module` for an ESM (ECMAScript module)
- credentials - determines if http credentials are sent with the request for the worker file
  - `omit` to leave out creds
  - `same-origin` to send creds if the origin matches
  - `include` to always send creds
  - `name` to give the worker a global name

### worker.jsResults

```text
Hello from main js main.js:1:9 <- this is the first call added to the "stack" the event loop gets
Goodbye from main js main.js:18:9 <- this happens next, because the worker file is being downloaded so the event loop will pick that up when it is ready and free
Hello from worker js worker.js:1:9 <- this runs first in the worker
message to worker message sent to worker worker.js:5:11 <- the message to the worker is received and handled in the worker
message received from worker message sent from worker <- the message from the worker is received and handled
```

All the console logs are output in the same console, interested to know why, probably because the browser exposes that as a single global implementation it doesn't really have to do with your specific
JS environment

## Shared Workers

shared workers can be accessed by different browser environments (including different windows/tabs)
and even across iframes and different web workers

`self` is an instance of SharedWorkerGlobalScore

again can only be accessed by JS on the same origin

(currently disabled in safari, so no iOS devices then)

Note that shared workers don't belong to a window, so if one window spawns a shared worker, closing the window doesn't remove the worker, where a dedicated worker would be removed.

So where does console.log end up?
So something I am picking up is that a window shares a console environment, which is why all the console.logs show up in the same place with dedicated workers.

Firefox uses the original window that created the shared worker.
Chrome does not show shared worker logs at all, so you would need to listen for messages and log them in a main thread. (I am assuming each window gets a main thread and event loop)

### Debugging shared workers
