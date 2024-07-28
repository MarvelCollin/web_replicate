const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-container img');
let currentIndex = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  const offset = -currentIndex * 100;
  carouselContainer.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 3000); 
