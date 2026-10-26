// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = window.location.pathname.includes('/views/') ? '../sw.js' : 'sw.js';
    navigator.serviceWorker.register(swPath)
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

// ===== MANEJO DE NAVEGACIÓN (A PRUEBA DE TODO) =====
document.querySelectorAll('.action-btn, .nav-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      // Si el enlace NO es "#" y NO está vacío, es una página real. Lo dejamos pasar.
      if (href && href !== '#') {
        return; 
      }
    }

    // Si es un botón o un href="#", mostramos la alerta
    e.preventDefault();
    
    const titulo = elemento.querySelector('.btn-title')?.textContent || 
                   elemento.querySelector('.nav-label')?.textContent || 
                   "Sección";
                   
    alert(`Próximamente: ${titulo}`);
  });
});

// ===== INICIALIZAR ICONOS DE LUCIDE =====
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}