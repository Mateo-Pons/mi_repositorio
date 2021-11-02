/* // class Productos {
//     constructor(id,imagen,nombre,descripcion){
//         this.id = id;
//         this.imagen = imagen;
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//     }
// }

// const stock = [
//     new Productos(1,'../imagenes/caffe1.jpg','Honey Premium Coffee','Grano rubio dulce sabor robusto pero simpatico.'),
//     new Productos(2,'../imagenes/caffe2.jpg','Anatolian Coffee','Grano importado de Bangladesh, tintes acidos con una fortaleza innata.'),
//     new Productos(3,'../imagenes/caffe3.jpg','Classic CoffeeStore Coffee','Cafe Clasico pero con su touch de vuelta.'),
//     new Productos(4,'../imagenes/leche.png','Leche','Leche espumosa, de la mejor calidad')
// ]


$.getJSON('../productos.json', function (data) {
  
    data.forEach(card => {
        let cartas = document.querySelector('.cartas');
        cartas.innerHTML +=
        `
        <div class="card" style="width: 18rem;">
            <img src="${card.imagen}" class="card-img-top" alt="Cafe Honey Premium">
            <div class="card-body">
            <h5 class="card-title">${card.nombre}</h5>
            <p class="card-text">${card.descripcion}</p>
            <p class="card-text">Hoy 25% Descuento!</p>
            <a href="#" class="btn">Lo quiero!</a>
            </div>
        </div>
        `
        cartas.appendChild(div)
        let boton = document.getElementById(`botonaso${card.id}`);
        console.log(boton)
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            agregado(card.id)
        })
    })
})



$(".cartas").mouseenter(function(){
    $(".navigation").delay(1000).slideUp();
});

$(".cartas").mouseleave(function(){
    $(".navigation").delay(1500).slideDown();
});



 */
