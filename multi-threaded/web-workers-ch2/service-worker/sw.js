let counter = 0; // In reality the SW shouldn't persist state since they can start/stop unpredictably

// Runs first time this file is installed as a SW in the browser
// This can be useful for instantiating things like caches using indexedDB or self.caches
self.oninstall = (event) => {
  console.log('service worker install');
};

// this is run whenever a new version of the sw is activated
// can be useful for cleaning things up (tearing down old caches)
self.onactivate = (event) => {
  console.log('service worker activate');
  // Sets up ownership of the page (index.html) that activated this sw
  // event wait until can be used to simulate async since service worker callbacks do not support async/await
  event.waitUntil(self.clients.claim());
};

// intercept http requests
// this does not only work with fetch, example loading an asset will also pass through here
self.onfetch = (event) => {
  console.log('fetch', event.request.url);

  if (event.request.url.endsWith('/data.json')) {
    counter++;

    event.respondWith(
      new Response(JSON.stringify(counter), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    return;
  }

  event.respondWith(fetch(event.request));
};
