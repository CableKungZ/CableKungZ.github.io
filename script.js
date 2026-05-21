const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('compact', window.scrollY > 40);
});
