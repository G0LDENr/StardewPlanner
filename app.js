// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ SW registrado'))
      .catch(err => console.error('❌ Error SW:', err));
  });
}

// ===== MENÚ DESPLEGABLE Y OVERLAY =====
const menuBtn = document.getElementById('menuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const overlay = document.getElementById('overlay');

if (menuBtn && dropdownMenu && overlay) {
  function toggleMenu() {
    dropdownMenu.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener('click', () => {
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== menuBtn && !overlay.contains(e.target)) {
      if (dropdownMenu.classList.contains('open')) {
        toggleMenu();
      }
    }
  });
}

// ===== BOTONES DE ACCIÓN Y AVISOS =====
// Detectamos si estamos en el index (para los botones que aún no tienen página)
const actionButtons = document.querySelectorAll('button.action-btn'); // Nota: solo seleccionamos los <button>, no los <a>
actionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.querySelector('.btn-title').textContent;
    alert(`Próximamente: ${title}`);
  });
});

// Para los enlaces del menú inferior que aún no existen (pesca, animales, etc.)
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const href = item.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      alert(`Próximamente: Página de ${item.dataset.page}`);
    }
  });
});

// ===== INICIALIZAR ICONOS DE LUCIDE =====
lucide.createIcons();