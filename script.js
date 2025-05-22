document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
  
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  
    // Hero slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-nav.prev');
    const nextBtn = document.querySelector('.hero-nav.next');
    let currentSlide = 0;
    let slideInterval;
  
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Deactivate all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and activate the corresponding dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    // Initialize slider
    showSlide(currentSlide);
  
    // Start automatic slideshow
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000);
    }
  
    function stopSlideshow() {
      clearInterval(slideInterval);
    }
  
    startSlideshow();
  
    // Event listeners for navigation
    prevBtn.addEventListener('click', function() {
      stopSlideshow();
      prevSlide();
      startSlideshow();
    });
  
    nextBtn.addEventListener('click', function() {
      stopSlideshow();
      nextSlide();
      startSlideshow();
    });
  
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        stopSlideshow();
        currentSlide = index;
        showSlide(currentSlide);
        startSlideshow();
      });
    });
  
    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxCategory = document.querySelector('.lightbox-category');
    const lightboxClose = document.querySelector('.lightbox-close');
  
    // Gallery data
    const galleryData = [
      {
        id: 1,
        src: "placeholder.svg",
        alt: "Formación militar de estudiantes",
        category: "Formación"
      },
      {
        id: 2,
        src: "placeholder.svg",
        alt: "Actividades deportivas",
        category: "Deportes"
      },
      {
        id: 3,
        src: "placeholder.svg",
        alt: "Laboratorio de ciencias",
        category: "Académico"
      },
      {
        id: 4,
        src: "placeholder.svg",
        alt: "Ceremonia de banderas",
        category: "Ceremonias"
      },
      {
        id: 5,
        src: "placeholder.svg",
        alt: "Actividades culturales",
        category: "Cultura"
      },
      {
        id: 6,
        src: "placeholder.svg",
        alt: "Instalaciones del colegio",
        category: "Instalaciones"
      }
    ];
  
    function openLightbox(id) {
      const item = galleryData.find(item => item.id === id);
      if (item) {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxTitle.textContent = item.alt;
        lightboxCategory.textContent = item.category;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        openLightbox(id);
      });
    });
  
    lightboxClose.addEventListener('click', closeLightbox);
  
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  });