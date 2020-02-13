// The `message` event is fired in a web worker any time `worker.postMessage(<data>)` is called.
// `event.data` represents the data being passed into a worker via `worker.postMessage(<data>)`.

// I'm making the event handler `async` to make my life easier. If
// you're not compiling your code, you may want to use the Promise-based
// API of `fetch`
self.addEventListener('message', async event => {
    // Grab the imageURL from the event - we'll use this both to download
    // the image and to identify which image elements to update back in the
    console.log('Worker received:', event.data);

    let _start = Date.now();

    console.log(event.data, " downloaded!");

    // UI thread
    const imageURL = event.data;
  
    // First, we'll fetch the image file
    const response = await fetch(imageURL);
  
    // Once the file has been fetched, we'll convert it to a `Blob`
    const fileBlob = await response.blob();

    let _end = Date.now();

    console.log(event.data, " downloaded in ", _end - _start, "milliseconds");

    // Send the image data to the UI thread!
    self.postMessage({
        imageURL: imageURL,
        blob: fileBlob,
    });

  });