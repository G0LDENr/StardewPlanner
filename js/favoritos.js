document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaFavoritos');
  const inputBuscar = document.getElementById('inputBuscar');
  const btnOrdenAZ = document.getElementById('btnOrdenAZ');
  
  // 👇 Nuevos elementos Select
  const selectEstacion = document.getElementById('selectEstacion');
  const selectCategoria = document.getElementById('selectCategoria');
  
  let filtroCat = 'todos';
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';
  let ordenAscendente = true;

  const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];

  function getClaseEstacion(estacion) {
    const est = estacion.toLowerCase();
    if (est === 'primavera') return 'primavera';
    if (est === 'verano') return 'verano';
    if (est === 'otoño') return 'otono';
    if (est === 'invierno') return 'invierno';
    return 'comodin';
  }

  const todosLosProductos = [
    ...databaseCultivos.map(p => ({ ...p, catKey: "cultivos" })),
    ...databasePeces.map(p => ({ ...p, catKey: "pesca" })),
    ...databaseAnimal.map(p => ({ ...p, catKey: "animal" }))
  ];

  function renderizarFavoritos() {
    contenedor.innerHTML = '';
    
    let favoritos = todosLosProductos.filter(prod => favoritosGuardados.includes(prod.id));

    favoritos = favoritos.filter(prod => {
      const coincideNombre = prod.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
      const coincideCat = filtroCat === 'todos' || prod.catKey === filtroCat;
      
      let coincideEst = true;
      if (filtroEstacion !== 'Todas') {
        if (prod.estaciones) {
          coincideEst = prod.estaciones.includes(filtroEstacion);
        } else {
          coincideEst = false;
        }
      }

      return coincideNombre && coincideCat && coincideEst;
    });

    favoritos.sort((a, b) => {
      if (ordenAscendente) return a.nombre.localeCompare(b.nombre); 
      else return b.nombre.localeCompare(a.nombre); 
    });

    if (favoritos.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No hay favoritos que coincidan con los filtros.</p>';
      return;
    }

    favoritos.forEach(prod => {
      let estacionesHTML = '';
      if (prod.estaciones) {
        estacionesHTML = prod.estaciones.map(est => {
          const clase = getClaseEstacion(est);
          return `<span class="crop-card-season ${clase}">${est}</span>`;
        }).join('');
      }

      const card = document.createElement('div');
      card.className = 'crop-card';
      
      card.innerHTML = `
        <img src="${prod.svg}" alt="${prod.nombre}" class="crop-card-icon" onerror="this.src='../svg/Planta.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${prod.nombre}</div>
          <div>${estacionesHTML}</div>
        </div>
        <i data-lucide="star" style="color:#f1c40f; fill:#f1c40f; width:24px; height:24px;"></i>
      `;
      
      card.addEventListener('click', () => {
        if (prod.catKey === 'cultivos') window.location.href = 'Cultivos.html';
        if (prod.catKey === 'pesca') window.location.href = 'Pesca.html';
        if (prod.catKey === 'animal') window.location.href = 'Animal.html';
      });

      contenedor.appendChild(card);
    });

    lucide.createIcons();
  }

  // Eventos
  btnOrdenAZ.addEventListener('click', () => {
    ordenAscendente = !ordenAscendente;
    btnOrdenAZ.textContent = ordenAscendente ? "A - Z" : "Z - A";
    btnOrdenAZ.classList.toggle('desc', !ordenAscendente);
    renderizarFavoritos();
  });

  inputBuscar.addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    renderizarFavoritos();
  });

  // 👇 Escuchar los cambios de los 2 selects
  selectEstacion.addEventListener('change', (e) => {
    filtroEstacion = e.target.value;
    renderizarFavoritos();
  });

  selectCategoria.addEventListener('change', (e) => {
    filtroCat = e.target.value;
    renderizarFavoritos();
  });

  renderizarFavoritos();
});