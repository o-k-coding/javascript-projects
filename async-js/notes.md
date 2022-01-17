# Async JS

## JS Engine

Call Stack and Message Queue

### Call Stack

Call stack gets execution contexts added, which are executed when added. As they are excuted they can add more execution contexts to the stack. Once the execution context on the top of the stack has completed, it is popped off of the stack, and the next one continues where it left off.

### Message Queue

A list of tasks to be executed. Each task represents a function to be executed at some point.

Certain things add to the message queue, event listeners in the browser, usage of readFile in node for example

JS engine checks periodically if there are any tasks in the queue. It will process the task completely before moving on (aka a blocking call)
In some scenarios though the work is done in a background worker process.

So for example, for readFile, the work will happen in a background process, and when complete, the callback supplied will be added to the message queue for the event loop to pick up when the call stack is next empty.

## Callbacks

functions are first class citizens, and are just objects

### Testing

Using mocha and chai

just install the two as dev deps

By default mocha will run anything in a `test` dir

## Promise

promise holds a value and a status

status can be in pending, resolved and rejected state
the callback passed to the promise constructor is passed two params
resolve and reject. Call these functions to change the status, and to set the value
to whatever you pass to the function

when the promise state is resolved or rejected, the state cannot be changed.
