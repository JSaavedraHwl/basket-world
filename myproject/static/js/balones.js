var tarjetasContainer = document.getElementById('tarjetas-container');

const valores = {
    montoTotal: 0,
    envio: 0
}

let itemsCarrito = [];
// let balones = [
//     {
//         nombre: 'Balon 1',
//         descripcion: 'Esta balon es perfecto para iniciar en el mundo del basketball.',
//         urlImg: 'src/prdct_1.png',
//         precio: 8000.0
//     },
//     {
//         nombre: 'Balon 2',
//         descripcion: 'Ideal para partidos casuales en la playa o en el parque.',
//         urlImg: 'src/prdct_2.png',
//         precio: 10000.0
//     },
//     {
//         nombre: 'Balon 3',
//         descripcion: 'Un balón resistente y duradero, diseñado para jugadores de todos los niveles.',
//         urlImg: 'src/prdct_3.png',
//         precio: 3000.0
//     },
//     {
//         nombre: 'Balon 4',
//         descripcion: 'Con un diseño llamativo y colores brillantes, este balón es perfecto para destacar en la cancha.',
//         urlImg: 'src/prdct_1.png',
//         precio: 5000.0
//     },
//     {
//         nombre: 'Balon 5',
//         descripcion: 'Un balón de alta calidad con un agarre superior y un rebote consistente.',
//         urlImg: 'src/prdct_2.png',
//         precio: 6000.0
//     }
// ]
let productos = [];

const consumirApi = async (url) => {
    const response = (await fetch(url))
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;
}
function armarTarjeta(item) {
    console.log('url balon', item.urlImg)
    return `
    <div class="col-sm-4 center tarjeta"> <!-- Aquí se agrega la clase .tarjeta -->
        <div class="card product" style="width: 18rem;">
            <img src="{% static img/${item.urlImg}%}" class="card-img-top" alt="...">
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
    let imageUrl = staticBaseUrl + item.urlImg; // Construir la URL completa
        return `
        <div class="col-md-12">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imageUrl}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Cantidad: ${item.cantidad}</p>
                            <p class="card-text"><small class="text-muted">$ ${item.precio} c/u</small></p>
                            <p class="card-text"><small class="text-muted">Total: $ ${item.precio * item.cantidad}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

document.addEventListener('DOMContentLoaded', async function () {
    var botonesProductos = document.querySelectorAll('.btn-comprar');
    productos = await consumirApi('/obtener_productos/'+ document.title.toLowerCase());
    // Agregar un controlador de eventos click a cada botón
    botonesProductos.forEach(function(boton) {
        boton.addEventListener('click', function(event) {
            event.preventDefault();
            // Obtener el ID del botón clickeado
            console.log('hola')
            let idProducto = event.target.id;
            
            const producto = productos.find((item)=> item.id == idProducto);
            agregarACarrito(producto);
            console.log(producto);
        });
    });
    if (document.title === 'Balones') {
        //balones = await consumirApi('https://63f7815f833c7c9c6085d07b.mockapi.io/api/v1/planes-netflix/balones');
    }
    if (document.title.trim() === 'Camisas') {
        //camisas = await consumirApi('https://63f7815f833c7c9c6085d07b.mockapi.io/api/v1/planes-netflix/camisas');
    }

    if( camisas.length > 0) {
        cargarTarjetasPolera();
    }
    agregarAlResumen();
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
        itemsCarrito = carrito;
        if (itemsCarrito.length > 0) {
            recargarCarrito();
        }
    }
    //cargarTarjetasAccesorios();

    let resumen = document.getElementById('resumen-carrito');
    htmlResumen = actualizarCarrito(valores);
    resumen.innerHTML = htmlResumen;
    let tarjetasContainer = document.getElementById('tarjetas-container');
    if (tarjetasContainer) {
        balones.forEach(function (balon) {
            let tarjetaHTML = armarTarjeta(balon);
            tarjetasContainer.innerHTML += tarjetaHTML;
        });
    }



    if (document.title === 'Balones') {
        
    }

    if (document.title === 'Camisas') {
        
    }
    if (document.title === 'Accesorios') {
        
    }

    let eliminarCarrito = document.getElementById('limpiar-carro');
    if (eliminarCarrito) {
        console.log('se encontro el boton limpiar')
        eliminarCarrito.addEventListener('click', (e) => {
            e.preventDefault();
            itemsCarrito = [];
            recargarCarrito();
            guardarCarrito();
        })
    }
});

