document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaFavoritos');
  const inputBuscar = document.getElementById('inputBuscar');
  const btnOrdenAZ = document.getElementById('btnOrdenAZ');
  const selectEstacion = document.getElementById('selectEstacion');
  const selectCategoria = document.getElementById('selectCategoria');
  
  let filtroCat = 'todos';
  let filtroEstacion = 'Todas';
  let textoBusqueda = '';
  let ordenAscendente = true;
  let productoActualId = null;

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
          coincideEst = false; // Los animales no tienen estación
        }
      }

      return coincideNombre && coincideCat && coincideEst;
    });

    favoritos.sort((a, b) => {
      if (ordenAscendente) return a.nombre.localeCompare(b.nombre); 
      else return b.nombre.localeCompare(a.nombre); 
    });

    // 👇 MENSAJE DE VACÍO CON DISEÑO
    if (favoritos.length === 0) {
      contenedor.innerHTML = `
        <div class="empty-fav-state">
          <i data-lucide="star"></i>
          <h3>Aún no tienes favoritos</h3>
          <p>Explora las secciones de Cultivos, Pesca o Animal y toca la estrella en el modal para guardar tus productos preferidos aquí.</p>
        </div>
      `;
      lucide.createIcons();
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
      
      // Al hacer clic, abrimos el modal
      card.addEventListener('click', () => abrirModal(prod));

      contenedor.appendChild(card);
    });

    lucide.createIcons();
  }

  function abrirModal(prod) {
    productoActualId = prod.id;
    
    // Ocultar todas las filas por defecto
    const filas = [
      'rowCrecimiento', 'rowRegeneracion', 'rowVendedor', 
      'rowLugar', 'rowDificultad', 'rowClima', 'rowEvento', 
      'rowMaquina', 'rowHerramienta', 'rowProduccion', 'rowNota'
    ];
    filas.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    // Imagen y título
    const modalImgContainer = document.getElementById('modalImgContainer');
    modalImgContainer.innerHTML = `<img src="${prod.svg}" alt="${prod.nombre}" onerror="this.src='../svg/Planta.svg'">`;
    
    document.getElementById('modalTitulo').textContent = prod.nombre;
    
    const modalEstacionesContainer = document.getElementById('modalEstaciones');
    modalEstacionesContainer.innerHTML = '';
    if (prod.estaciones) {
      prod.estaciones.forEach(est => {
        const clase = getClaseEstacion(est);
        const badge = document.createElement('span');
        badge.className = `modal-badge ${clase}`;
        badge.textContent = est;
        modalEstacionesContainer.appendChild(badge);
      });
    }

    // Mostrar filas según la categoría
    if (prod.catKey === 'cultivos') {
      document.getElementById('rowCrecimiento').style.display = 'flex';
      document.getElementById('modalCrecimiento').textContent = `${prod.diasCrecimiento} días`;
      
      document.getElementById('rowRegeneracion').style.display = 'flex';
      document.getElementById('modalRegeneracion').textContent = prod.regeneracion;
      
      document.getElementById('rowVendedor').style.display = 'flex';
      document.getElementById('modalVendedor').textContent = prod.vendedores;

      document.getElementById('rowNota').style.display = 'block';
      document.getElementById('modalNota').textContent = prod.tip || "No hay tips.";
    } 
    else if (prod.catKey === 'pesca') {
      document.getElementById('rowLugar').style.display = 'flex';
      document.getElementById('modalLugar').textContent = prod.lugar;
      
      document.getElementById('rowDificultad').style.display = 'flex';
      document.getElementById('modalDificultad').textContent = prod.dificultad;
      
      document.getElementById('rowClima').style.display = 'flex';
      document.getElementById('modalClima').textContent = prod.climas.join(', ');
      
      document.getElementById('rowEvento').style.display = 'flex';
      document.getElementById('modalEvento').textContent = prod.evento || "Ninguno";
    } 
    else if (prod.catKey === 'animal') {
      document.getElementById('rowMaquina').style.display = 'flex';
      document.getElementById('modalMaquina').textContent = prod.maquina;
      
      document.getElementById('rowHerramienta').style.display = 'flex';
      document.getElementById('modalHerramienta').textContent = prod.herramienta || "Ninguna";
      
      document.getElementById('rowProduccion').style.display = 'flex';
      document.getElementById('modalProduccion').textContent = prod.produccion;

      document.getElementById('rowNota').style.display = 'block';
      document.getElementById('modalNota').textContent = prod.nota || "Sin nota.";
    }

    // Precios
    document.getElementById('precioNormal').textContent = `${prod.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${prod.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${prod.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${prod.precios.iridio}g`;

    // Estado de la estrella en el modal
    const btnFav = document.getElementById('btnFavoritoModal');
    if (favoritosGuardados.includes(productoActualId)) {
      btnFav.classList.add('active');
    } else {
      btnFav.classList.remove('active');
    }

    document.getElementById('modalOverlay').classList.add('active');
  }

  // Cerrar Modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('active');
  });
  
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      document.getElementById('modalOverlay').classList.remove('active');
    }
  });

  // Botón de favorito dentro del modal
  document.getElementById('btnFavoritoModal').addEventListener('click', () => {
    const btnFav = document.getElementById('btnFavoritoModal');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    if (favoritos.includes(productoActualId)) {
      // Si ya estaba, lo quitamos
      favoritos = favoritos.filter(id => id !== productoActualId);
      btnFav.classList.remove('active');
    } else {
      // Si no estaba, lo agregamos
      favoritos.push(productoActualId);
      btnFav.classList.add('active');
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    // Si quitamos un favorito, cerramos el modal y refrescamos la lista
    if (!favoritos.includes(productoActualId)) {
      document.getElementById('modalOverlay').classList.remove('active');
      renderizarFavoritos();
    }
  });

  // Filtros
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

  selectEstacion.addEventListener('change', (e) => {
    filtroEstacion = e.target.value;
    renderizarFavoritos();
  });

  selectCategoria.addEventListener('change', (e) => {
    filtroCat = e.target.value;
    renderizarFavoritos();
  });

  // Inicializar
  renderizarFavoritos();
});