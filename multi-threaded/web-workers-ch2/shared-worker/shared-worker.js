const ID = Math.floor(Math.random() * 999999);

console.log("shared-worker.js", ID);

const ports = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  // Keep track of the ports connected for multicasting
  ports.add(port);
  console.log("CONNECTED PORTS", ID, ports.size);

  port.onmessage = (event) => {
    console.log("MESSAGE", ID, event.data);

    if (event.data === "close") {
      ports.delete(port);
      return;
    }

    // Dispatch the message to all connected ports
    for (let p of ports) {
      p.postMessage([ID, event.data]);
    }
  };
};
