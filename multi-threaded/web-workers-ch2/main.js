console.log("Hello from main js");

// JS engine downloads or checks cache for this file
// in a browser, this file must be in the same origin as the main JS enviroment
// Also the browser won't allow workers to run when executing from the file system, it must be served
const worker = new Worker("worker.js");

// Attache event handler for messages from the worker
// This function will run in the main thread
worker.onmessage = (msg) => {
  // msg is of type MessageEvent
  // .data contains the value returned from the worker
  console.log("message received from worker", msg.data);
};

worker.postMessage("message sent to worker");

console.log("Goodbye from main js");
