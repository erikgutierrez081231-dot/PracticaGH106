let total = 0;
let cantidadProductos = 0;
let carrito = [];

function comprar(nombre, precio, idCantidad) {
  const cantidad = parseInt(document.getElementById(idCantidad).value);
  total += precio * cantidad;
  cantidadProductos += cantidad;

  carrito.push({ nombre, precio, cantidad });
  guardarCarrito();

  const lista = document.getElementById("listaPedidos");
  const item = document.createElement("li");
  item.textContent = `${nombre} x${cantidad} - $${precio * cantidad} MXN`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.style.marginLeft = "10px";
  btnEliminar.onclick = function() {
    total -= precio * cantidad;
    cantidadProductos -= cantidad;
    lista.removeChild(item);
    carrito = carrito.filter(p => !(p.nombre === nombre && p.cantidad === cantidad));
    guardarCarrito();
    actualizarCarrito();
  };

  item.appendChild(btnEliminar);
  lista.appendChild(item);

  actualizarCarrito();
  animarCarrito();
}

function actualizarCarrito() {
  document.getElementById("total").innerText = "Total: $" + total + " MXN";
  document.getElementById("contador").innerText = cantidadProductos;
}

function aplicarCupon() {
  const cupon = document.getElementById("cupon").value.trim();
  if (cupon === "DESCUENTO10") {
    total = total * 0.9; // 10% descuento
    alert("Cupón aplicado: 10% de descuento");
    actualizarCarrito();
    guardarCarrito();
  } else {
    alert("Cupón inválido");
  }
}

function confirmarCompra() {
  if (cantidadProductos > 0) {
    alert("¡Gracias por tu compra! Total: $" + total + " MXN");
    vaciarCarrito();
  } else {
    alert("El carrito está vacío.");
  }
}

function vaciarCarrito() {
  total = 0;
  cantidadProductos = 0;
  carrito = [];
  document.getElementById("listaPedidos").innerHTML = "";
  actualizarCarrito();
  guardarCarrito();
}

function animarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.classList.add("saltar");
  setTimeout(() => carritoDiv.classList.remove("saltar"), 300);
}

// Persistencia con LocalStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
  localStorage.setItem("cantidadProductos", cantidadProductos);
}

function cargarCarrito() {
  const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = guardado;
  total = parseFloat(localStorage.getItem("total")) || 0;
  cantidadProductos = parseInt(localStorage.getItem("cantidadProductos")) || 0;

  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";
  carrito.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad} MXN`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = function() {
      total -= p.precio * p.cantidad;
      cantidadProductos -= p.cantidad;
      lista.removeChild(item);
      carrito = carrito.filter(prod => !(prod.nombre === p.nombre && prod.cantidad === p.cantidad));
      guardarCarrito();
      actualizarCarrito();
    };

    item.appendChild(btnEliminar);
    lista.appendChild(item);
  });

  actualizarCarrito();
}

// Cargar carrito al iniciar
window.onload = cargarCarrito;