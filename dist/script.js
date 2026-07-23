const shiprayLoaderStarted = performance.now();
let shiprayLoaderClosed = false;
const closeShiprayLoader = () => {
  if (shiprayLoaderClosed) return;
  shiprayLoaderClosed = true;
  const loader = document.getElementById('siteLoader');
  document.body.classList.remove('app-loading');
  document.body.classList.add('app-ready');
  if (!loader) return;
  loader.classList.add('is-hidden');
  setTimeout(() => loader.remove(), 550);
};
window.addEventListener('load', () => {
  const remaining = Math.max(0, 900 - (performance.now() - shiprayLoaderStarted));
  setTimeout(closeShiprayLoader, remaining);
}, { once: true });
setTimeout(closeShiprayLoader, 4500);

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('#header');
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  const backTop = $('#backTop');
  const modal = $('#bookingModal');
  const loginModal = $('#loginModal');
  const toast = $('#toast');

  const showToast = (message) => {
    $('span', toast).textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  };

  menuBtn.addEventListener('click', () => {
    const willOpen = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', willOpen);
    mobileMenu.setAttribute('aria-hidden', String(!willOpen));
    menuBtn.setAttribute('aria-expanded', String(willOpen));
    menuBtn.innerHTML = `<i data-lucide="${willOpen ? 'x' : 'menu'}"></i>`;
    if (window.lucide) lucide.createIcons();
  });
  $$('#mobileMenu a').forEach(link => link.addEventListener('click', closeMenu));

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    backTop.classList.toggle('show', window.scrollY > 700);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => observer.observe(el));

  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('.desktop-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  }), { rootMargin: '-35% 0px -60% 0px' });
  $$('main section[id]').forEach(section => navObserver.observe(section));

  const openModal = () => {
    loginModal.classList.remove('open');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('input', modal).focus(), 150);
  };
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const openLogin = () => {
    closeMenu();
    modal.classList.remove('open');
    loginModal.classList.add('open');
    loginModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('input', loginModal).focus(), 150);
  };
  const closeLogin = () => {
    loginModal.classList.remove('open');
    loginModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  $$('.open-booking').forEach(btn => btn.addEventListener('click', () => { closeMenu(); openModal(); }));
  $$('.nav-login').forEach(btn => btn.addEventListener('click', openLogin));
  $('.modal-close').addEventListener('click', closeModal);
  $('.login-close').addEventListener('click', closeLogin);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  loginModal.addEventListener('click', e => { if (e.target === loginModal) closeLogin(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeLogin(); } });
  $('.switch-register').addEventListener('click', () => { closeLogin(); openModal(); });
  $('#forgotPassword').addEventListener('click', () => showToast('Password reset link will be sent to your email.'));

  const setError = (input, message) => {
    const label = input.closest('label');
    const error = label && $('.error', label);
    if (error) error.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };
  const validPhone = value => /^\d{10}$/.test(value.replace(/\D/g, ''));
  const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  let heroShippingType = 'domestic';
  let heroQuotePayment = 'prepaid';
  $$('.shipping-tabs button').forEach(btn => btn.addEventListener('click', () => {
    $$('.shipping-tabs button').forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');
    heroShippingType = btn.dataset.shipping;
    const deliveryInput = $('#heroDelivery');
    deliveryInput.placeholder = heroShippingType === 'domestic' ? 'Enter pincode' : 'Postal code';
    showToast(heroShippingType === 'domestic' ? 'Domestic shipping selected' : 'International estimate selected');
  }));

  $$('.quote-payment button').forEach(btn => btn.addEventListener('click', () => {
    $$('.quote-payment button').forEach(option => option.classList.remove('active'));
    btn.classList.add('active');
    heroQuotePayment = btn.dataset.quotePayment;
  }));

  $('#swapPincodes').addEventListener('click', () => {
    const pickup = $('#heroPickup');
    const delivery = $('#heroDelivery');
    [pickup.value, delivery.value] = [delivery.value, pickup.value];
  });

  $('#heroQuoteForm').addEventListener('submit', e => {
    e.preventDefault();
    const pickup = $('#heroPickup');
    const delivery = $('#heroDelivery');
    const weight = $('#heroWeight');
    const domestic = heroShippingType === 'domestic';
    const pickupOk = domestic ? /^\d{6}$/.test(pickup.value) : pickup.value.trim().length >= 4;
    const deliveryOk = domestic ? /^\d{6}$/.test(delivery.value) : delivery.value.trim().length >= 4;
    const weightOk = Number(weight.value) > 0;
    setError(pickup, pickupOk ? '' : domestic ? 'Enter 6-digit pincode' : 'Enter pickup postal code');
    setError(delivery, deliveryOk ? '' : domestic ? 'Enter 6-digit pincode' : 'Enter delivery postal code');
    setError(weight, weightOk ? '' : 'Enter valid weight');
    if (!pickupOk || !deliveryOk || !weightOk) return;
    const base = 42 + Number(weight.value) * 28;
    const codFee = heroQuotePayment === 'cod' ? 32 : 0;
    const multiplier = domestic ? 1 : 9.5;
    const estimated = Math.round((base + codFee) * multiplier);
    $('#heroQuoteResult strong').textContent = `From ₹${estimated}`;
    $('#heroQuoteResult small').textContent = domestic ? 'Estimated best domestic rate' : 'Estimated international rate';
    showToast('Your estimated rate is ready');
  });

  $('#viewAllRates').addEventListener('click', () => {
    openModal();
  });

  $('#trackBtn').addEventListener('click', () => {
    const input = $('#trackingNo');
    const value = input.value.trim();
    $('#trackError').textContent = value.length < 6 ? 'Please enter a valid AWB number.' : '';
    if (value.length < 6) return;
    $('#trackBtn').disabled = true;
    $('#trackBtn').textContent = 'Checking…';
    setTimeout(() => {
      $('#trackedAwb').textContent = `AWB ${value.toUpperCase()}`;
      $('#trackEmpty').style.display = 'none';
      $('#trackResult').classList.remove('hidden');
      $('#trackBtn').disabled = false;
      $('#trackBtn').textContent = 'Track shipment';
      showToast('Secure shipment status loaded');
    }, 700);
  });
  $('#trackingNo').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); $('#trackBtn').click(); }
  });

  $$('.faq-item button').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    $$('.faq-item').forEach(faq => {
      faq.classList.remove('open');
      $('button', faq).setAttribute('aria-expanded', 'false');
      $('button', faq).lastElementChild.setAttribute('data-lucide', 'plus');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.lastElementChild.setAttribute('data-lucide', 'minus');
    }
    if (window.lucide) lucide.createIcons();
  }));

  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name, email = form.elements.email, phone = form.elements.phone;
    const checks = [[name, name.value.trim().length > 1, 'Please enter your name'], [email, validEmail(email.value), 'Enter a valid email'], [phone, validPhone(phone.value), 'Enter a valid 10-digit number']];
    let valid = true;
    checks.forEach(([input, ok, message]) => { setError(input, ok ? '' : message); if (!ok) valid = false; });
    if (!valid) return;
    form.reset();
    showToast('Thanks! Our logistics expert will call you shortly.');
  });

  $('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = [...form.querySelectorAll('input')];
    let valid = true;
    inputs.forEach(input => {
      const ok = input.name === 'phone' ? validPhone(input.value) : input.value.trim().length > 1;
      setError(input, ok ? '' : input.name === 'phone' ? 'Enter a valid 10-digit number' : 'This field is required');
      if (!ok) valid = false;
    });
    if (!valid) return;
    form.reset(); closeModal(); showToast('Welcome to Shipray! We’ll contact you shortly.');
  });

  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email;
    const password = form.elements.password;
    const emailOk = validEmail(email.value);
    const passwordOk = password.value.length >= 6;
    setError(email, emailOk ? '' : 'Enter a valid email address');
    setError(password, passwordOk ? '' : 'Password must be at least 6 characters');
    if (!emailOk || !passwordOk) return;
    form.reset(); closeLogin(); showToast('Demo login verified — connect your backend to continue.');
  });

  $('#chatButton').addEventListener('click', () => showToast('Chat support is online — call +91 84878 81121'));
  $$('.socials button').forEach(btn => btn.addEventListener('click', () => showToast('Shipray social profile opening soon')));
  $$('footer a[href="#"]').forEach(link => link.addEventListener('click', e => { e.preventDefault(); showToast('This page is coming soon'); }));

  const cookieBanner = $('#cookieBanner');
  if (!localStorage.getItem('shiprayCookies')) setTimeout(() => cookieBanner.classList.add('show'), 1200);
  $('#acceptCookies').addEventListener('click', () => { localStorage.setItem('shiprayCookies', 'accepted'); cookieBanner.classList.remove('show'); });
});
