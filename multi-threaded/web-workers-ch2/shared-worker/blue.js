console.log("blue.js");

const worker = new SharedWorker("shared-worker.js", "sharedWorkerExample");

worker.port.onmessage = (event) => {
  console.log("EVENT IN BLUE", event.data);
};

// When the window is being closed, dispatch a message to close the port
window.addEventListener("beforeunload", () => {
  worker.port.postMessage("close");
});
