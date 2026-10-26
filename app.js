// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Usamos rutas relativas para que funcione tanto en index como en /views/
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ SW registrado'))
      .catch(err => {
        // Si falla en la raíz (views), intentamos un nivel arriba
        navigator.serviceWorker.register('../sw.js')
          .then(reg => console.log('✅ SW registrado desde views'))
          .catch(err => console.error('❌ Error SW:', err));
      });
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

// ===== MANEJO DE BOTONES Y NAVEGACIÓN =====
document.querySelectorAll('.action-btn, .nav-item, .dropdown-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    // 1. Si es un enlace (<a>) y tiene una URL real (no es "#" ni está vacío)
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      if (href && href !== '#' && href !== '') {
        // Es un enlace real (ej. views/Pesca.html), dejamos que el navegador haga su trabajo
        return; 
      }
    }

    // 2. Si llegamos aquí, es un botón sin página o un enlace con "#"
    e.preventDefault();
    
    // Buscamos el título (ya sea de un botón grande o de una pestaña del menú)
    const titulo = elemento.querySelector('.btn-title')?.textContent || 
                   elemento.querySelector('.nav-label')?.textContent || 
                   "Sección";
                   
    alert(`Próximamente: ${titulo}`);
  });
});

// ===== INICIALIZAR ICONOS DE LUCIDE =====
// Nos aseguramos de que Lucide exista antes de llamarlo para evitar errores
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}