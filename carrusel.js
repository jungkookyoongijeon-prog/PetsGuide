let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoPlayInterval;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index === currentSlide) {
      slide.classList.add('active');
    } else if (index < currentSlide) {
      slide.classList.add('prev');
    }
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
  
  // Reiniciar animación de progreso
  const progressFill = document.querySelector('.progress-fill');
  progressFill.style.animation = 'none';
  setTimeout(() => {
    progressFill.style.animation = 'progressAnim 5s linear infinite';
  }, 10);
}

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  updateSlides();
  resetAutoPlay();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlides();
  resetAutoPlay();
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Iniciar autoplay
resetAutoPlay();

// Pausar en hover
document.querySelector('.custom-carousel').addEventListener('mouseenter', () => {
  clearInterval(autoPlayInterval);
});

document.querySelector('.custom-carousel').addEventListener('mouseleave', () => {
  resetAutoPlay();
});