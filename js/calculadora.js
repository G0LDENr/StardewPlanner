document.addEventListener('DOMContentLoaded', () => {
  const btnAbrirModal = document.getElementById('btnAbrirModal');
  const modalProductos = document.getElementById('modalProductos');
  const closeModalProducts = document.getElementById('closeModalProducts');
  const gridProductos = document.getElementById('gridProductos');
  const modalCatTitulo = document.getElementById('modalCatTitulo');
  const listaCalculo = document.getElementById('listaCalculo');
  const totalGanancias = document.getElementById('totalGanancias');
  const botonesCat = document.querySelectorAll('.cat-btn[data-cat]');

  let categoriaSeleccionada = 'cultivos';
  let contadorGlobal = 0;

  const todosLosProductos = [
    ...databaseCultivos.map(p => ({ ...p, catKey: "cultivos" })),
    ...databasePeces.map(p => ({ ...p, catKey: "pesca" })),
    ...databaseAnimal.map(p => ({ ...p, catKey: "animal" }))
  ];

  botonesCat.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesCat.forEach(b => b.classList.remove('active-cat'));
      btn.classList.add('active-cat');
      categoriaSeleccionada = btn.dataset.cat;
    });
  });

  btnAbrirModal.addEventListener('click', () => {
    gridProductos.innerHTML = '';
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    let productosFiltrados = todosLosProductos.filter(p => p.catKey === categoriaSeleccionada);

    productosFiltrados.sort((a, b) => {
      const aFav = favoritosGuardados.includes(a.id);
      const bFav = favoritosGuardados.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.nombre.localeCompare(b.nombre); 
    });

    const nombreCat = categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1);
    modalCatTitulo.textContent = `Elegir de ${nombreCat}`;

    productosFiltrados.forEach(prod => {
      const isFav = favoritosGuardados.includes(prod.id);
      
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        ${isFav ? '<i data-lucide="star" class="fav-star"></i>' : ''}
        <img src="${prod.svg}" alt="${prod.nombre}" onerror="this.src='../svg/Planta.svg'">
        <span>${prod.nombre}</span>
      `;

      card.addEventListener('click', () => {
        agregarProductoALista(prod);
        modalProductos.classList.remove('active');
      });

      gridProductos.appendChild(card);
    });

    modalProductos.classList.add('active');
    lucide.createIcons();
  });

  closeModalProducts.addEventListener('click', () => {
    modalProductos.classList.remove('active');
  });
  
  modalProductos.addEventListener('click', (e) => {
    if (e.target.id === 'modalProductos') {
      modalProductos.classList.remove('active');
    }
  });

  function agregarProductoALista(producto) {
    contadorGlobal++;
    const idUnico = `calc-item-${contadorGlobal}`;

    const item = document.createElement('div');
    item.className = 'calc-item';
    item.id = idUnico;
    item.dataset.productoId = producto.id; 
    
    // 👇 NUEVA ESTRUCTURA: Fila superior (Info + Select + Eliminar) y Fila inferior (Cantidades)
    item.innerHTML = `
      <div class="calc-item-top">
        <div class="calc-item-info">
          <img src="${producto.svg}" alt="${producto.nombre}" onerror="this.src='../svg/Planta.svg'">
          <div class="calc-item-text">
            <div class="calc-item-title">${producto.nombre}</div>
            <div class="calc-item-sub">${producto.catKey.charAt(0).toUpperCase() + producto.catKey.slice(1)}</div>
          </div>
        </div>
        
        <div class="calc-item-actions-top">
          <select class="item-calidad">
            <option value="normal">Normal</option>
            <option value="plata">Plata</option>
            <option value="oro">Oro</option>
            <option value="iridio">Iridio</option>
          </select>
          <button class="btn-remove"><i data-lucide="trash-2"></i></button>
        </div>
      </div>

      <div class="calc-item-bottom">
        <div class="qty-control">
          <button class="qty-btn minus">-</button>
          <input type="number" class="item-cantidad" value="1" min="1">
          <button class="qty-btn plus">+</button>
        </div>
        
        <div class="quick-btns">
          <button class="quick-btn" data-add="5">+5</button>
          <button class="quick-btn" data-add="10">+10</button>
          <button class="quick-btn" data-add="100">+100</button>
        </div>
      </div>
    `;

    const inputCantidad = item.querySelector('.item-cantidad');
    const selectCalidad = item.querySelector('.item-calidad');

    const actualizarColorCalidad = () => {
      item.classList.remove('calidad-normal', 'calidad-plata', 'calidad-oro', 'calidad-iridio');
      item.classList.add(`calidad-${selectCalidad.value}`);
    };

    selectCalidad.addEventListener('change', () => {
      actualizarColorCalidad();
      calcularTotal();
    });

    actualizarColorCalidad();

    item.querySelector('.minus').addEventListener('click', () => {
      let val = parseInt(inputCantidad.value) || 1;
      if (val > 1) {
        inputCantidad.value = val - 1;
        calcularTotal();
      }
    });

    item.querySelector('.plus').addEventListener('click', () => {
      let val = parseInt(inputCantidad.value) || 1;
      inputCantidad.value = val + 1;
      calcularTotal();
    });

    item.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const addValue = parseInt(btn.dataset.add);
        let currentVal = parseInt(inputCantidad.value) || 0;
        inputCantidad.value = currentVal + addValue;
        calcularTotal();
      });
    });

    item.querySelector('.btn-remove').addEventListener('click', () => {
      item.remove();
      calcularTotal();
      if(listaCalculo.querySelectorAll('.calc-item').length === 0) {
        listaCalculo.innerHTML = '<p class="empty-msg">No has agregado ningún producto.</p>';
      }
    });

    const emptyMsg = listaCalculo.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();

    listaCalculo.appendChild(item);
    lucide.createIcons();

    inputCantidad.addEventListener('input', calcularTotal);

    calcularTotal();
  }

  function calcularTotal() {
    let total = 0;
    const items = document.querySelectorAll('.calc-item');

    items.forEach(item => {
      const productoId = item.dataset.productoId;
      const producto = todosLosProductos.find(p => p.id === productoId);
      
      if (producto) {
        const calidad = item.querySelector('.item-calidad').value;
        const cantidad = parseInt(item.querySelector('.item-cantidad').value) || 0;
        total += (producto.precios[calidad] * cantidad);
      }
    });

    totalGanancias.textContent = `${total}g`;
  }
});