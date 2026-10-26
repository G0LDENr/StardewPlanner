document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('listaAnimal');
  const inputBuscar = document.getElementById('inputBuscar');
  
  let textoBusqueda = '';

  // Función para renderizar las tarjetas
  function renderizarAnimal() {
    contenedor.innerHTML = '';
    
    // Filtramos usando la base de datos databaseAnimal
    const filtrados = databaseAnimal.filter(producto => {
      return producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">No se encontraron productos.</p>';
      return;
    }

    filtrados.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'crop-card';
      
      // En la tarjeta mostramos el Animal y el Precio Base
      card.innerHTML = `
        <img src="${producto.svg}" alt="${producto.nombre}" class="crop-card-icon" onerror="this.src='../svg/Vaca.svg'">
        <div class="crop-card-info">
          <div class="crop-card-title">${producto.nombre}</div>
          <div class="crop-card-season">${producto.animal}</div> 
          <div class="crop-card-details">
            <span class="crop-card-price">${producto.precioBase}g</span>
          </div>
        </div>
        <div class="crop-card-arrow">
          <i data-lucide="chevron-right"></i>
        </div>
      `;
      
      card.addEventListener('click', () => abrirModal(producto));
      contenedor.appendChild(card);
    });

    // Inicializar iconos
    lucide.createIcons();
  }

  // Función para abrir el modal
  function abrirModal(producto) {
    document.getElementById('modalImg').src = producto.svg;
    document.getElementById('modalImg').onerror = function() { this.src = '../svg/Vaca.svg'; };
    document.getElementById('modalTitulo').textContent = producto.nombre;
    document.getElementById('modalCategoria').textContent = producto.animal;
    
    // Datos de la máquina, herramienta y producción
    document.getElementById('modalMaquina').textContent = producto.maquina;
    document.getElementById('modalHerramienta').textContent = producto.herramienta || "Ninguna";
    document.getElementById('modalProduccion').textContent = producto.produccion;
    
    // Nota informativa
    document.getElementById('modalNota').textContent = producto.nota || "";
    
    // Precios
    document.getElementById('precioNormal').textContent = `${producto.precios.normal}g`;
    document.getElementById('precioPlata').textContent = `${producto.precios.plata}g`;
    document.getElementById('precioOro').textContent = `${producto.precios.oro}g`;
    document.getElementById('precioIridio').textContent = `${producto.precios.iridio}g`;

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

  // Evento del buscador
  inputBuscar.addEventListener('input', (e) => {
    textoBusqueda = e.target.value;
    renderizarAnimal();
  });

  // Renderizado inicial
  renderizarAnimal();
});