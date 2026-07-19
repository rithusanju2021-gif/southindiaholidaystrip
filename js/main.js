// South Trails — Premium UI Interactivity

document.addEventListener('DOMContentLoaded', function () {

  // ── Inject Mobile Drawer Contact Shortcuts ──
  var linksDrawer = document.getElementById('nav-links');
  if (linksDrawer) {
    var shortcuts = document.createElement('div');
    shortcuts.className = 'drawer-shortcuts';
    shortcuts.innerHTML =
      '<p class="drawer-shortcuts-title">Quick Connect</p>' +
      '<div class="drawer-shortcuts-row">' +
      '<a href="tel:+919994445675" class="drawer-shortcut-btn call-btn" aria-label="Call Us">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z"/></svg> Call' +
      '</a>' +
      '<a href="https://wa.me/919994445675" target="_blank" rel="noopener" class="drawer-shortcut-btn wa-btn" aria-label="WhatsApp">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5s.2-.3.4-.4a1.6 1.6 0 0 0 .2-.4.4.4 0 0 0 0-.4c-.1-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.5 11.2 11.2 0 0 0 4.3 3.8c.6.2 1 .4 1.4.5a3.4 3.4 0 0 0 1.5.1 2.4 2.4 0 0 0 1.6-1.1 1.9 1.9 0 0 0 .1-1.1c-.1-.1-.2-.2-.4-.3Z"/></svg> WhatsApp' +
      '</a>' +
      '</div>';
    linksDrawer.appendChild(shortcuts);
  }

  // ── Sticky Nav Glass Effect ──
  var header = document.querySelector('.site-header');
  if (header) {
    // Header is always solid white — add scrolled class for consistent styling
    header.classList.add('scrolled');
    header.classList.remove('transparent');
  }

  // ── Mobile Nav ──
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var backdrop = document.querySelector('.nav-backdrop');
  if (toggle && links) {
    var navWrap = document.querySelector('.nav-wrap');

    function placeNavForViewport() {
      var isMobile = window.matchMedia('(max-width: 992px)').matches;
      if (isMobile) {
        if (links.parentElement !== document.body) {
          document.body.appendChild(links);
        }
      } else if (navWrap && links.parentElement !== navWrap) {
        navWrap.insertBefore(links, toggle);
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    }

    placeNavForViewport();
    window.addEventListener('resize', placeNavForViewport);

    function closeNav() {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (backdrop) backdrop.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });
    if (backdrop) backdrop.addEventListener('click', closeNav);
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeNav();
      });
    });
  }

  // ── Scroll Reveal (staggered) ──
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var staggerCounters = new WeakMap();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var i = staggerCounters.get(parent) || 0;
      el.style.setProperty('--reveal-i', i % 6);
      staggerCounters.set(parent, i + 1);
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  // ── Animated Counters ──
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var observed = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !observed) {
          observed = true;
          var start = performance.now();
          var duration = 2000;
          function tick(now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = (target * eased).toFixed(decimals);
            el.textContent = prefix + val + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // ── Hero Full-Width Slideshow ──
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-dots button');
  if (heroSlides.length) {
    var currentSlide = 0;
    var totalHero = heroSlides.length;
    function goSlide(i) {
      heroSlides.forEach(function (s) { s.classList.remove('active'); });
      heroDots.forEach(function (d) { d.classList.remove('active'); });
      currentSlide = (i + totalHero) % totalHero;
      heroSlides[currentSlide].classList.add('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
    }
    goSlide(0);
    setInterval(function () { goSlide(currentSlide + 1); }, 5000);
    heroDots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { goSlide(idx); });
    });
  }

  // ── Legacy Slider (if present) ──
  var slidesEl = document.querySelector('.slides');
  if (slidesEl) {
    var slideImgs = slidesEl.querySelectorAll('img');
    var slideIdx = 0;
    var slideTotal = slideImgs.length;
    if (slideTotal > 0) {
      setInterval(function () {
        slideIdx = (slideIdx + 1) % slideTotal;
        slidesEl.style.transform = 'translateX(-' + (slideIdx * (100 / slideTotal)) + '%)';
      }, 4000);
    }
  }



  // ── FAQ Accordion ──
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var btn = item.querySelector('button');
    var panel = item.querySelector('.panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var p = other.querySelector('.panel');
          if (p) p.style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  // ── 3D Card Tilt ──
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    var maxTilt = 8;
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateX(' + (-y * maxTilt).toFixed(2) + 'deg) rotateY(' + (x * maxTilt).toFixed(2) + 'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  // ── Package Filter with Animation ──
  var filterBtns = document.querySelectorAll('.pkg-filter');
  var pkgCards = document.querySelectorAll('[data-pkg-type]');
  if (filterBtns.length && pkgCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        var type = btn.getAttribute('data-filter');
        pkgCards.forEach(function (card, i) {
          var match = type === 'all' || card.getAttribute('data-pkg-type') === type;
          if (match) {
            card.style.display = '';
            card.classList.remove('filter-animate');
            void card.offsetWidth;
            card.classList.add('filter-animate');
            card.style.setProperty('--reveal-i', i % 6);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Auto-filter from URL parameter (e.g. ?filter=temple)
    var urlParams = new URLSearchParams(window.location.search);
    var filterParam = urlParams.get('filter');
    if (filterParam) {
      var matchBtn = document.querySelector('.pkg-filter[data-filter="' + filterParam + '"]');
      if (matchBtn) {
        matchBtn.click();
        // Scroll to packages section
        setTimeout(function () {
          var pkgSection = document.getElementById('packages');
          if (pkgSection) {
            pkgSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }

  // ── Web3Forms Email Delivery ──
  var WEB3FORMS_ACCESS_KEY = '291bf433-f755-4ef1-adcf-363423da9357';

  function sendToWeb3Forms(fields) {
    var formData = new FormData();
    Object.keys(fields).forEach(function (key) {
      if (fields[key] !== undefined && fields[key] !== null && fields[key] !== '') {
        formData.append(key, fields[key]);
      }
    });
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    }).then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, data: data };
      });
    });
  }

  // ── Form Validation Helpers ──
  function showError(input, message) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.add('has-error');
    var errorEl = field.querySelector('.error-msg');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-msg';
      field.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.remove('has-error');
    var errorEl = field.querySelector('.error-msg');
    if (errorEl) {
      errorEl.remove();
    }
  }

  function isValidPhone(phone) {
    var cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length >= 10;
  }

  function validateInput(input) {
    var isValid = true;
    var val = input.value.trim();

    if (input.id === 'bk-name' || input.id === 'ct-name') {
      if (!val) {
        showError(input, 'Full name is required');
        isValid = false;
      } else if (val.length < 2) {
        showError(input, 'Name must be at least 2 characters');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    else if (input.id === 'bk-phone' || input.id === 'ct-phone') {
      if (!val) {
        showError(input, 'Phone number is required');
        isValid = false;
      } else if (!isValidPhone(val)) {
        showError(input, 'Please enter a valid phone number (min 10 digits)');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    else if (input.id === 'bk-email' || input.id === 'ct-email') {
      if (!val) {
        showError(input, 'Email address is required');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    else if (input.id === 'bk-package') {
      if (!input.value) {
        showError(input, 'Please select a package type');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    else if (input.id === 'bk-travellers') {
      if (input.value !== '' && (parseInt(input.value, 10) < 1 || isNaN(parseInt(input.value, 10)))) {
        showError(input, 'Number of travellers must be 1 or more');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    else if (input.id === 'ct-msg') {
      if (!val) {
        showError(input, 'Message is required');
        isValid = false;
      } else if (val.length < 10) {
        showError(input, 'Message must be at least 10 characters');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    return isValid;
  }

  // Real-time validation on blur, input and change
  document.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('blur', function () {
      el.dataset.touched = 'true';
      validateInput(el);
    });

    el.addEventListener('input', function () {
      if (el.dataset.touched === 'true' || el.closest('.field').classList.contains('has-error')) {
        validateInput(el);
      }
    });

    el.addEventListener('change', function () {
      el.dataset.touched = 'true';
      validateInput(el);
    });
  });

  // ── Multi-Step Booking Wizard ──
  var bookForm = document.getElementById('booking-form');
  if (bookForm && bookForm.classList.contains('booking-wizard-form')) {
    var steps = bookForm.querySelectorAll('.booking-step');
    var progressSteps = document.querySelectorAll('.progress-step');
    var progressFill = document.querySelector('.progress-fill');
    var currentStep = 0;

    function updateProgress() {
      progressSteps.forEach(function (ps, i) {
        ps.classList.toggle('active', i === currentStep);
        ps.classList.toggle('done', i < currentStep);
      });
      if (progressFill) {
        var pct = steps.length > 1 ? (currentStep / (steps.length - 1)) * 80 : 0;
        progressFill.style.width = pct + '%';
      }
      steps.forEach(function (s, i) { s.classList.toggle('active', i === currentStep); });
    }

    function validateStep(stepIndex) {
      var isValid = true;
      var currentStepEl = steps[stepIndex];
      var inputs = currentStepEl.querySelectorAll('input, select, textarea');
      var firstInvalidInput = null;

      inputs.forEach(function (input) {
        input.dataset.touched = 'true';
        if (!validateInput(input)) {
          isValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = input;
          }
        }
      });

      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }

      return isValid;
    }

    bookForm.querySelectorAll('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (validateStep(currentStep)) {
          if (currentStep < steps.length - 1) {
            currentStep++;
            updateProgress();
            bookForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    bookForm.querySelectorAll('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 0) {
          currentStep--;
          updateProgress();
        }
      });
    });

    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(currentStep)) {
        return;
      }
      var confirmBox = document.getElementById('booking-confirm');
      var name = document.getElementById('bk-name');
      var nameVal = name ? name.value.trim() : '';
      var phoneEl = document.getElementById('bk-phone');
      var phoneVal = phoneEl ? phoneEl.value.trim() : '';
      var emailEl = document.getElementById('bk-email');
      var emailVal = emailEl ? emailEl.value.trim() : '';
      var pkgEl = document.getElementById('bk-package');
      var pkgVal = pkgEl ? pkgEl.value : '';
      var destEl = document.getElementById('bk-dest');
      var destVal = destEl ? destEl.value : '';
      var dateEl = document.getElementById('bk-checkin');
      var dateVal = dateEl ? dateEl.value : '';
      var travEl = document.getElementById('bk-travellers');
      var travVal = travEl ? travEl.value : '';
      var notesEl = document.getElementById('bk-notes');
      var notesVal = notesEl ? notesEl.value.trim() : '';

      var submitBtn = bookForm.querySelector('[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      sendToWeb3Forms({
        subject: 'New Booking Enquiry from ' + nameVal,
        from_name: nameVal,
        name: nameVal,
        phone: phoneVal,
        email: emailVal,
        package: pkgVal,
        destination: destVal,
        travel_date: dateVal,
        travellers: travVal,
        notes: notesVal
      }).then(function (result) {
        if (!result.ok) {
          throw new Error((result.data && result.data.message) || 'Submission failed');
        }
        if (confirmBox) {
          confirmBox.innerHTML = '<div class="confirmation-card"><div class="check-icon">✓</div><h3>Booking Enquiry Sent!</h3><p>Thank you, ' + (nameVal || 'traveller') + '! Your enquiry has been emailed to our travel desk. We\'ll contact you within 24 hours.</p></div>';
          confirmBox.style.display = 'block';
          bookForm.style.display = 'none';
          document.querySelector('.booking-progress').style.display = 'none';
          confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          launchConfetti();
        }
      }).catch(function () {
        if (confirmBox) {
          confirmBox.innerHTML = '<div class="confirmation-card"><h3>Something went wrong</h3><p>We couldn\'t send your enquiry. Please try again, or call/WhatsApp us directly at +91 99944 45675.</p></div>';
          confirmBox.style.display = 'block';
          confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    });

    updateProgress();
  }

  // ── Contact Form ──
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var ctName = document.getElementById('ct-name');
      var ctPhone = document.getElementById('ct-phone');
      var ctEmail = document.getElementById('ct-email');
      var ctMsg = document.getElementById('ct-msg');

      var inputs = [ctName, ctPhone, ctEmail, ctMsg];
      var isValid = true;
      var firstInvalidInput = null;

      inputs.forEach(function (input) {
        if (!input) return;
        input.dataset.touched = 'true';
        if (!validateInput(input)) {
          isValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = input;
          }
        }
      });

      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }

      if (!isValid) return;

      var confirmBox = document.getElementById('contact-confirm');
      var ctNameVal = ctName ? ctName.value.trim() : '';
      var ctPhoneVal = ctPhone ? ctPhone.value.trim() : '';
      var ctEmailVal = ctEmail ? ctEmail.value.trim() : '';
      var ctMsgVal = ctMsg ? ctMsg.value.trim() : '';

      var submitBtn = contactForm.querySelector('[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      sendToWeb3Forms({
        subject: 'Contact Message from ' + ctNameVal,
        from_name: ctNameVal,
        name: ctNameVal,
        phone: ctPhoneVal,
        email: ctEmailVal,
        message: ctMsgVal
      }).then(function (result) {
        if (!result.ok) {
          throw new Error((result.data && result.data.message) || 'Submission failed');
        }
        if (confirmBox) {
          confirmBox.textContent = "Thanks — your message has reached our Madurai desk. We'll get back to you shortly.";
          confirmBox.style.background = 'rgba(16,185,129,.12)';
          confirmBox.style.color = '#059669';
          confirmBox.style.display = 'block';
          contactForm.reset();
          confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).catch(function () {
        if (confirmBox) {
          confirmBox.textContent = "Something went wrong sending your message. Please try again, or call/WhatsApp us at +91 99944 45675.";
          confirmBox.style.background = 'rgba(239,68,68,.12)';
          confirmBox.style.color = '#dc2626';
          confirmBox.style.display = 'block';
          confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    });
  }

  // ── Confetti ──
  function launchConfetti() {
    var colors = ['#38BDF8', '#0EA5E9', '#14336B', '#7DD3FC', '#FFFFFF'];
    for (var i = 0; i < 60; i++) {
      (function (j) {
        setTimeout(function () {
          var c = document.createElement('div');
          c.style.cssText = 'position:fixed;z-index:9998;width:10px;height:10px;border-radius:2px;pointer-events:none;top:-10px;left:' + (Math.random() * 100) + 'vw;background:' + colors[j % colors.length] + ';transition:transform 2.5s ease-out,opacity 2.5s ease-out;';
          document.body.appendChild(c);
          requestAnimationFrame(function () {
            c.style.transform = 'translateY(' + (window.innerHeight + 20) + 'px) rotate(' + (Math.random() * 720) + 'deg)';
            c.style.opacity = '0';
          });
          setTimeout(function () { c.remove(); }, 2600);
        }, j * 30);
      })(i);
    }
  }

  // ── Scroll Progress + Back to Top ──
  var progressBar = document.getElementById('scroll-progress');
  var toTopBtn = document.getElementById('to-top');

  function updateScrollUI() {
    if (progressBar) {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + '%';
    }
    if (toTopBtn) {
      toTopBtn.classList.toggle('visible', window.scrollY > 480);
    }
  }

  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateScrollUI();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollUI();

  // ── Package Detail Page ──
  var pkgDetailRoot = document.getElementById('pkg-detail-root');
  if (pkgDetailRoot) {
    var packages = {
      'madurai-rameshwaram': {
        title: 'Madurai & Rameshwaram',
        type: 'Temple Tour',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
        desc: 'Meenakshi Amman Temple darshan, Rameshwaram\'s Ramanathaswamy corridor, and the Pamban Bridge.',
        includes: ['AC vehicle with driver', '3-star hotel stays', 'Temple guide & darshan assistance', 'Daily breakfast'],
        days: [
          { day: 'Day 1', title: 'Arrive Madurai', content: 'Airport/railway pickup, check-in, evening Meenakshi Amman Temple darshan with local guide.' },
          { day: 'Day 2', title: 'Madurai Temple Circuit', content: 'Early morning darshan, Thirumalai Nayakkar Palace, Gandhi Museum, and local market walk.' },
          { day: 'Day 3', title: 'Drive to Rameshwaram', content: 'Scenic drive across Pamban Bridge, Ramanathaswamy Temple corridor visit, Agni Theertham.' },
          { day: 'Day 4', title: 'Dhanushkodi & Departure', content: 'Dhanushkodi ghost town visit, return to Madurai for departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
          'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80',
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.6600757574!2d77.837026!3d9.925201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c882b05a5113%3A0x7dd8e962158f1a68!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000'
      },
      'thanjavur-kumbakonam': {
        title: 'Thanjavur & Kumbakonam',
        type: 'Temple Tour',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80',
        desc: 'The Great Living Chola Temples circuit, including Brihadeeswarar Temple and Airavatesvara Temple.',
        includes: ['AC vehicle with driver', 'Heritage hotel option', 'Local historian guide', 'Daily breakfast'],
        days: [
          { day: 'Day 1', title: 'Thanjavur Arrival', content: 'Arrive Thanjavur, Brihadeeswarar Temple (Big Temple) visit with historian guide.' },
          { day: 'Day 2', title: 'Chola Heritage Trail', content: 'Thanjavur Palace, Art Gallery, Saraswathi Mahal Library.' },
          { day: 'Day 3', title: 'Kumbakonam Temples', content: 'Airavatesvara Temple, Adi Kumbeswarar Temple, Mahamaham tank area.' },
          { day: 'Day 4', title: 'Departure', content: 'Morning temple visit, departure from Thanjavur.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124861.5!2d79.1!3d10.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5f3a0e84f1b%3A0x6b5f48d4c0e3e3e3!2sThanjavur!5e0!3m2!1sen!2sin'
      },
      'tirupati': {
        title: 'Tirupati Darshan Special',
        type: 'Temple Tour',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
        desc: 'Tirumala Venkateswara Temple with priority darshan slot assistance and Chandragiri Fort visit.',
        includes: ['AC vehicle with driver', 'Darshan slot booking support', '3-star hotel stay'],
        days: [
          { day: 'Day 1', title: 'Arrive Tirupati', content: 'Pickup, hotel check-in, Chandragiri Fort evening visit.' },
          { day: 'Day 2', title: 'Tirumala Darshan', content: 'Early morning priority darshan at Tirumala Venkateswara Temple, temple prasadam.' },
          { day: 'Day 3', title: 'Local Temples & Departure', content: 'Kapila Theertham, ISKCON temple, departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
          'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.5!2d79.41!3d13.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2c8b2b2b2b2b2b%3A0x2b2b2b2b!2sTirupati!5e0!3m2!1sen!2sin'
      },
      'munnar-alleppey': {
        title: 'Munnar & Alleppey Romance',
        type: 'Honeymoon',
        image: 'https://images.unsplash.com/photo-1602216058766-bb3cc9fc2b44?w=1200&q=80',
        desc: 'Tea-hill resort in Munnar, a private houseboat night on the Alleppey backwaters, and a candlelight dinner.',
        includes: ['Private AC car with driver', '4-star resort + houseboat stay', 'Candlelight dinner included', 'Couple photography session'],
        days: [
          { day: 'Day 1', title: 'Arrive Kochi → Munnar', content: 'Scenic drive through tea estates, check-in at hill resort, sunset viewpoint.' },
          { day: 'Day 2', title: 'Munnar Exploration', content: 'Tea museum, Eravikulam National Park, Mattupetty Dam, couple photoshoot.' },
          { day: 'Day 3', title: 'Munnar to Alleppey', content: 'Drive to Alleppey, board private houseboat, backwater cruise with candlelight dinner.' },
          { day: 'Day 4', title: 'Alleppey & Departure', content: 'Morning backwater views, checkout, departure from Kochi.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1602216058766-bb3cc9fc2b44?w=600&q=80',
          'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
          'https://images.unsplash.com/photo-1580619309936-a7e8d2b7d5b5?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31431.5!2d76.95!3d10.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081aecb92b948b%3A0x6b5f48d4c0e3e3e3!2sMunnar!5e0!3m2!1sen!2sin'
      },
      'kovalam': {
        title: 'Kovalam',
        type: 'Honeymoon',
        image: 'https://images.unsplash.com/photo-1580619309936-a7e8d2b7d5b5?w=1200&q=80',
        desc: 'Kovalam beach resort and the Padmanabhapuram Palace.',
        includes: ['Private AC car with driver', 'Beach resort stay', 'Sunset cruise'],
        days: [
          { day: 'Day 1', title: 'Arrive Kovalam', content: 'Beach resort check-in, Lighthouse Beach evening stroll.' },
          { day: 'Day 2', title: 'Beach & Palace', content: 'Morning beach time, Padmanabhapuram Palace visit, sunset cruise.' },
          { day: 'Day 3', title: 'Trivandrum & Departure', content: 'Padmanabhaswamy Temple, local markets, departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1580619309936-a7e8d2b7d5b5?w=600&q=80',
          'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
          'https://images.unsplash.com/photo-1602216058766-bb3cc9fc2b44?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.5!2d76.98!3d8.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb8c8c8c8c8c%3A0x2b2b2b2b!2sKovalam!5e0!3m2!1sen!2sin'
      },
      'ooty-kodaikanal': {
        title: 'Ooty & Kodaikanal Hills',
        type: 'Family',
        image: 'https://images.unsplash.com/photo-1593693419195-e911b4c0e4a7?w=1200&q=80',
        desc: 'Nilgiri toy train, botanical gardens, boating lakes — paced gently for kids and grandparents.',
        includes: ['Spacious AC vehicle', 'Connecting hotel rooms', 'Kid-friendly stop planning', 'Daily breakfast & dinner'],
        days: [
          { day: 'Day 1', title: 'Arrive Ooty', content: 'Nilgiri Mountain Railway toy train ride, botanical gardens.' },
          { day: 'Day 2', title: 'Ooty Sightseeing', content: 'Ooty Lake boating, Doddabetta Peak, tea factory visit.' },
          { day: 'Day 3', title: 'Drive to Kodaikanal', content: 'Scenic hill drive, Kodaikanal Lake, Coaker\'s Walk.' },
          { day: 'Day 4', title: 'Kodaikanal & Departure', content: 'Bryant Park, Pillar Rocks, departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1593693419195-e911b4c0e4a7?w=600&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31431.5!2d76.69!3d11.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f258b4e4c4b%3A0x2b2b2b2b!2sOoty!5e0!3m2!1sen!2sin'
      },
      'kerala-family': {
        title: 'Kerala Complete Family Tour',
        type: 'Family',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
        desc: 'Kochi, Munnar, Thekkady and Alleppey — wildlife, hills and backwaters in one gentle route.',
        includes: ['Spacious AC vehicle', 'Family rooms across all stays', 'Periyar wildlife safari', 'Daily breakfast & dinner'],
        days: [
          { day: 'Day 1', title: 'Kochi', content: 'Fort Kochi, Chinese fishing nets, Kathakali performance.' },
          { day: 'Day 2', title: 'Kochi → Munnar', content: 'Tea estates, spice gardens, hill resort check-in.' },
          { day: 'Day 3', title: 'Munnar → Thekkady', content: 'Periyar wildlife sanctuary boat safari, spice plantation walk.' },
          { day: 'Day 4', title: 'Thekkady → Alleppey', content: 'Houseboat overnight on backwaters.' },
          { day: 'Day 5', title: 'Departure', content: 'Morning cruise, return to Kochi for departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
          'https://images.unsplash.com/photo-1602216058766-bb3cc9fc2b44?w=600&q=80',
          'https://images.unsplash.com/photo-1580619309936-a7e8d2b7d5b5?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125933.5!2d76.26!3d9.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081aecb92b948b%3A0x2b2b2b2b!2sKochi!5e0!3m2!1sen!2sin'
      },
      'wayanad': {
        title: 'Wayanad Adventure',
        type: 'Friends Trip',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        price: 'From ₹14,500',
        desc: 'Trekking, Edakkal Caves, and a bonfire night at a Wayanad plantation stay.',
        includes: ['Shared or private vehicle option', 'Plantation stay', 'Guided trek'],
        days: [
          { day: 'Day 1', title: 'Arrive Wayanad', content: 'Plantation homestay check-in, evening bonfire and group dinner.' },
          { day: 'Day 2', title: 'Trek & Caves', content: 'Chembra Peak trek, Edakkal Caves prehistoric rock art.' },
          { day: 'Day 3', title: 'Waterfalls & Departure', content: 'Soochipara Falls, Pookode Lake, departure.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
          'https://images.unsplash.com/photo-1593693419195-e911b4c0e4a7?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125933.5!2d76.13!3d11.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f258b4e4c4b%3A0x2b2b2b2b!2sWayanad!5e0!3m2!1sen!2sin'
      },
      'mysore-coorg': {
        title: 'Mysore & Coorg Getaway',
        type: 'Friends Trip',
        image: 'https://images.unsplash.com/photo-1599669454699-248893a1dc4b?w=1200&q=80',
        price: 'From ₹16,200',
        desc: 'Mysore Palace, Chamundi Hills, and coffee estate walks in Coorg with friends.',
        includes: ['Shared or private vehicle option', 'Homestay / resort option', 'Coffee estate tour'],
        days: [
          { day: 'Day 1', title: 'Mysore', content: 'Mysore Palace, Chamundi Hills, Brindavan Gardens evening.' },
          { day: 'Day 2', title: 'Mysore → Coorg', content: 'Drive to Coorg, coffee estate walk, homestay check-in.' },
          { day: 'Day 3', title: 'Coorg Adventure', content: 'Abbey Falls, Raja\'s Seat viewpoint, river rafting (seasonal).' },
          { day: 'Day 4', title: 'Departure', content: 'Morning plantation tour, departure from Mysore.' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1599669454699-248893a1dc4b?w=600&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
        ],
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124861.5!2d76.63!3d12.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d5ef31d%3A0x2b2b2b2b!2sMysore!5e0!3m2!1sen!2sin'
      }
    };

    var params = new URLSearchParams(window.location.search);
    var slug = params.get('pkg') || 'madurai-rameshwaram';
    var pkg = packages[slug] || packages['madurai-rameshwaram'];

    document.title = pkg.title + ' | South Trails Tours & Travels';

    var heroImg = document.getElementById('pkg-hero-img');
    if (heroImg) { heroImg.src = pkg.image; heroImg.alt = pkg.title; }

    var titleEl = document.getElementById('pkg-title');
    if (titleEl) titleEl.textContent = pkg.title;

    var typeEl = document.getElementById('pkg-type');
    if (typeEl) typeEl.textContent = pkg.type;

    var descEl = document.getElementById('pkg-desc');
    if (descEl) descEl.textContent = pkg.desc;

    var priceEl = document.getElementById('pkg-price');
    if (priceEl) priceEl.textContent = pkg.price;

    var includesEl = document.getElementById('pkg-includes');
    if (includesEl) {
      includesEl.innerHTML = pkg.includes.map(function (i) { return '<li>' + i + '</li>'; }).join('');
    }

    var timelineEl = document.getElementById('pkg-timeline');
    if (timelineEl) {
      timelineEl.innerHTML = pkg.days.map(function (d, i) {
        return '<div class="itinerary-day' + (i === 0 ? ' open' : '') + '">' +
          '<button type="button"><span>' + d.day + ': ' + d.title + '</span><span class="plus">+</span></button>' +
          '<div class="day-panel" style="max-height:' + (i === 0 ? '200px' : '0') + '"><p>' + d.content + '</p></div></div>';
      }).join('');
      timelineEl.querySelectorAll('.itinerary-day button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var day = btn.parentElement;
          var panel = day.querySelector('.day-panel');
          var isOpen = day.classList.contains('open');
          timelineEl.querySelectorAll('.itinerary-day').forEach(function (d) {
            d.classList.remove('open');
            d.querySelector('.day-panel').style.maxHeight = '0';
          });
          if (!isOpen) {
            day.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      });
    }

    var galleryEl = document.getElementById('pkg-gallery');
    if (galleryEl) {
      galleryEl.innerHTML = pkg.gallery.map(function (g) {
        return '<img src="' + g + '" alt="' + pkg.title + '" loading="lazy">';
      }).join('');
    }

    var mapEl = document.getElementById('pkg-map');
    if (mapEl) mapEl.src = pkg.map;

    var bookLink = document.getElementById('pkg-book-link');
    if (bookLink) bookLink.href = 'booknow.html';

    var crumbTitle = document.getElementById('pkg-crumb-title');
    if (crumbTitle) crumbTitle.textContent = pkg.title;

    // Tab scroll spy
    var tabs = document.querySelectorAll('.pkg-nav-tabs a');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(tab.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      });
    });
  }

  // ── Itinerary cards on detail page (static HTML fallback) ──
  document.querySelectorAll('.itinerary-day button').forEach(function (btn) {
    if (btn.closest('#pkg-timeline')) return;
    btn.addEventListener('click', function () {
      var day = btn.parentElement;
      var panel = day.querySelector('.day-panel');
      var isOpen = day.classList.contains('open');
      day.classList.toggle('open', !isOpen);
      if (panel) panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '0';
    });
  });

});
