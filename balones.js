var tarjetasContainer = document.getElementById('tarjetas-container');

const valores = {
    montoTotal: 0,
    envio: 0
}

let itemsCarrito = [];
balones = [
    {
        nombre: 'Balon 1',
        descripcion: 'Esta balon es perfecto para iniciar en el mundo del basketball.',
        urlImg: 'src/prdct_1.png',
        precio: 8000.0
    },
    {
        nombre: 'Balon 2',
        descripcion: 'Ideal para partidos casuales en la playa o en el parque.',
        urlImg: 'src/prdct_2.png',
        precio: 10000.0
    },
    {
        nombre: 'Balon 3',
        descripcion: 'Un balón resistente y duradero, diseñado para jugadores de todos los niveles.',
        urlImg: 'src/prdct_3.png',
        precio: 3000.0
    },
    {
        nombre: 'Balon 4',
        descripcion: 'Con un diseño llamativo y colores brillantes, este balón es perfecto para destacar en la cancha.',
        urlImg: 'src/prdct_1.png',
        precio: 5000.0
    },
    {
        nombre: 'Balon 5',
        descripcion: 'Un balón de alta calidad con un agarre superior y un rebote consistente.',
        urlImg: 'src/prdct_2.png',
        precio: 6000.0
    }
]
function armarTarjeta(item) {
    console.log('url balon', item.urlImg)
    return `
    <div class="col-sm-4 center tarjeta"> <!-- Aquí se agrega la clase .tarjeta -->
        <div class="card product" style="width: 18rem;">
            <img src="${item.urlImg}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title center">${item.nombre}</h5>
                <p class="card-text">${item.descripcion}</p>
                <a href="#" class="btn btn-primary d-flex justify-content-center align-items-center btn-comprar">Comprar</a>
            </div>
        </div>
    </div>   
        `
}
function elementoCarrito(item) {
    return `
    <div class="col-md-8">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.urlImg}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="card-text"><small class="text-muted"> $ ${item.precio}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

document.addEventListener('DOMContentLoaded', function () {
    itemsCarrito = JSON.parse(localStorage.getItem('carrito'));
    if (itemsCarrito.length > 0) {
        recargarCarrito();
    }
    let tarjetasContainer = document.getElementById('tarjetas-container');
    if (tarjetasContainer) {
        balones.forEach(function (balon) {
            let tarjetaHTML = armarTarjeta(balon);
            tarjetasContainer.innerHTML += tarjetaHTML;
        });
    }
    let eliminarCarrito = document.getElementById('limpiar-carro');
    if(eliminarCarrito) {
        eliminarCarrito.addEventListener('click',(e)=> {
            e.preventDefault();
            itemsCarrito = [];
            recargarCarrito();
            guardarCarrito();
        })
    }


    let tarjetas = document.querySelectorAll('.btn-comprar');
    if (tarjetas) {
        tarjetas.forEach(function (tarjeta, index) {
            tarjeta.addEventListener('click', function (e) {
                e.preventDefault();
                let balon = balones[index];
                agregarACarrito(balon);
            });
        });
    }


});

function actualizarCarrito(valores) {
    return `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Resumen del Carrito</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Subtotal
                    <span class="badge bg-primary">$${valores.montoTotal}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Envío
                    <span class="badge bg-primary">$${valores.envio ? valores.envio : 0}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Total
                    <span class="badge bg-primary">$${valores.montoTotal + valores.envio}</span>
                </li>
            </ul>
            <button type="button" class="btn btn-success mt-3">Finalizar Compra</button>
            <button type="button" class="btn btn-danger mt-3" id="limpiar-carro">Limpiar carrito</button>
        </div>
    </div>
    `;
}

function agregarACarrito(balon) {
    console.log('Mostrando detalles del objeto:', balon);
    itemsCarrito.push(balon);
    recargarCarrito();
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(itemsCarrito));
}

function recargarCarrito() {
    console.log('items carrito', itemsCarrito)
    let carrito = document.getElementById('contenedor-carrito');
    carrito.innerHTML = '';
    valores.envio = 0;
    valores.montoTotal = 0;
    itemsCarrito.forEach((item) => {
        console.log('item a agregar', item);
        const itemCarrito = elementoCarrito(item);
        carrito.innerHTML += itemCarrito;
        valores.montoTotal += item.precio;
    })
    agregarAlResumen();
}

function calcularEnvio() {
    if (valores.montoTotal >= 50000) {
        valores.envio = 0;
    }
    else if(valores.montoTotal == 0) {
        valores.envio = 0;
    }
    else {
        valores.envio = 7000;
    }
}

function agregarAlResumen() {
    
    calcularEnvio();
    let resumen = document.getElementById('resumen-carrito');
    htmlResumen = actualizarCarrito(valores);
    resumen.innerHTML = htmlResumen;
}