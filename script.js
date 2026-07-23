const pageName = document.body.dataset.page || 'home';

const navigation = [
  ['home', 'Home', 'index.html'],
  ['services', 'Services', 'services.html'],
  ['partners', 'Partners', 'partners.html'],
  ['tracking', 'Tracking', 'tracking.html'],
  ['pricing', 'Pricing', 'pricing.html'],
  ['about', 'About', 'about.html'],
  ['contact', 'Contact', 'contact.html']
];

const header = document.querySelector('[data-site-header]');
const footer = document.querySelector('[data-site-footer]');

if (header) {
  const links = navigation.map(([key, label, href]) =>
    `<a href="${href}"${pageName === key ? ' class="active" aria-current="page"' : ''}>${label}</a>`
  ).join('');

  header.innerHTML = `
    <div class="announcement">
      <div class="container announcement-inner">
        <span><i data-lucide="sparkles"></i> Shipping across 29,000+ Indian pin codes</span>
        <a href="pricing.html">Check live rates <i data-lucide="arrow-up-right"></i></a>
      </div>
    </div>
    <div class="site-header" id="siteHeader">
      <nav class="container nav-wrap" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="Shipray Logistics home">
          <img src="assets/shipray-logo.svg" alt="Shipray Logistics Pvt. Ltd." width="330" height="92">
        </a>
        <div class="desktop-nav">${links}</div>
        <div class="nav-actions">
          <a class="nav-login" href="contact.html">Talk to us</a>
          <a class="btn btn-primary nav-cta" href="pricing.html">Get a quote <i data-lucide="arrow-up-right"></i></a>
          <button class="menu-btn" id="menuButton" type="button" aria-label="Open menu" aria-expanded="false">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>
      <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
        <div class="container">${links}<a class="btn btn-primary" href="pricing.html">Get a quote</a></div>
      </div>
    </div>`;
}

if (footer) {
  footer.innerHTML = `
    <div class="footer-shell">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="index.html"><img src="assets/shipray-logo-light.svg" alt="Shipray Logistics Pvt. Ltd." width="330" height="92"></a>
          <p>One smart logistics platform for every shipment—from first pickup to final delivery.</p>
          <div class="footer-contact">
            <a href="tel:+918487881121"><i data-lucide="phone"></i> +91 84878 81121</a>
            <a href="mailto:info@shipraylogistics.com"><i data-lucide="mail"></i> info@shipraylogistics.com</a>
          </div>
        </div>
        <div>
          <h3>Platform</h3>
          <a href="services.html">Services</a>
          <a href="tracking.html">Shipment tracking</a>
          <a href="pricing.html">Rate calculator</a>
          <a href="partners.html">Courier network</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="about.html">About Shipray</a>
          <a href="contact.html">Contact us</a>
          <a href="about.html#values">Our values</a>
          <a href="contact.html#office">Ahmedabad office</a>
        </div>
        <div>
          <h3>Popular solutions</h3>
          <a href="services.html#domestic">Domestic shipping</a>
          <a href="services.html#international">International shipping</a>
          <a href="services.html#b2b">B2B cargo</a>
          <a href="services.html#returns">Reverse logistics</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 Shipray Logistics Pvt. Ltd. All rights reserved.</span>
        <span>Built for businesses that keep India moving.</span>
      </div>
    </div>
    <button class="back-top" id="backTop" type="button" aria-label="Back to top"><i data-lucide="arrow-up"></i></button>
    <div class="toast" id="toast" role="status" aria-live="polite"><i data-lucide="circle-check"></i><span></span></div>`;
}

const renderIcons = () => {
  if (window.lucide) window.lucide.createIcons();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderIcons, { once: true });
} else {
  renderIcons();
}

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const siteHeader = document.getElementById('siteHeader');
const backTop = document.getElementById('backTop');
const toast = document.getElementById('toast');

const showToast = message => {
  if (!toast) return;
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  window.clearTimeout(window.shiprayToastTimer);
  window.shiprayToastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
};

