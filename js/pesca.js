document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaPeces');
  const inputBuscar = document.getElementById('inputBuscar');
  const botonesFiltro = document.querySelectorAll('.chip');
  
  let filtroLugar = 'Todos';
  let textoBusqueda = '';

  function renderizarPeces() {
    contenedor.innerHTML = '';
    
    const filtrados = databasePeces.filter(pez => {
      const coincideNombre = pez.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideLugar = filtroLugar === 'Todos' || pez.lugar === filtroLugar;
      return coincideNombre && coincideLugar;
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron peces.</p>';
      return;
    }

    filtrados.forEach(pez => {
      const card = document.createElement('div');
      card.className = 'crop-card';
      
      // 👇 AQUÍ CAMBIAMOS EL LUGAR POR LA ESTACIÓN EN LA TARJETA
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
      
      card.addEventListener('click', () => abrirModal(pez));
      contenedor.appendChild(card);
    });

    lucide.createIcons();
  }

  function abrirModal(pez) {
    document.getElementById('modalImg').src = pez.svg;
    document.getElementById('modalImg').onerror = function() { this.src = '../svg/Pesca.svg'; };
    document.getElementById('modalTitulo').textContent = pez.nombre;
    
    // En el modal mostramos la estación en el badge superior
    document.getElementById('modalCategoria').textContent = pez.estacion; 
    
    // Y mostramos el lugar y la dificultad en las filas de información
    document.getElementById('modalLugar').textContent = pez.lugar;
    document.getElementById('modalDificultad').textContent = pez.dificultad;
    
    document.getElementById('precioNormal').textContent = `${pez.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${pez.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${pez.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${pez.precios.iridio}g`;

    document.getElementById('modalOverlay').classList.add('active');
  }

  // Cerrar modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('active');
  });
  
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      document.getElementById('modalOverlay').classList.remove('active');
    }
  });

  // Eventos del buscador y filtros
  inputBuscar.addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    renderizarPeces();
  });

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      filtroLugar = boton.dataset.lugar;
      renderizarPeces();
    });
  });

  renderizarPeces();
});