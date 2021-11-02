let carritoDeCompras = []

let stockProductos = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

let finalizar = document.getElementById('finalizarCompra');
let buscador = document.getElementById('buscar');

function recuperarStock() {
  let stock = JSON.parse(localStorage.getItem('stock'))//recupero del localStorage los productos guardados
  if(stock){
    stock.forEach(el => stockProductos.push(el))
  }
}

$.getJSON('../productos.json', function (respuesta) {// getJson lee el archivo json, y nos muestra el contenido con el parametro "respuesta"
  console.log(respuesta)

  localStorage.setItem('stock', JSON.stringify(respuesta))//guardar en el localStorage los productos que recibo de Json
  recuperarStock();

  mostrarProductos(respuesta);

  recuperarCarrito();

  buscador.addEventListener('change', function () {
    
    let texto = buscador.value;
    console.log(texto)
    let buscado = stockProductos.filter(el => el.nombre.toLowerCase().includes(texto))
    mostrarProductos(buscado)
  })

})




function mostrarProductos(array) {
  contenedorProductos.innerHTML='';
    array.forEach(producto => {

        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += 
        `<div class="card" style="width: 18rem;">
                <img src=${producto.img} class="card-img-top" alt='${producto.tipo}'>
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.desc}</p>
            <a href="#" class="btn" id=boton${producto.id}>Agregar</a>
            </div>
        </div>
        `
        contenedorProductos.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', (e) => {
            e.preventDefault();
            agregarAlCarrito(producto.id)
            Toastify({
              text: "😀 Producto Agregado",
              className: "info",
              style: {
                background: "rgb(6, 233, 146)",
              }
            }).showToast();
        })

    });
}   


function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(productoR => productoR.id == id);
    if (repetido) {
        repetido.cantidad = repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(prod => prod.id == id);
        console.log(productoAgregar)
        carritoDeCompras.push(productoAgregar);

        productoAgregar.cantidad = 1;
        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = 
        `
              <div class="contenedor-carrito">
                <h5 class="producto-titutlo">${productoAgregar.nombre}</h5>
                <p>Precio:${productoAgregar.precio}</p>
                <p id=cantidad${productoAgregar.id}>Cantidad:${productoAgregar.cantidad}</p>
                <button id=eliminar${productoAgregar.id}><i class="fas fa-trash-alt"></i></button>
              </div>
        `

        contenedorCarrito.appendChild(div)
        actualizarCarrito()
        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(el => el.id != productoAgregar.id);
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
            actualizarCarrito();
            Toastify({
              text: "😦 Producto Eliminado",
              className: "info",
              style: {
                background: "red",
              }
            }).showToast();
        })


        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    }

}

function recuperarCarrito() {
  let stockCarrito = JSON.parse(localStorage.getItem('carrito'))
  console.log(stockCarrito)
  if(stockCarrito){
    stockCarrito.forEach(el => agregarAlCarrito(el.id))
  }
  
}



function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}


finalizar.addEventListener('click', function () {
  carritoDeCompras= [];
  contenedorCarrito.innerHTML= '';
  localStorage.clear()
  actualizarCarrito()
  Swal.fire({
    icon: 'success',
    title: 'OK🤙',
    text: 'Su compra ha sido realizada!',
    footer: '<p>N° de Orden: sad54654asdas54f321</p>'
  })
})



