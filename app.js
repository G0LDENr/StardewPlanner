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

// ===== MANEJO DE NAVEGACIÓN (CORREGIDO) =====
document.querySelectorAll('.action-btn, .nav-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    // Si es un enlace (<a>) y NO es un "#", dejamos que el navegador haga su trabajo
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      // Si el enlace contiene ".html", es una página real. ¡No hacemos nada más!
      if (href && href.includes('.html')) {
        return; 
      }
    }

    // Si llegamos aquí, es un botón (como el de antes) o un href="#" (menú desplegable)
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