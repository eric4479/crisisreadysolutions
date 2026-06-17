document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set active navigation item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Form validation and submission to /api/contact
  const forms = document.querySelectorAll('form.needs-validation');

  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form fields
      const nameField = this.querySelector('[name="name"]');
      const emailField = this.querySelector('[name="email"]');
      const messageField = this.querySelector('[name="message"]');

      // Simple validation
      let isValid = true;

      if (nameField && nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name');
        isValid = false;
      } else if (nameField) {
        removeError(nameField);
      }

      if (emailField) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === '') {
          showError(emailField, 'Please enter your email');
          isValid = false;
        } else if (!emailPattern.test(emailField.value)) {
          showError(emailField, 'Please enter a valid email address');
          isValid = false;
        } else {
          removeError(emailField);
        }
      }

      if (messageField && messageField.value.trim() === '') {
        showError(messageField, 'Please enter your message');
        isValid = false;
      } else if (messageField) {
        removeError(messageField);
      }

      if (isValid) {
        // Submit via fetch to serverless endpoint
        const formData = new FormData(this);
        const payload = Object.fromEntries(formData.entries());

        try {
          const resp = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!resp.ok) throw new Error('Network response was not ok');

          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success mt-3';
          successMessage.textContent = 'Thank you! Your request has been submitted. We will contact you soon.';

          this.reset();
          this.appendChild(successMessage);
          setTimeout(() => successMessage.remove(), 5000);
        } catch (err) {
          const errorMessage = document.createElement('div');
          errorMessage.className = 'alert alert-danger mt-3';
          errorMessage.textContent = 'Submission failed. Please try again later.';
          this.appendChild(errorMessage);
          setTimeout(() => errorMessage.remove(), 5000);
        }
      }
    });
  });

  function showError(field, message) {
    // Remove any existing error
    removeError(field);

    // Add error class
    field.classList.add('is-invalid');

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;

    // Insert error message after field
    field.parentNode.appendChild(errorDiv);
  }

  function removeError(field) {
    field.classList.remove('is-invalid');

    // Remove error message if exists
    const errorMessage = field.parentNode.querySelector('.invalid-feedback');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  // Initialize any tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (typeof bootstrap !== 'undefined') {
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
});

// Enhanced image loading with lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  // Create loading placeholder
  const createLoadingPlaceholder = (img) => {
    const placeholder = document.createElement('div');
    placeholder.style.width = img.offsetWidth + 'px';
    placeholder.style.height = img.offsetHeight + 'px';
    placeholder.style.backgroundColor = '#f0f0f0';
    placeholder.style.borderRadius = '10px';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    return placeholder;
  };

  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.add('loaded');
      });
      img.addEventListener('error', function() {
        img.style.display = 'none';
      });
    }
  });

  // Performance optimization: Debounce scroll events
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(revealOnScroll);
      ticking = true;
      setTimeout(() => { ticking = false; }, 10);
    }
  }
  
  window.addEventListener('scroll', updateOnScroll, { passive: true });
});

// Enhanced scroll animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add intersection observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Observe all animation elements
document.addEventListener('DOMContentLoaded', function() {
  const animationElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');
  animationElements.forEach(el => observer.observe(el));
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Mailto button: open user's email client with prefilled message
document.addEventListener('DOMContentLoaded', function() {
  const mailtoBtn = document.getElementById('mailtoBtn');
  const form = document.getElementById('scheduleForm');
  if (mailtoBtn && form) {
    mailtoBtn.addEventListener('click', function() {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const to = 'info@crisisreadysolutions.com';
      const subject = `Training Request: ${data.name || ''} - ${data.service || ''}`;
      let body = '';
      body += `Name: ${data.name || ''}\n`;
      body += `Email: ${data.email || ''}\n`;
      body += `Phone: ${data.phone || ''}\n`;
      body += `Organization: ${data.organization || ''}\n`;
      body += `Service: ${data.service || ''}\n`;
      body += `Group Size: ${data.groupSize || ''}\n`;
      body += `Preferred Date: ${data.preferredDate || ''}\n`;
      body += `Alternate Date: ${data.alternateDate || ''}\n\n`;
      body += `Message:\n${data.message || ''}\n\n`;
      body += `I agree to be contacted: ${data.terms ? 'Yes' : 'No'}`;
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});