// ===== SERVICE WORKER (Ruta simple y directa) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Usamos una ruta relativa simple que funciona tanto en index como en views
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ SW registrado'))
      .catch(err => {
        // Si falla (porque estamos en views), intentamos un nivel arriba
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

// ===== MANEJO DE NAVEGACIÓN (LA SOLUCIÓN DEFINITIVA) =====
document.querySelectorAll('.action-btn, .nav-item').forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    
    // Si es un enlace (<a>) y tiene un atributo href...
    if (elemento.tagName.toLowerCase() === 'a') {
      const href = elemento.getAttribute('href');
      
      // ...y NO es un "#", entonces es una página real. ¡Dejamos que navegue!
      if (href && href !== '#') {
        return; 
      }
    }

    // Si es un botón o el enlace es "#", mostramos la alerta
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