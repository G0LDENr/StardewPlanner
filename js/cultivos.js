document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaCultivos');
  const inputBuscar = document.getElementById('inputBuscar');
  const botonesFiltro = document.querySelectorAll('.chip');
  const btnOrdenAZ = document.getElementById('btnOrdenAZ');
  
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';
  let ordenAscendente = true;

  // Función auxiliar para obtener la clase CSS según la estación
  function getClaseEstacion(estacion) {
    const est = estacion.toLowerCase();
    if (est === 'primavera') return 'primavera';
    if (est === 'verano') return 'verano';
    if (est === 'otoño') return 'otono'; // Sin tilde para la clase CSS
    if (est === 'invierno') return 'invierno';
    return 'comodin'; // Para Fibra o cualquier otra
  }

  function renderizarCultivos() {
    contenedor.innerHTML = '';
    
    let filtrados = databaseCultivos.filter(cultivo => {
      const coincideNombre = cultivo.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideEstacion = filtroEstacion === 'Todas' || cultivo.estaciones.includes(filtroEstacion);
      return coincideNombre && coincideEstacion;
    });

    filtrados.sort((a, b) => {
      if (ordenAscendente) {
        return a.nombre.localeCompare(b.nombre); 
      } else {
        return b.nombre.localeCompare(a.nombre); 
      }
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron cultivos.</p>';
      return;
    }

    filtrados.forEach(cultivo => {
      // Generamos los badges con su clase de color
      const estacionesHTML = cultivo.estaciones.map(est => {
        const clase = getClaseEstacion(est);
        return `<span class="crop-card-season ${clase}">${est}</span>`;
      }).join('');

      const card = document.createElement('div');
      card.className = 'crop-card';
      
      card.innerHTML = `
        <img src="${cultivo.svg}" alt="${cultivo.nombre}" class="crop-card-icon" onerror="this.src='../svg/Planta.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${cultivo.nombre}</div>
          <div>${estacionesHTML}</div>
          <div class="crop-card-details">
            <span><i data-lucide="timer" style="width:14px; height:14px;"></i> ${cultivo.diasCrecimiento} días</span>
            <span class="crop-card-price">${cultivo.precioVenta}g</span>
          </div>
        </div>
        <div class="crop-card-arrow">
          <i data-lucide="chevron-right"></i>
        </div>
      `;
      
      card.addEventListener('click', () => abrirModal(cultivo));
      contenedor.appendChild(card);
    });

    lucide.createIcons();
  }

  function abrirModal(cultivo) {
    document.getElementById('modalImg').src = cultivo.svg;
    document.getElementById('modalImg').onerror = function() { this.src = '../svg/Planta.svg'; };
    document.getElementById('modalTitulo').textContent = cultivo.nombre;
    
    // Generamos los badges de colores para el modal
    const modalEstacionesContainer = document.getElementById('modalEstaciones');
    modalEstacionesContainer.innerHTML = ''; // Limpiamos
    cultivo.estaciones.forEach(est => {
      const clase = getClaseEstacion(est);
      const badge = document.createElement('span');
      badge.className = `modal-badge ${clase}`;
      badge.textContent = est;
      modalEstacionesContainer.appendChild(badge);
    });
    
    document.getElementById('modalCrecimiento').textContent = `${cultivo.diasCrecimiento} días`;
    document.getElementById('modalRegeneracion').textContent = cultivo.regeneracion;
    document.getElementById('modalVendedor').textContent = cultivo.vendedores;
    document.getElementById('modalTip').textContent = cultivo.tip || "No hay tips para este cultivo.";
    
    document.getElementById('precioNormal').textContent = `${cultivo.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${cultivo.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${cultivo.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${cultivo.precios.iridio}g`;

    document.getElementById('modalOverlay').classList.add('active');
  }

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('active');
  });
  
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      document.getElementById('modalOverlay').classList.remove('active');
    }
  });

  btnOrdenAZ.addEventListener('click', () => {
    ordenAscendente = !ordenAscendente;
    
    if (ordenAscendente) {
      btnOrdenAZ.textContent = "A - Z";
      btnOrdenAZ.classList.remove('desc');
    } else {
      btnOrdenAZ.textContent = "Z - A";
      btnOrdenAZ.classList.add('desc');
    }
    
    renderizarCultivos();
  });

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

  renderizarCultivos();
});