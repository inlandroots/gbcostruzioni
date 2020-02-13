// ********** ASYNC LOADING BACKGROUND ****************
const ImageLoaderWorker = new Worker('/workers/image-loader.worker.js');

//ImageLoaderWorker.postMessage('*** Worker initialized! ***');

// Once again, it's possible that messages could be returned before the
// listener is attached, so we need to attach the listener before we pass
// image URLs to the web worker
ImageLoaderWorker.addEventListener('message', event => {
    // Grab the message data from the event
    const imageData = event.data;
  
    console.log(imageData.imageURL);
    // Get the original element for this image
    const imageElement = document.querySelectorAll("*[data-background='"+imageData.imageURL+"']")[0];
  
    // We can use the `Blob` as an image source! We just need to convert it
    // to an object URL first
    const objectURL = URL.createObjectURL(imageData.blob);
  
    // Once the image is loaded, we'll want to do some extra cleanup
    imageElement.onload = () => {
      // Let's remove the original `data-src` attribute to make sure we don't
      // accidentally pass this image to the worker again in the future
      imageElement.removeAttribute("data-background");
  
      // We'll also revoke the object URL now that it's been used to prevent the
      // browser from maintaining unnecessary references
      URL.revokeObjectURL(objectURL);
    };
  
    //imageElement.setAttribute('src', objectURL);

    imageElement.style.backgroundImage = "url(" + objectURL + ")";
});

document.addEventListener("DOMContentLoaded", function() {

    // Get all of the `<img>` elements that have a `data-background` property
    const backgroundImages = document.querySelectorAll('*[data-background]');

    // Loop over the image elements and pass their URLs to the web worker
    backgroundImages.forEach(imageElement => {
    const imageURL = imageElement.getAttribute('data-background');
        ImageLoaderWorker.postMessage(imageURL);
    });

});

// ********** LAZY LOADING ****************
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
            }
        });
        });

        lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to a more compatible method here
    }
});