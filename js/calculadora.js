document.addEventListener('DOMContentLoaded', () => {
  const selectProducto = document.getElementById('selectProducto');
  const btnAgregar = document.getElementById('btnAgregar');
  const listaCalculo = document.getElementById('listaCalculo');
  const totalGanancias = document.getElementById('totalGanancias');
  const btnCalcular = document.getElementById('btnCalcular');

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
    
    // Si ya está en la lista, no lo duplicamos
    if (document.getElementById(`item-${producto.id}`)) {
      alert("Este producto ya está en la lista. Cambia la cantidad ahí.");
      return;
    }

    // Creamos el HTML del item
    const item = document.createElement('div');
    item.className = 'calc-item';
    item.id = `item-${producto.id}`;
    
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
        <div style="display:flex; gap:5px; align-items:center;">
          <input type="number" class="item-cantidad" value="1" min="1">
          <button class="btn-remove"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    `;

    // Lógica para eliminar el item
    item.querySelector('.btn-remove').addEventListener('click', () => {
      item.remove();
      calcularTotal(); // Recalculamos al borrar
      if(listaCalculo.children.length === 0) {
        listaCalculo.innerHTML = '<p class="empty-msg">No has agregado ningún producto.</p>';
      }
    });

    // Reemplazamos el mensaje de vacío si existe
    const emptyMsg = listaCalculo.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();

    listaCalculo.appendChild(item);
    lucide.createIcons(); // Cargar el icono del bote de basura

    // Escuchar cambios en la cantidad o calidad para recalcular
    item.querySelector('.item-cantidad').addEventListener('input', calcularTotal);
    item.querySelector('.item-calidad').addEventListener('change', calcularTotal);

    // Reseteamos el select
    selectProducto.value = "";
  });

  // 4. Función para calcular el total
  function calcularTotal() {
    let total = 0;
    const items = document.querySelectorAll('.calc-item');

    items.forEach(item => {
      const idProducto = item.id.replace('item-', '');
      const producto = todosLosProductos.find(p => p.id === idProducto);
      
      const calidad = item.querySelector('.item-calidad').value;
      const cantidad = parseInt(item.querySelector('.item-cantidad').value) || 0;

      // Obtenemos el precio según la calidad seleccionada
      const precioUnitario = producto.precios[calidad];
      total += (precioUnitario * cantidad);
    });

    totalGanancias.textContent = `${total}g`;
  }

  // Botón de calcular (por si se quiere forzar, aunque se actualiza en tiempo real)
  btnCalcular.addEventListener('click', () => {
    calcularTotal();
    // Un pequeño efecto visual
    totalGanancias.style.transform = "scale(1.1)";
    setTimeout(() => totalGanancias.style.transform = "scale(1)", 200);
  });
});