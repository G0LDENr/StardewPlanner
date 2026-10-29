document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaPeces');
  const inputBuscar = document.getElementById('inputBuscar');
  const botonesFiltro = document.querySelectorAll('.chip');
  const btnOrdenAZ = document.getElementById('btnOrdenAZ');
  
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';
  let ordenAscendente = true;
  let productoActualId = null;

  function getClaseEstacion(estacion) {
    const est = estacion.toLowerCase();
    if (est === 'primavera') return 'primavera';
    if (est === 'verano') return 'verano';
    if (est === 'otoño') return 'otono';
    if (est === 'invierno') return 'invierno';
    return 'comodin';
  }

  function renderizarPeces() {
    contenedor.innerHTML = '';
    
    let filtrados = databasePeces.filter(pez => {
      const coincideNombre = pez.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideEstacion = filtroEstacion === 'Todas' || pez.estaciones.includes(filtroEstacion);
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
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron peces.</p>';
      return;
    }

    filtrados.forEach(pez => {
      const estacionesHTML = pez.estaciones.map(est => {
        const clase = getClaseEstacion(est);
        return `<span class="crop-card-season ${clase}">${est}</span>`;
      }).join('');

      const card = document.createElement('div');
      card.className = 'crop-card';
      
      card.innerHTML = `
        <img src="${pez.svg}" alt="${pez.nombre}" class="crop-card-icon" onerror="this.src='../svg/Pesca.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${pez.nombre}</div>
          <div>${estacionesHTML}</div>
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
    productoActualId = pez.id;
    const modalImgContainer = document.getElementById('modalImgContainer');
    modalImgContainer.innerHTML = `
      <img src="${pez.svg}" alt="${pez.nombre}" onerror="this.src='../svg/Pesca.svg'">
    `;

    document.getElementById('modalTitulo').textContent = pez.nombre;
    
    const modalEstacionesContainer = document.getElementById('modalEstaciones');
    modalEstacionesContainer.innerHTML = '';
    pez.estaciones.forEach(est => {
      const clase = getClaseEstacion(est);
      const badge = document.createElement('span');
      badge.className = `modal-badge ${clase}`;
      badge.textContent = est;
      modalEstacionesContainer.appendChild(badge);
    });
    
    document.getElementById('modalLugar').textContent = pez.lugar;
    document.getElementById('modalDificultad').textContent = pez.dificultad;
    document.getElementById('modalClima').textContent = pez.climas.join(', ');
    document.getElementById('modalEvento').textContent = pez.evento || "Ninguno";
    
    document.getElementById('precioNormal').textContent = `${pez.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${pez.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${pez.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${pez.precios.iridio}g`;

    // Lógica de favoritos
    const btnFav = document.getElementById('btnFavoritoModal');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (favoritos.includes(productoActualId)) {
      btnFav.classList.add('active');
    } else {
      btnFav.classList.remove('active');
    }

    document.getElementById('modalOverlay').classList.add('active');
  }

  document.getElementById('btnFavoritoModal').addEventListener('click', () => {
    const btnFav = document.getElementById('btnFavoritoModal');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    if (favoritos.includes(productoActualId)) {
      favoritos = favoritos.filter(id => id !== productoActualId);
      btnFav.classList.remove('active');
    } else {
      favoritos.push(productoActualId);
      btnFav.classList.add('active');
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  });

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
    renderizarPeces();
  });

  inputBuscar.addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    renderizarPeces();
  });

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      filtroEstacion = boton.dataset.estacion;
      renderizarPeces();
    });
  });

  renderizarPeces();
});