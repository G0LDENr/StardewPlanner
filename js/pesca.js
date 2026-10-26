document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaPeces');
  const inputBuscar = document.getElementById('inputBuscar');
  const botonesFiltro = document.querySelectorAll('.chip');
  
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';

  // Función para renderizar las tarjetas
  function renderizarPeces() {
    contenedor.innerHTML = '';
    
    // Filtrar la base de datos por nombre y estación
    const filtrados = databasePeces.filter(pez => {
      const coincideNombre = pez.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideEstacion = filtroEstacion === 'Todas' || pez.estacion === filtroEstacion;
      return coincideNombre && coincideEstacion;
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron peces.</p>';
      return;
    }

    // Crear HTML de cada tarjeta
    filtrados.forEach(pez => {
      const card = document.createElement('div');
      card.className = 'crop-card';
      
      card.innerHTML = `
        <img src="${pez.svg}" alt="${pez.nombre}" class="crop-card-icon" onerror="this.src='../svg/Pesca.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${pez.nombre}</div>
          <div class="crop-card-season">${pez.estacion}</div> 
          <div class="crop-card-details">
            <span><i data-lucide="activity" style="width:14px; height:14px;"></i> ${pez.dificultad}</span>
            <span class="crop-card-price">${pez.precioBase}g</span>
          </div>
        </div>
        <div class="crop-card-arrow">
          <i data-lucide="chevron-right"></i>
        </div>
      `;
      
      // Abrir modal al hacer clic
      card.addEventListener('click', () => abrirModal(pez));
      contenedor.appendChild(card);
    });

    // Inicializar los iconos de Lucide para las nuevas tarjetas
    lucide.createIcons();
  }

  // Función para abrir el modal con los datos del pez
  function abrirModal(pez) {
    document.getElementById('modalImg').src = pez.svg;
    document.getElementById('modalImg').onerror = function() { this.src = '../svg/Pesca.svg'; };
    document.getElementById('modalTitulo').textContent = pez.nombre;
    document.getElementById('modalCategoria').textContent = pez.estacion;
    document.getElementById('modalLugar').textContent = pez.lugar;
    document.getElementById('modalDificultad').textContent = pez.dificultad;
    
    document.getElementById('modalClima').textContent = pez.clima || "Cualquiera";
    document.getElementById('modalEvento').textContent = pez.evento || "Ninguno";
    
    document.getElementById('precioNormal').textContent = `${pez.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${pez.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${pez.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${pez.precios.iridio}g`;

    document.getElementById('modalOverlay').classList.add('active');
  }

  // Cerrar modal dando clic en la X
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('active');
  });
  
  // Cerrar modal dando clic en el fondo oscuro
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      document.getElementById('modalOverlay').classList.remove('active');
    }
  });

  // Evento del buscador
  inputBuscar.addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    renderizarPeces();
  });

  // Evento de los filtros de estación
  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      filtroEstacion = boton.dataset.estacion;
      renderizarPeces();
    });
  });

  // Renderizar los peces por primera vez al cargar la página
  renderizarPeces();
});