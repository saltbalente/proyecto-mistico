// Services rotation animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const serviceBorders = document.querySelectorAll('.service-border');
  let isScrolling = false;
  let scrollTimeout;

  function handleScroll() {
    // Add fast rotation class when scrolling
    if (!isScrolling) {
      isScrolling = true;
      serviceBorders.forEach(border => {
        border.classList.add('fast-rotate');
      });
    }

    // Clear the timeout
    clearTimeout(scrollTimeout);

    // Set a timeout to remove fast rotation when scrolling stops
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      serviceBorders.forEach(border => {
        border.classList.remove('fast-rotate');
      });
    }, 150); // Wait 150ms after scroll stops
  }

  // Add scroll event listener with throttling
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Optional: Add intersection observer for better performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const border = entry.target.querySelector('.service-border');
        if (border) {
          if (entry.isIntersecting) {
            // Element is visible, enable scroll animation
            border.style.animationPlayState = 'running';
          } else {
            // Element is not visible, pause animation for performance
            border.style.animationPlayState = 'paused';
          }
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });
  }
});