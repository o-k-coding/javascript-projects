navigator.serviceWorker.register('/sw.js', {
  scope: '/', // directory for the origin, relative to the index.html, defaults to the dir the sw is loaded from
  // so in this case what we defined would be the same as the default
});

// listen to all events where the sw takes control of a page that is loaded in the scope of the sw
navigator.serviceWorker.oncontrollerchange = () => {
  console.log('Controller change');
};

async function makeRequest() {
  const result = await fetch('/data.json');
  const payload = await result.json();
  console.log('payload', payload);
}
