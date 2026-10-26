document.addEventListener('DOMContentLoaded', () => {
  const selectProducto = document.getElementById('selectProducto');
  const btnAgregar = document.getElementById('btnAgregar');
  const listaCalculo = document.getElementById('listaCalculo');
  const totalGanancias = document.getElementById('totalGanancias');
  const btnCalcular = document.getElementById('btnCalcular');

  let contadorId = 0; // Contador para darle un ID único a CADA producto agregado

  // 1. Unimos todas las bases de datos en una sola
  const todosLosProductos = [
    ...databaseCultivos.map(p => ({ ...p, categoria: "Cultivo" })),
    ...databasePeces.map(p => ({ ...p, categoria: "Pez" })),
    ...databaseAnimal.map(p => ({ ...p, categoria: "Animal" }))
  ];

  // 2. Llenamos el <select> con los productos
  todosLosProductos.forEach(producto => {
    const option = document.createElement('option');
    option.value = producto.id;
    option.textContent = `${producto.nombre} (${producto.categoria})`;
    selectProducto.appendChild(option);
  });

  // 3. Función para agregar un producto a la lista
  btnAgregar.addEventListener('click', () => {
    const idSeleccionado = selectProducto.value;
    if (!idSeleccionado) return; // Si no selecciona nada, no hace nada

    const producto = todosLosProductos.find(p => p.id === idSeleccionado);
    
    // Generamos un ID ÚNICO para esta fila (no importa si es el mismo producto)
    contadorId++;
    const uniqueId = `item-${producto.id}-${contadorId}`;

    const item = document.createElement('div');
    item.className = 'calc-item';
    item.id = uniqueId;
    
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

    // Lógica de los botones de cantidad (+ y -)
    const inputCantidad = item.querySelector('.item-cantidad');
    
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

    // Borrar item
    item.querySelector('.btn-remove').addEventListener('click', () => {
      item.remove();
      calcularTotal();
      if(listaCalculo.querySelectorAll('.calc-item').length === 0) {
        listaCalculo.innerHTML = '<p class="empty-msg">No has agregado ningún producto.</p>';
      }
    });

    // Borrar mensaje de vacío si existe
    const emptyMsg = listaCalculo.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();

    listaCalculo.appendChild(item);
    lucide.createIcons();

    // Escuchar cambios para recalcular
    inputCantidad.addEventListener('input', calcularTotal);
    item.querySelector('.item-calidad').addEventListener('change', calcularTotal);

    // Resetear el select para que puedas elegir otro
    selectProducto.value = "";
    
    // Calcular de inmediato al agregar
    calcularTotal();
  });

  // 4. Función para calcular el total
  function calcularTotal() {
    let total = 0;
    const items = document.querySelectorAll('.calc-item');

    items.forEach(item => {
      // Obtenemos el ID base separando por guiones (el ID original no tiene guiones)
      const partesId = item.id.split('-');
      const idBase = partesId[1]; 
      
      const producto = todosLosProductos.find(p => p.id === idBase);
      
      const calidad = item.querySelector('.item-calidad').value;
      const cantidad = parseInt(item.querySelector('.item-cantidad').value) || 0;

      if (producto) {
        total += (producto.precios[calidad] * cantidad);
      }
    });

    totalGanancias.textContent = `${total}g`;
  }

  // Botón de calcular (opcional, ya que se actualiza en tiempo real)
  btnCalcular.addEventListener('click', () => {
    calcularTotal();
    totalGanancias.style.transform = "scale(1.1)";
    setTimeout(() => totalGanancias.style.transform = "scale(1)", 200);
  });
});