console.log("Hello from worker js");

// self is the global "this" in the worker
self.onmessage = (msg) => {
  console.log("message to worker", msg.data);

  // The msg.data in any listener will be this string
  postMessage("message sent from worker");
};
