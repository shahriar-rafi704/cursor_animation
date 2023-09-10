// script.js
const cursor = document.querySelector('.custom-cursor');
const images = document.querySelectorAll('.image');

let currentImageIndex = 0;
let isAutoCycleEnabled = true;

function moveCursor(event) {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
}

function changeCursorColor(event) {
    const target = event.target;
    if (target.classList.contains('image')) {
        cursor.style.borderColor = 'transparent'; // No border for images
    } else {
        cursor.style.borderColor = '#000'; // Default cursor color
    }
}

function fadeOutImage(image) {
    image.style.transition = 'opacity 0.5s ease-in-out'; // Add fade-out transition
    image.style.opacity = '0'; // Fade out the image
}

function fadeInImage(image) {
    image.style.transition = 'opacity 0.5s ease-in-out'; // Add fade-in transition
    image.style.opacity = '1'; // Fade in the image
}

function moveImages() {
    images.forEach((image, index) => {
        const angle = (currentImageIndex + index) * 45; // Adjust rotation angle
        const radius = 150; // Adjust this value for the desired radius
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        image.style.transition = 'transform 5s linear'; // Adjust the duration for slower movement
        image.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function cycleImages() {
    fadeOutImage(images[currentImageIndex]); // Fade out the current image

    currentImageIndex = (currentImageIndex + 1) % images.length; // Cycle through images

    fadeInImage(images[currentImageIndex]); // Fade in the next image

    moveImages(); // Move images continuously
}

document.addEventListener('mousemove', moveCursor);
document.addEventListener('mouseover', changeCursorColor);

// Initially, all images are displayed
images.forEach((image, index) => {
    if (index !== 0) {
        fadeOutImage(image);
    }
});

// Add a click event listener to toggle images
document.addEventListener('click', () => {
    if (isAutoCycleEnabled) {
        isAutoCycleEnabled = false;
    }
    cycleImages(); // Change images when clicked
});

// Start continuous image movement
setInterval(() => {
    if (isAutoCycleEnabled) {
        cycleImages();
    }
}, 5000); // Adjust the interval for slower movement