// ===== SERVICE WORKER (CORREGIDO) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Detectamos si estamos en la raíz (index) o dentro de /views
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

// ===== MANEJO DE NAVEGACIÓN (CORREGIDO) =====
document.querySelectorAll('.action-btn, .nav-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    // Si es un enlace (<a>)
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      // Si el enlace contiene ".html" (ej. index.html, ../index.html, Cultivos.html)
      if (href && href.includes('.html')) {
        return; // Dejamos que el navegador navegue sin alertas
      }
    }

    // Si es un botón o un href="#" (menú desplegable)
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