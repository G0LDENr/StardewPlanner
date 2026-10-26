// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ SW registrado'))
      .catch(() => {
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

// ===== MANEJO DE NAVEGACIÓN (BLINDADO) =====
document.querySelectorAll('.action-btn, .nav-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    // 1. Verificamos si es un enlace (<a>)
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      // 2. Si el enlace contiene ".html" o "views/", es una página real y dejamos navegar
      if (href && (href.includes('.html') || href.includes('views/'))) {
        return; // El código se detiene aquí y el navegador hace la redirección
      }
    }

    // 3. Si llegamos aquí, es un botón o un href="#" (sección en construcción)
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