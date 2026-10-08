/**
 * NETQORIX CLIENT-SIDE JAVASCRIPT
 * Plain vanilla JS, no external libraries, deferred execution.
 * Handles: Theme toggle, Header scroll, Services dropdown (a11y), Mobile menu,
 * 10-day timeline animation, Metric count-up, Scope estimator, Currency switch, Form validation.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. THEME TOGGLE (Dark default, Light toggle, localStorage try/catch)
  // -------------------------------------------------------------------------
  function initTheme() {
    var storedTheme = null;
    try {
      storedTheme = localStorage.getItem('nq_theme');
    } catch (e) {
      // localStorage may be disabled or restricted in private browsing
    }

    var theme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggleUI(theme);

    var toggleBtns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle');
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
          localStorage.setItem('nq_theme', next);
        } catch (e) {}
        updateThemeToggleUI(next);
      });
    });
  }

  function updateThemeToggleUI(theme) {
    var toggleBtns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle');
    toggleBtns.forEach(function (btn) {
      var isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      var sunIcon = btn.querySelector('.icon-sun, .sun-icon');
      var moonIcon = btn.querySelector('.icon-moon, .moon-icon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'block' : 'none';
        moonIcon.style.display = isDark ? 'none' : 'block';
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. STICKY HEADER SCROLL STATE
  // -------------------------------------------------------------------------
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var handleScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // -------------------------------------------------------------------------
  // 3. KEYBOARD-ACCESSIBLE SERVICES DROPDOWN
  // -------------------------------------------------------------------------
  function initServicesDropdown() {
    var dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;

    var trigger = dropdown.querySelector('.dropdown-trigger');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    function openDropdown() {
      dropdown.setAttribute('data-open', 'true');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      dropdown.setAttribute('data-open', 'false');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = dropdown.getAttribute('data-open') === 'true';
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown.getAttribute('data-open') === 'true') {
        closeDropdown();
        trigger.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. MOBILE DRAWER NAVIGATION
  // -------------------------------------------------------------------------
  function initMobileMenu() {
    var openBtn = document.querySelector('.mobile-menu-toggle');
    var drawer = document.querySelector('.mobile-drawer');
    var backdrop = document.querySelector('.drawer-backdrop');
    var closeBtn = document.querySelector('.drawer-close-btn');

    if (!drawer) return;

    function openMenu() {
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. 10-DAY PRODUCTION TIMELINE INTERSECTION ANIMATION
  // -------------------------------------------------------------------------
  function initTimelineAnimation() {
    var rows = document.querySelectorAll('.timeline-phase-row');
    if (!rows.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            rows.forEach(function (row, idx) {
              setTimeout(function () {
                row.classList.add('active');
                setTimeout(function () {
                  if (idx !== rows.length - 1) row.classList.remove('active');
                }, 900);
              }, idx * 400);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      var container = document.querySelector('.production-log-card');
      if (container) observer.observe(container);
    }

    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        rows.forEach(function (r) { r.classList.remove('active'); });
        row.classList.add('active');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 6. METRIC COUNT-UP ANIMATION
  // -------------------------------------------------------------------------
  function initMetricCountUp() {
    var counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var targetStr = el.getAttribute('data-counter-target');
          var targetNum = parseFloat(targetStr);
          var prefix = el.getAttribute('data-counter-prefix') || '';
          var suffix = el.getAttribute('data-counter-suffix') || '';
          var decimals = targetStr.includes('.') ? targetStr.split('.')[1].length : 0;

          var duration = 1200;
          var startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = progress * targetNum;
            el.textContent = prefix + current.toFixed(decimals) + suffix;
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              el.textContent = prefix + targetStr + suffix;
            }
          }

          requestAnimationFrame(animateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  // -------------------------------------------------------------------------
  // 7. INTERACTIVE SCOPE ESTIMATOR
  // -------------------------------------------------------------------------
  function initEstimator() {
    var estimator = document.querySelector('.estimator-card');
    if (!estimator) return;

    var pagesInput = estimator.querySelector('#est-pages');
    var pagesValDisplay = estimator.querySelector('#est-pages-val');
    var reqCheckboxes = estimator.querySelectorAll('.est-req-check');
    var deliverySelect = estimator.querySelector('#est-delivery');
    var resultPriceDisplay = estimator.querySelector('#est-result-price');
    var whatsappCta = estimator.querySelector('#est-whatsapp-cta');

    if (!pagesInput || !resultPriceDisplay) return;

    function calculateEstimate() {
      var pages = parseInt(pagesInput.value, 10) || 5;
      if (pagesValDisplay) pagesValDisplay.textContent = pages + ' pages';

      // Base: Starter covers 5 pages = 15,000 INR. Each extra page is ~2,000 INR
      var total = 15000;
      if (pages > 5) {
        total += (pages - 5) * 2000;
      }

      var selectedReqs = [];
      reqCheckboxes.forEach(function (chk) {
        if (chk.checked) {
          var cost = parseInt(chk.getAttribute('data-cost'), 10) || 0;
          total += cost;
          selectedReqs.push(chk.getAttribute('data-label'));
        }
      });

      var speed = deliverySelect ? deliverySelect.value : 'standard';
      var speedText = 'Standard timeline';
      if (speed === '10day') {
        speedText = '10-day priority';
      } else if (speed === 'under10') {
        total = Math.round(total * 1.3); // +30% rush
        speedText = 'Under 10 days rush';
      }

      var formatted = '₹' + total.toLocaleString('en-IN');
      resultPriceDisplay.textContent = formatted;

      // Update CTA WhatsApp Link
      if (whatsappCta) {
        var message = 'Hi Netqorix, I would like a fixed project quote.\n' +
          'Estimated Scope: ' + pages + ' pages\n' +
          'Requirements: ' + (selectedReqs.length ? selectedReqs.join(', ') : 'Base website') + '\n' +
          'Delivery Speed: ' + speedText + '\n' +
          'Indicative Estimate: ' + formatted;
        whatsappCta.href = 'https://wa.me/918369532924?text=' + encodeURIComponent(message);
      }
    }

    pagesInput.addEventListener('input', calculateEstimate);
    reqCheckboxes.forEach(function (chk) { chk.addEventListener('change', calculateEstimate); });
    if (deliverySelect) deliverySelect.addEventListener('change', calculateEstimate);

    calculateEstimate();
  }

  // -------------------------------------------------------------------------
  // 8. CURRENCY TOGGLE (INR default, USD, EUR, GBP, AED conversions)
  // -------------------------------------------------------------------------
  var RATES_TO_INR = {
    'INR': { symbol: '₹', rate: 1, position: 'before' },
    'USD': { symbol: '$', rate: 0.0115, position: 'before' },
    'EUR': { symbol: '€', rate: 0.0105, position: 'before' },
    'GBP': { symbol: '£', rate: 0.0089, position: 'before' },
    'AED': { symbol: 'AED ', rate: 0.042, position: 'before' }
  };

  function initCurrencySwitch() {
    var selectors = document.querySelectorAll('.currency-select');
    if (!selectors.length) return;

    selectors.forEach(function (sel) {
      sel.addEventListener('change', function () {
        var curr = sel.value;
        // Sync all currency select elements on page
        selectors.forEach(function (s) { s.value = curr; });
        updateCurrencyDisplays(curr);
      });
    });
  }

  function updateCurrencyDisplays(curr) {
    var config = RATES_TO_INR[curr] || RATES_TO_INR['INR'];
    var elements = document.querySelectorAll('[data-inr-price]');

    elements.forEach(function (el) {
      var inrVal = parseFloat(el.getAttribute('data-inr-price'));
      if (isNaN(inrVal)) return;

      var converted = Math.round(inrVal * config.rate);
      var formatted = converted.toLocaleString();
      el.textContent = config.symbol + formatted;
    });

    // Handle range attributes if present
    var rangeEls = document.querySelectorAll('[data-inr-min]');
    rangeEls.forEach(function (el) {
      var minVal = parseFloat(el.getAttribute('data-inr-min'));
      var maxVal = parseFloat(el.getAttribute('data-inr-max'));
      if (isNaN(minVal) || isNaN(maxVal)) return;

      var cMin = Math.round(minVal * config.rate).toLocaleString();
      var cMax = Math.round(maxVal * config.rate).toLocaleString();
      el.textContent = config.symbol + cMin + ' – ' + config.symbol + cMax;
    });
  }

  // -------------------------------------------------------------------------
  // 9. CONTACT & MAINTENANCE FORM VALIDATION & FALLBACKS
  // -------------------------------------------------------------------------
  function initContactForm() {
    var form = document.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var feedbackEl = form.querySelector('#contact-form-feedback');

        // Honeypot spam trap check
        var hpField = form.querySelector('#cf-hp-field');
        if (hpField && hpField.value.trim() !== '') {
          // Silent bot drop
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback success';
            feedbackEl.textContent = "Received. We'll reply within 24 business hours.";
            feedbackEl.style.display = 'block';
          }
          return;
        }

        // Required input references
        var nameInput = form.querySelector('#cf-name');
        var contactInput = form.querySelector('#cf-contact');
        var messageInput = form.querySelector('#cf-message');

        // Reset previous validation errors
        var reqGroups = [
          { el: nameInput, group: form.querySelector('#group-cf-name'), err: form.querySelector('#cf-name-error'), msg: 'Please provide your full name or company.' },
          { el: contactInput, group: form.querySelector('#group-cf-contact'), err: form.querySelector('#cf-contact-error'), msg: 'Please provide your WhatsApp number or contact info.' },
          { el: messageInput, group: form.querySelector('#group-cf-message'), err: form.querySelector('#cf-message-error'), msg: 'Please describe what you need built or solved.' }
        ];

        var hasError = false;
        var firstInvalid = null;

        reqGroups.forEach(function (item) {
          if (item.group) item.group.classList.remove('has-error');
          if (item.err) item.err.textContent = '';
          var val = item.el ? item.el.value.trim() : '';
          if (!val) {
            hasError = true;
            if (item.group) item.group.classList.add('has-error');
            if (item.err) item.err.textContent = item.msg;
            if (!firstInvalid && item.el) firstInvalid = item.el;
          }
        });

        if (hasError) {
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback error';
            feedbackEl.textContent = 'Please fill out the three required fields above to proceed.';
            feedbackEl.style.display = 'block';
          }
          if (firstInvalid) {
            firstInvalid.focus();
          }
          return;
        }

        // Extract required values
        var name = nameInput.value.trim();
        var contact = contactInput.value.trim();
        var message = messageInput.value.trim();

        // Extract optional project details
        var projectTypeEl = form.querySelector('#cf-opt-project-type');
        var projectType = projectTypeEl ? projectTypeEl.value.trim() : '';

        var siteGoalsEl = form.querySelector('#cf-opt-site-goals');
        var siteGoals = siteGoalsEl ? siteGoalsEl.value.trim() : '';

        var pagesEl = form.querySelector('#cf-opt-pages');
        var pagesNeeded = pagesEl ? pagesEl.value.trim() : '';

        var checkedFeatures = [];
        form.querySelectorAll('input[name="features"]:checked').forEach(function (cb) {
          checkedFeatures.push(cb.value);
        });
        var features = checkedFeatures.join(', ');

        var existingSiteEl = form.querySelector('#cf-opt-existing-site');
        var existingSite = existingSiteEl ? existingSiteEl.value.trim() : '';

        var contentReadinessEl = form.querySelector('input[name="content_readiness"]:checked');
        var contentReadiness = contentReadinessEl ? contentReadinessEl.value : '';

        var ref1 = form.querySelector('#cf-opt-ref-1') ? form.querySelector('#cf-opt-ref-1').value.trim() : '';
        var ref2 = form.querySelector('#cf-opt-ref-2') ? form.querySelector('#cf-opt-ref-2').value.trim() : '';
        var ref3 = form.querySelector('#cf-opt-ref-3') ? form.querySelector('#cf-opt-ref-3').value.trim() : '';
        var refSites = [ref1, ref2, ref3].filter(function (u) { return u.length > 0; }).join(', ');

        var targetLaunchEl = form.querySelector('input[name="target_launch"]:checked');
        var targetLaunch = targetLaunchEl ? targetLaunchEl.value : '';

        var budgetGuideEl = form.querySelector('#cf-opt-budget');
        var budgetGuide = budgetGuideEl ? budgetGuideEl.value.trim() : '';

        var approverEl = form.querySelector('input[name="approver"]:checked');
        var approver = approverEl ? approverEl.value : '';

        var scopingTimeEl = form.querySelector('#cf-opt-scoping-time');
        var scopingTime = scopingTimeEl ? scopingTimeEl.value.trim() : '';

        // Build unified brief payload
        var briefLines = [
          'Hi Netqorix, Project Scoping Brief from Website:',
          '',
          '*CLIENT DETAILS*',
          '• Full Name: ' + name,
          '• WhatsApp / Contact: ' + contact,
          '• What do you need?: ' + message
        ];

        var optionalSummary = [];
        if (projectType) optionalSummary.push('• Project Type: ' + projectType);
        if (siteGoals) optionalSummary.push('• What site must do: ' + siteGoals);
        if (pagesNeeded) optionalSummary.push('• Pages/Screens: ' + pagesNeeded);
        if (features) optionalSummary.push('• Features Needed: ' + features);
        if (existingSite) optionalSummary.push('• Existing Website/Domain: ' + existingSite);
        if (contentReadiness) optionalSummary.push('• Content Readiness: ' + contentReadiness);
        if (refSites) optionalSummary.push('• Reference Sites: ' + refSites);
        if (targetLaunch) optionalSummary.push('• Target Launch: ' + targetLaunch);
        if (budgetGuide) optionalSummary.push('• Budget Guide: ' + budgetGuide);
        if (approver) optionalSummary.push('• Approver: ' + approver);
        if (scopingTime) optionalSummary.push('• Scoping Call Time: ' + scopingTime);

        if (optionalSummary.length > 0) {
          briefLines.push('');
          briefLines.push('*OPTIONAL PROJECT DETAILS*');
          briefLines = briefLines.concat(optionalSummary);
        }

        var fullBriefText = briefLines.join('\n');

        try {
          // Display success state (preserves form values intact)
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback success';
            feedbackEl.innerHTML = '<strong>Received. We\'ll reply within 24 business hours.</strong><br><span style="font-size:0.85rem; opacity:0.9;">Connecting you with founder Sanjeev Yadav...</span>';
            feedbackEl.style.display = 'block';
          }

          var waUrl = 'https://wa.me/918369532924?text=' + encodeURIComponent(fullBriefText);

          var actionChoice = confirm('Click OK to submit your brief directly via WhatsApp to Sanjeev, or Cancel to open your email client.');
          if (actionChoice) {
            window.open(waUrl, '_blank');
            window.location.href = 'thanks.html';
          } else {
            var mailtoUrl = 'mailto:netqorix@gmail.com?subject=' + encodeURIComponent('Project Scoping Brief - ' + name) +
              '&body=' + encodeURIComponent(fullBriefText);
            window.location.href = mailtoUrl;
            setTimeout(function () {
              window.location.href = 'thanks.html';
            }, 1500);
          }
        } catch (err) {
          // Keep all entered values preserved on error
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback error';
            feedbackEl.textContent = 'Submission encountered a client error. All your entered details are preserved above. Please send directly to netqorix@gmail.com or WhatsApp +91 83695 32924.';
            feedbackEl.style.display = 'block';
          }
        }
      });
    }

    var maintForm = document.querySelector('#maintenance-form');
    if (maintForm) {
      maintForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput = maintForm.querySelector('#maint-name');
        var emailInput = maintForm.querySelector('#maint-email');
        var stackSelect = maintForm.querySelector('#maint-stack');
        var messageInput = maintForm.querySelector('#maint-message');

        var name = nameInput ? nameInput.value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';
        var stack = stackSelect ? stackSelect.value : 'Not specified';
        var message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email) {
          alert('Please provide your name and work email address.');
          return;
        }

        var waText = 'Hi Netqorix, Maintenance & SLA Plan Request:\n' +
          'Name: ' + name + '\n' +
          'Work Email: ' + email + '\n' +
          'Current Tech Stack: ' + stack + '\n' +
          'System Details / Concerns:\n' + (message || 'Please provide a proposal for ongoing maintenance.');

        var waUrl = 'https://wa.me/918369532924?text=' + encodeURIComponent(waText);

        var actionChoice = confirm('Click OK to submit your maintenance inquiry directly via WhatsApp to Sanjeev, or Cancel to open your email client.');
        if (actionChoice) {
          window.open(waUrl, '_blank');
          window.location.href = 'thanks.html';
        } else {
          var mailtoUrl = 'mailto:netqorix@gmail.com?subject=' + encodeURIComponent('Maintenance & SLA Plan Request - ' + name) +
            '&body=' + encodeURIComponent(waText);
          window.location.href = mailtoUrl;
          setTimeout(function () {
            window.location.href = 'thanks.html';
          }, 1500);
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 10. PRINT BUTTON HANDLER
  // -------------------------------------------------------------------------
  function initPrintBtn() {
    var printBtn = document.querySelector('.btn-print-pricing');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }
  }

  // -------------------------------------------------------------------------
  // 11. LOCAL DEV & FILESYSTEM ROUTING ADAPTER
  // Resolves clean URLs (e.g. /services-web) to actual .html files (services-web.html)
  // when browsing locally (VS Code Live Server, http-server, localhost, or file://).
  // In production (netqorix.com on Vercel/Apache), native server rewrites handle clean URLs.
  // -------------------------------------------------------------------------
  function initLocalLinkResolver() {
    var isFile = window.location.protocol === 'file:';
    var hostname = window.location.hostname;
    var isLocalHost = hostname === 'localhost' ||
                      hostname === '127.0.0.1' ||
                      hostname === '[::1]' ||
                      hostname === '0.0.0.0' ||
                      hostname === '' ||
                      hostname.endsWith('.local') ||
                      hostname.endsWith('.test') ||
                      hostname.endsWith('.internal');

    // Only apply in local preview / development environments
    if (!isFile && !isLocalHost) return;

    function toLocalUrl(href) {
      if (!href) return href;
      // Skip anchors, protocol-relative, absolute external URLs, mailto, tel, javascript
      if (href.charAt(0) === '#' || href.indexOf('://') !== -1 || href.indexOf('//') === 0 ||
          href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
        return href;
      }

      // Root path '/'
      if (href === '/') {
        return isFile ? './index.html' : '/index.html';
      }

      // Internal root-relative paths like '/services-web' or '/services-web#hero'
      if (href.charAt(0) === '/') {
        var path = href.substring(1);
        var hashIdx = path.indexOf('#');
        var base = hashIdx >= 0 ? path.substring(0, hashIdx) : path;
        var hash = hashIdx >= 0 ? path.substring(hashIdx) : '';

        if (!base) {
          return (isFile ? './index.html' : '/index.html') + hash;
        }

        // Add .html extension if it doesn't already have one
        if (base.indexOf('.') === -1) {
          base += '.html';
        }

        return (isFile ? './' : '/') + base + hash;
      }

      return href;
    }

    // 1. Proactively transform all links in DOM so hover status bars, right-click, middle-click work
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var rawHref = links[i].getAttribute('href');
      var resolved = toLocalUrl(rawHref);
      if (resolved !== rawHref) {
        links[i].setAttribute('href', resolved);
      }
    }

    // 2. Delegate click handler to catch dynamically inserted links or uncaught clicks
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var rawHref = link.getAttribute('href');
      if (!rawHref) return;

      var resolved = toLocalUrl(rawHref);
      if (resolved !== rawHref) {
        link.setAttribute('href', resolved);
        // Regular left-click navigation
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          window.location.href = resolved;
        }
      }
    }, true);
  }

  // -------------------------------------------------------------------------
  // INITIALIZATION ON DOM READY
  // -------------------------------------------------------------------------
  function init() {
    initTheme();
    initStickyHeader();
    initServicesDropdown();
    initMobileMenu();
    initTimelineAnimation();
    initMetricCountUp();
    initEstimator();
    initCurrencySwitch();
    initContactForm();
    initPrintBtn();
    initLocalLinkResolver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
