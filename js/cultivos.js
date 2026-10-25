document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaCultivos');
  const inputBuscar = document.getElementById('inputBuscar');
  const botonesFiltro = document.querySelectorAll('.chip');
  
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';

  // Función para renderizar las tarjetas
  function renderizarCultivos() {
    contenedor.innerHTML = '';
    
    // Filtrar la base de datos
    const filtrados = databaseCultivos.filter(cultivo => {
      const coincideNombre = cultivo.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideEstacion = filtroEstacion === 'Todas' || cultivo.estacion === filtroEstacion;
      return coincideNombre && coincideEstacion;
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron cultivos.</p>';
      return;
    }

    // Crear HTML de cada tarjeta
    filtrados.forEach(cultivo => {
      const card = document.createElement('div');
      card.className = 'crop-card';
      card.innerHTML = `
        <img src="${cultivo.svg}" alt="${cultivo.nombre}" class="crop-card-icon" onerror="this.src='../svg/Planta.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${cultivo.nombre}</div>
          <div class="crop-card-season">${cultivo.estacion}</div>
          <div class="crop-card-details">
            <span><i data-lucide="timer" style="width:14px; height:14px;"></i> ${cultivo.diasCrecimiento} días</span>
            <span class="crop-card-price">${cultivo.precioBase}g</span>
          </div>
        </div>
        <div class="crop-card-arrow">
          <i data-lucide="chevron-right"></i>
        </div>
      `;
      
      // Abrir modal al hacer clic
      card.addEventListener('click', () => abrirModal(cultivo));
      contenedor.appendChild(card);
    });

    // Re-inicializar iconos de Lucide para las nuevas tarjetas
    lucide.createIcons();
  }

  // Función para abrir el modal con los datos
  function abrirModal(cultivo) {
    document.getElementById('modalImg').src = cultivo.svg;
    document.getElementById('modalImg').onerror = function() { this.src = '../svg/Planta.svg'; };
    document.getElementById('modalTitulo').textContent = cultivo.nombre;
    document.getElementById('modalCategoria').textContent = cultivo.estacion;
    document.getElementById('modalCrecimiento').textContent = `${cultivo.diasCrecimiento} días`;
    document.getElementById('modalRegeneracion').textContent = cultivo.regeneracion;
    
    document.getElementById('precioNormal').textContent = `${cultivo.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${cultivo.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${cultivo.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${cultivo.precios.iridio}g`;

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
    renderizarCultivos();
  });

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      filtroEstacion = boton.dataset.estacion;
      renderizarCultivos();
    });
  });

  // Renderizado inicial
  renderizarCultivos();
});