function actualizarCarrito(valores) {
    return `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Resumen del Carrito</h5>
            <ul class="list-group list-group-flush" id="lista-valores">         
            </ul>
            <button type="button" class="btn btn-success mt-3">Finalizar Compra</button>
            <button type="button" class="btn btn-danger mt-3" id="limpiar-carro">Limpiar carrito</button>
        </div>
    </div>
    `;
}
function recargarValores() {
    const listaValores = document.getElementById('lista-valores');
    if (listaValores) {
        listaValores.innerHTML = `
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
            </li>`;
    }
}

function agregarACarrito(balon) {
    console.log('Mostrando detalles del objeto:', balon);
    itemsCarrito.push(balon);
    recargarCarrito();
    guardarCarrito();
}

function agregarACarrito2(accesorio) {
    console.log('Mostrando detalles del objeto:', accesorio);
    itemsCarrito.push(accesorio);
    recargarCarrito();
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(itemsCarrito));
}

function recargarCarrito() {
    console.log('items carrito', itemsCarrito);
    let carritoElement = document.getElementById('contenedor-carrito');
    carritoElement.innerHTML = '';
    valores.envio = 0;
    valores.montoTotal = 0;

    // Agrupar productos por ID
    let groupedItems = itemsCarrito.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = {...item, cantidad: 1};
        } else {
            acc[item.id].cantidad += 1;
        }
        return acc;
    }, {});

    for (let id in groupedItems) {
        const item = groupedItems[id];
        const itemCarrito = elementoCarrito(item);
        carritoElement.innerHTML += itemCarrito;
        valores.montoTotal += item.precio * item.cantidad;
    }

    agregarAlResumen();
}

function calcularEnvio() {
    if (valores.montoTotal >= 50000) {
        valores.envio = 0;
    } else if (valores.montoTotal == 0) {
        valores.envio = 0;
    } else {
        valores.envio = 7000;
    }
}

function agregarAlResumen() {

    calcularEnvio();

    recargarValores();
}

//FUNCIONALIDAD ACCESORIOS


function armarTarjetaAccs(objeto) {
    return `<div class="col-sm-4 center">
    <div class="card product" style="width: 18rem;">
        <img src="${objeto.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title center">${objeto.nombre}</h5>
            <p class="card-text">${objeto.descripcion}</p>
            <a href="#" class="btn btn-primary d-flex justify-content-center align-items-center btn-comprar">Comprar</a>
            </div>
        </div>
</div>`
}

// funcionalidad poleras //

// camisas = [
//     {
//         nombre: 'Celtic N°0',
//         descripcion: 'Celti N°0 Version adulto 2024',
//         urlImg: 'productos/camisas/cam_1.png',
//         precio: 15000.0,
//     },
//     {
//         nombre: 'Warriors N°4',
//         descripcion: 'Warrios N°4 Version adulto 2024',
//         urlImg: 'productos/camisas/cam_2.png',
//         precio: 16000.0
//     },
//     {
//         nombre: 'Bulls N°23',
//         descripcion: 'Bulls N°23 Version adulto 2024',
//         urlImg: 'productos/camisas/cam_3.png',
//         precio: 20000.0
//     },
//     {
//         nombre: 'Celtic N°0',
//         descripcion: 'Celtic N°0 Version Niño',
//         urlImg: 'productos/camisas/cam_1.png',
//         precio: 10000.0
//     },
//     {
//         nombre: 'Warriors N°4',
//         descripcion: 'Warriors N°4 Version Niño',
//         urlImg: 'productos/camisas/cam_2.png',
//         precio: 8000.0
//     },
//     {
//         nombre: 'Bulls N°23',
//         descripcion: 'Bulls N°23 Version Niño',
//         urlImg: 'productos/camisas/cam_3.png',
//         precio: 12000.0
//     }
// ]
let camisas = [];
function cargarTarjetasPolera() {
    const elemento = document.getElementById('cards-poleras');

    if (elemento) {
        for (let i = 0; i < camisas.length; i++) {
            const polera = camisas[i];
            elemento.innerHTML += armarTarjetaPoleras(polera);
        }
    }
}
1
function armarTarjetaPoleras(objeto) {
    console.log('estoy aca??')
    return `
        <div class="col-sm-4 center">
            <div class="card product" style="width: 18rem;">
                <img src="{% static 'img/productos/body/balon_img.png' %}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title center">${objeto.nombre}</h5>
                    <p class="card-text">${objeto.descripcion}</p>
                    <a href="#" class="btn btn-primary d-flex justify-content-center align-items-center btn-comprar">Comprar</a>
                    </div>
                </div>
        </div>
        `
}



