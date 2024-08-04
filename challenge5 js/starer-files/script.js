const images = [
  'img/image1.jpg',
  'img/image2.jpg',
  'img/image3.jpg',
  'img/image4.jpg',
];

let currentIndex = 0;

const imageDisplay = document.getElementById('imageDisplay');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// updates the displayed image and buttons
function updateImage() {
  imageDisplay.src = images[currentIndex];
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === images.length - 1;
}

// Event listeners -->>> buttons
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
});

// Event listeners ---->> keyboard events
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateImage();
  } else if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
});

updateImage();
