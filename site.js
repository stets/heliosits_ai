const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

function closeMenu() {
  navLinks?.classList.remove('open');
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open menu');
}

toggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

function updateNav() {
  nav?.classList.toggle('scrolled', window.scrollY > 40 || location.pathname !== '/');
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

