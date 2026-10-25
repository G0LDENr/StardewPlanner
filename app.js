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

// ===== BOTONES DE ACCIÓN =====
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Como ahora el texto está dentro de un span, usamos el título para la alerta
    const title = btn.querySelector('.btn-title').textContent;
    alert(`Próximamente: ${title}`);
  });
});

// ===== MENÚ INFERIOR =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== INICIALIZAR ICONOS DE LUCIDE =====
// Esta función reemplaza las etiquetas <i> por los gráficos vectoriales
lucide.createIcons();