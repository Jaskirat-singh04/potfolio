const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('.form-submit');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      submitBtn.textContent = 'Message Sent ✓';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    submitBtn.textContent = 'Failed — try email instead';
    submitBtn.disabled = false;
    setTimeout(() => {
      submitBtn.textContent = originalText;
    }, 3000);
  }
});
