// ==========================================
// Abrahams Daughters - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initChatWidget();
  initForms();
  initGalleryModal();
  initDonationAmounts();
  initDonateForm();
});

// ==========================================
// Mobile Menu
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
      });
    });
  }
}

// ==========================================
// Chat Widget
// ==========================================
function initChatWidget() {
  const toggle = document.getElementById('chatToggle');
  const window = document.getElementById('chatWindow');
  const close = document.getElementById('chatClose');
  
  if (toggle && window) {
    toggle.addEventListener('click', function() {
      window.classList.toggle('open');
    });
    
    if (close) {
      close.addEventListener('click', function() {
        window.classList.remove('open');
      });
    }
  }
}

// ==========================================
// Forms
// ==========================================
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm(contactForm, '/api/contact', 'Message sent successfully!');
    });
  }
  
  // Help Request Form
  const helpForm = document.getElementById('helpRequestForm');
  if (helpForm) {
    helpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm(helpForm, '/api/help-request', 'Request submitted successfully!');
    });
  }
  
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm(newsletterForm, '/api/newsletter', 'Successfully subscribed!');
    });
  }
  
  // Donation Form
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const amount = document.querySelector('.amount-btn.selected');
      const customAmount = document.getElementById('customAmount');
      
      let donationAmount = 0;
      if (amount && !amount.dataset.custom) {
        donationAmount = parseInt(amount.textContent.replace('$', ''));
      } else if (customAmount) {
        donationAmount = parseInt(customAmount.value) || 0;
      }
      
      if (donationAmount < 1) {
        showToast('Please select or enter a donation amount.', 'error');
        return;
      }
      
      const formData = new FormData(donationForm);
      const data = {
        amount: donationAmount,
        frequency: formData.get('frequency') || 'one-time',
        donor: {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          anonymous: formData.get('anonymous') === 'on'
        }
      };
      
      submitJSON('/api/donations', data, 'Thank you for your donation!', donationForm);
    });
  }
}

function submitForm(form, endpoint, successMessage) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach(function(value, key) {
    data[key] = value;
  });
  
  // Combine firstName and lastName into name for contact form
  if (data.firstName && data.lastName) {
    data.name = data.firstName + ' ' + data.lastName;
    delete data.firstName;
    delete data.lastName;
  }
  
  submitBtn.classList.add('loading');
  
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (response.ok) {
      showToast(successMessage, 'success');
      form.reset();
    } else {
      throw new Error('Request failed');
    }
  })
  .catch(function(error) {
    showToast('Something went wrong. Please try again.', 'error');
  })
  .finally(function() {
    submitBtn.classList.remove('loading');
  });
}

function submitJSON(endpoint, data, successMessage, form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (response.ok) {
      showToast(successMessage, 'success');
      form.reset();
      // Reset amount selection
      document.querySelectorAll('.amount-btn').forEach(function(btn) {
        btn.classList.remove('selected');
      });
      const defaultBtn = document.querySelector('.amount-btn[data-amount="100"]');
      if (defaultBtn) defaultBtn.classList.add('selected');
    } else {
      throw new Error('Request failed');
    }
  })
  .catch(function(error) {
    showToast('Something went wrong. Please try again.', 'error');
  })
  .finally(function() {
    submitBtn.classList.remove('loading');
  });
}

// ==========================================
// Toast Notifications
// ==========================================
function showToast(message, type) {
  // Remove existing toast
  const existing = document.querySelector('.toast-container');
  if (existing) existing.remove();
  
  // Create new toast
  const container = document.createElement('div');
  container.className = 'toast-container';
  
  const toast = document.createElement('div');
  toast.className = 'toast show ' + (type || '');
  toast.textContent = message;
  
  container.appendChild(toast);
  document.body.appendChild(container);
  
  // Remove after 4 seconds
  setTimeout(function() {
    container.remove();
  }, 4000);
}

// ==========================================
// Gallery Modal
// ==========================================
function initGalleryModal() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('galleryModal');
  
  if (!modal || galleryCards.length === 0) return;
  
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');
  const modalImage = modal.querySelector('.modal-image');
  const modalTitle = modal.querySelector('.modal-title');
  const modalCategory = modal.querySelector('.modal-category');
  
  let currentIndex = 0;
  const items = [];
  
  galleryCards.forEach(function(card, index) {
    items.push({
      title: card.querySelector('h3').textContent,
      category: card.querySelector('p').textContent,
      gradient: card.querySelector('.gallery-image').style.background,
      icon: card.querySelector('.gallery-image').innerHTML
    });
    
    card.addEventListener('click', function() {
      currentIndex = index;
      updateModal();
      modal.classList.add('open');
    });
  });
  
  function updateModal() {
    const item = items[currentIndex];
    modalImage.style.background = item.gradient;
    modalImage.innerHTML = item.icon;
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category;
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('open');
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateModal();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % items.length;
      updateModal();
    });
  }
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

// ==========================================
// Donation Amount Selection
// ==========================================
function initDonationAmounts() {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customAmount');
  
  if (amountBtns.length === 0) return;
  
  amountBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      amountBtns.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      
      if (btn.dataset.custom && customInput) {
        customInput.focus();
      }
    });
  });
  
  if (customInput) {
    customInput.addEventListener('focus', function() {
      amountBtns.forEach(function(b) { b.classList.remove('selected'); });
      const customBtn = document.querySelector('.amount-btn[data-custom]');
      if (customBtn) customBtn.classList.add('selected');
    });
  }
}

// ==========================================
// Donate Page (Stripe Checkout)
// ==========================================
function initDonateForm() {
  var donateForm = document.getElementById('donateForm');
  if (!donateForm) return;

  var amountBtns = document.querySelectorAll('.donate-amount-btn');
  var customAmountInput = document.getElementById('donateCustomAmount');
  var selectedAmount = 50;

  amountBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      amountBtns.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      selectedAmount = parseFloat(btn.dataset.amount);
      if (customAmountInput) customAmountInput.value = '';
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      if (customAmountInput.value) {
        amountBtns.forEach(function(b) { b.classList.remove('selected'); });
        selectedAmount = 0;
      }
    });
    customAmountInput.addEventListener('focus', function() {
      amountBtns.forEach(function(b) { b.classList.remove('selected'); });
      selectedAmount = 0;
    });
  }

  donateForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var errorEl = document.getElementById('donateError');
    var submitBtn = document.getElementById('donateSubmitBtn');
    errorEl.style.display = 'none';

    var amount = selectedAmount;
    if (customAmountInput && customAmountInput.value) {
      amount = parseFloat(customAmountInput.value);
    }

    if (!amount || amount < 1) {
      errorEl.textContent = 'Please enter a valid donation amount (minimum $1).';
      errorEl.style.display = 'block';
      return;
    }

    var name = document.getElementById('donateName').value.trim();
    var email = document.getElementById('donateEmail').value.trim();
    var message = document.getElementById('donateMessage').value.trim();
    var recurring = document.getElementById('donateRecurring').checked;

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.style.display = 'block';
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount, name: name, email: email, message: message, recurring: recurring })
    })
    .then(function(response) {
      return response.json().then(function(data) {
        if (!response.ok) throw new Error(data.message || 'Something went wrong');
        return data;
      });
    })
    .then(function(data) {
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    })
    .catch(function(err) {
      errorEl.textContent = err.message || 'Failed to start checkout. Please try again.';
      errorEl.style.display = 'block';
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    });
  });
}
