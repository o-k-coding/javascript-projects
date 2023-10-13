# Node Cluster, PM2 RabbitMQ, Redis and NGINX course

Following this course <https://okta.udemy.com/course/node-js-cluster>

## Node operations

### Non blocking

math and processing logic

L1.L2,L3 cache ops
RAM ops

### Blocking

DB, file io, networking

Disk
Network

### Cluster Module

Take advantage of multi-core system to create child processes that share server port.

Use the fork method, can communicate back and forth with parent via IPC.

Round robin (default except windows) where master listens on port, and distributes them across workers in a round robin way.

Second method (no name?) master creates listen socket and sends to "interested" workers. Workers accept incoming connections directly.
Does this mean the workers ask for it when they are ready, and release it when they have something to work on?

Would like to look into this more.

basically a key piece of info here is that cluster mode is using multiple node processes.
other methods use worker threads rather than a process, which is lower overhead. Additionally using threads allows for sharing memory via buffers.

it might be fun to write this using worker threads and cluster mode and see the differences.
