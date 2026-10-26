document.addEventListener('DOMContentLoaded', () => {
  const selectProducto = document.getElementById('selectProducto');
  const btnAgregar = document.getElementById('btnAgregar');
  const listaCalculo = document.getElementById('listaCalculo');
  const totalGanancias = document.getElementById('totalGanancias');
  const btnCalcular = document.getElementById('btnCalcular');

  let contadorGlobal = 0;

  const todosLosProductos = [
    ...databaseCultivos.map(p => ({ ...p, categoria: "Cultivo" })),
    ...databasePeces.map(p => ({ ...p, categoria: "Pez" })),
    ...databaseAnimal.map(p => ({ ...p, categoria: "Animal" }))
  ];

  todosLosProductos.forEach(producto => {
    const option = document.createElement('option');
    option.value = producto.id;
    option.textContent = `${producto.nombre} (${producto.categoria})`;
    selectProducto.appendChild(option);
  });

  btnAgregar.addEventListener('click', () => {
    const idSeleccionado = selectProducto.value;
    if (!idSeleccionado) return; 

    const producto = todosLosProductos.find(p => p.id === idSeleccionado);
    
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
        <div class="calc-item-sub">${producto.categoria}</div>
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

    // 👇 FUNCIÓN PARA CAMBIAR EL COLOR DEL CARD SEGÚN LA CALIDAD
    const actualizarColorCalidad = () => {
      // Quitamos cualquier clase de color anterior
      item.classList.remove('calidad-normal', 'calidad-plata', 'calidad-oro', 'calidad-iridio');
      // Agregamos la clase nueva según el valor seleccionado
      item.classList.add(`calidad-${selectCalidad.value}`);
    };

    // Escuchar el cambio de calidad
    selectCalidad.addEventListener('change', () => {
      actualizarColorCalidad();
      calcularTotal();
    });

    // Llamamos a la función al inicio por si acaso
    actualizarColorCalidad();

    // Botones de cantidad
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

    // Borrar fila
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

    selectProducto.value = ""; 
    calcularTotal();
  });

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

  btnCalcular.addEventListener('click', () => {
    calcularTotal();
    totalGanancias.style.transform = "scale(1.1)";
    setTimeout(() => totalGanancias.style.transform = "scale(1)", 200);
  });
});