const closeMenu = () => {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) window.lucide.createIcons();
};

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const willOpen = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', willOpen);
    mobileMenu.setAttribute('aria-hidden', String(!willOpen));
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.innerHTML = `<i data-lucide="${willOpen ? 'x' : 'menu'}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

window.addEventListener('scroll', () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 16);
  backTop?.classList.toggle('show', window.scrollY > 700);
}, { passive: true });

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('visible');
});

const setFieldError = (input, message) => {
  const field = input.closest('.field');
  const error = field?.querySelector('.field-error');
  if (error) error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
};

const validPincode = value => /^\d{6}$/.test(value.trim());
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const validPhone = value => /^\d{10}$/.test(value.replace(/\D/g, ''));

const rateForm = document.getElementById('rateForm');
if (rateForm) {
  let paymentMode = 'prepaid';
  const paymentButtons = [...rateForm.querySelectorAll('[data-payment]')];
  paymentButtons.forEach(button => button.addEventListener('click', () => {
    paymentButtons.forEach(option => option.classList.remove('active'));
    button.classList.add('active');
    paymentMode = button.dataset.payment;
  }));

  document.getElementById('swapRoute')?.addEventListener('click', () => {
    const pickup = rateForm.elements.pickup;
    const delivery = rateForm.elements.delivery;
    [pickup.value, delivery.value] = [delivery.value, pickup.value];
  });

  rateForm.addEventListener('submit', event => {
    event.preventDefault();
    const pickup = rateForm.elements.pickup;
    const delivery = rateForm.elements.delivery;
    const weight = rateForm.elements.weight;
    const pickupOK = validPincode(pickup.value);
    const deliveryOK = validPincode(delivery.value);
    const weightValue = Number(weight.value);
    const weightOK = weightValue > 0 && weightValue <= 100;
    setFieldError(pickup, pickupOK ? '' : 'Enter a valid 6-digit pincode');
    setFieldError(delivery, deliveryOK ? '' : 'Enter a valid 6-digit pincode');
    setFieldError(weight, weightOK ? '' : 'Enter weight between 0.1 and 100 kg');
    if (!pickupOK || !deliveryOK || !weightOK) return;

    const zoneFactor = pickup.value.slice(0, 2) === delivery.value.slice(0, 2) ? 1 : 1.35;
    const codFee = paymentMode === 'cod' ? 32 : 0;
    const rate = Math.round((45 + weightValue * 29) * zoneFactor + codFee);
    const result = document.getElementById('rateResult');
    result.querySelector('[data-rate]').textContent = `₹${rate}`;
    result.querySelector('[data-days]').textContent = zoneFactor === 1 ? '1–2 business days' : '3–5 business days';
    result.classList.add('ready');
    showToast('Your shipping estimate is ready.');
  });
}

const trackingForm = document.getElementById('trackingForm');
if (trackingForm) {
  trackingForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = trackingForm.elements.awb;
    const value = input.value.trim();
    const valid = /^[a-zA-Z0-9-]{6,24}$/.test(value);
    setFieldError(input, valid ? '' : 'Enter a valid AWB or order ID');
    if (!valid) return;

    const result = document.getElementById('trackingResult');
    result.querySelector('[data-awb]').textContent = value.toUpperCase();
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Latest shipment status loaded.');
  });
}

document.querySelectorAll('[data-faq-button]').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('i')?.setAttribute('data-lucide', open ? 'minus' : 'plus');
    if (window.lucide) window.lucide.createIcons();
  });
});

document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name;
    const email = form.elements.email;
    const phone = form.elements.phone;
    const checks = [
      [name, name.value.trim().length > 1, 'Please enter your name'],
      [email, validEmail(email.value), 'Enter a valid email address'],
      [phone, validPhone(phone.value), 'Enter a valid 10-digit phone number']
    ];
    let formValid = true;
    checks.forEach(([input, valid, message]) => {
      setFieldError(input, valid ? '' : message);
      if (!valid) formValid = false;
    });
    if (!formValid) return;
    form.reset();
    showToast('Thank you. Our logistics team will contact you shortly.');
  });
});
