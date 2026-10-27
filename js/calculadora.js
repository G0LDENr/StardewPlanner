document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const btnAbrirModal = document.getElementById('btnAbrirModal');
  const modalProductos = document.getElementById('modalProductos');
  const closeModalProducts = document.getElementById('closeModalProducts');
  const gridProductos = document.getElementById('gridProductos');
  const modalCatTitulo = document.getElementById('modalCatTitulo');
  const listaCalculo = document.getElementById('listaCalculo');
  const totalGanancias = document.getElementById('totalGanancias');
  const btnCalcular = document.getElementById('btnCalcular');
  const botonesCat = document.querySelectorAll('.cat-btn[data-cat]');

  let categoriaSeleccionada = 'cultivos'; // Por defecto Cultivos
  let contadorGlobal = 0;

  // Juntar todas las bases de datos
  const todosLosProductos = [
    ...databaseCultivos.map(p => ({ ...p, catKey: "cultivos" })),
    ...databasePeces.map(p => ({ ...p, catKey: "pesca" })),
    ...databaseAnimal.map(p => ({ ...p, catKey: "animal" }))
  ];

  // 1. Lógica para seleccionar categoría
  botonesCat.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar active-cat de todos
      botonesCat.forEach(b => b.classList.remove('active-cat'));
      // Añadir al seleccionado
      btn.classList.add('active-cat');
      categoriaSeleccionada = btn.dataset.cat;
    });
  });

  // 2. Lógica para ABRIR el modal
  btnAbrirModal.addEventListener('click', () => {
    // Limpiamos la cuadrícula antes de llenarla
    gridProductos.innerHTML = '';
    
    // Filtramos los productos según la categoría seleccionada
    const productosFiltrados = todosLosProductos.filter(p => p.catKey === categoriaSeleccionada);

    // Cambiamos el título del modal
    const nombreCat = categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1);
    modalCatTitulo.textContent = `Elegir de ${nombreCat}`;

    // Creamos las tarjetas de productos para el modal
    productosFiltrados.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${prod.svg}" alt="${prod.nombre}" onerror="this.src='../svg/Planta.svg'">
        <span>${prod.nombre}</span>
      `;

      // Al hacer clic en un producto, lo agregamos a la calculadora y cerramos el modal
      card.addEventListener('click', () => {
        agregarProductoALista(prod);
        modalProductos.classList.remove('active');
      });

      gridProductos.appendChild(card);
    });

    // Mostramos el modal
    modalProductos.classList.add('active');
    lucide.createIcons(); // Recargar iconos de lucide dentro del modal
  });

  // 3. Cerrar el modal
  closeModalProducts.addEventListener('click', () => {
    modalProductos.classList.remove('active');
  });
  
  // Cerrar modal al tocar el fondo oscuro
  modalProductos.addEventListener('click', (e) => {
    if (e.target.id === 'modalProductos') {
      modalProductos.classList.remove('active');
    }
  });

  // 4. Función para agregar un producto a la lista de la calculadora
  function agregarProductoALista(producto) {
    contadorGlobal++;
    const idUnico = `calc-item-${contadorGlobal}`;

    const item = document.createElement('div');
    item.className = 'calc-item';
    item.id = idUnico;
    item.dataset.productoId = producto.id; 
    
    item.innerHTML = `
      <img src="${producto.svg}" alt="${producto.nombre}" onerror="this.src='../svg/Planta.svg'">
      <div class="calc-item-info">
        <div class="calc-item-title">${producto.nombre}</div>
        <div class="calc-item-sub">${producto.catKey.charAt(0).toUpperCase() + producto.catKey.slice(1)}</div>
      </div>
      <div class="calc-item-controls">
        <select class="item-calidad">
          <option value="normal">Normal</option>
          <option value="plata">Plata</option>
          <option value="oro">Oro</option>
          <option value="iridio">Iridio</option>
        </select>
        <div class="qty-control">
          <button class="qty-btn minus">-</button>
          <input type="number" class="item-cantidad" value="1" min="1">
          <button class="qty-btn plus">+</button>
        </div>
        <button class="btn-remove"><i data-lucide="trash-2"></i></button>
      </div>
    `;

    const inputCantidad = item.querySelector('.item-cantidad');
    const selectCalidad = item.querySelector('.item-calidad');

    // Función para cambiar el color de fondo de la tarjeta
    const actualizarColorCalidad = () => {
      item.classList.remove('calidad-normal', 'calidad-plata', 'calidad-oro', 'calidad-iridio');
      item.classList.add(`calidad-${selectCalidad.value}`);
    };

    selectCalidad.addEventListener('change', () => {
      actualizarColorCalidad();
      calcularTotal();
    });

    actualizarColorCalidad();

    // Botones de cantidad (+ y -)
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

    // Borrar producto
    item.querySelector('.btn-remove').addEventListener('click', () => {
      item.remove();
      calcularTotal();
      if(listaCalculo.querySelectorAll('.calc-item').length === 0) {
        listaCalculo.innerHTML = '<p class="empty-msg">No has agregado ningún producto.</p>';
      }
    });

    // Eliminar mensaje de vacío si existe
    const emptyMsg = listaCalculo.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();

    listaCalculo.appendChild(item);
    lucide.createIcons();

    inputCantidad.addEventListener('input', calcularTotal);

    calcularTotal();
  }

  // 5. Función para calcular el total
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

  // Botón calcular (efecto visual)
  btnCalcular.addEventListener('click', () => {
    calcularTotal();
    totalGanancias.style.transform = "scale(1.1)";
    setTimeout(() => totalGanancias.style.transform = "scale(1)", 200);
  });
});