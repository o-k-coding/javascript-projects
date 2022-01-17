console.log("red.js");

// second argument is the name. Using a different name from other files would create a new worker
// These are keyed by url and by name
const worker = new SharedWorker("shared-worker.js", "sharedWorkerExample");

worker.port.onmessage = (event) => {
  console.log("EVENT IN RED", event.data);
};

// When the window is being closed, dispatch a message to close the port
// this isn't perfect because we can't guarantee this will always close down
// one method could be polling from the worker and deleting the port on a timeout
window.addEventListener('beforeunload', () => {
  worker.port.postMessage('close');
});
