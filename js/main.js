const productos = [
    {
        id: "1",
        titulo: "Puyaso 2lb",
        imagen: "productos/culotte.JPEG",
        categoria: {
            nombre:"Res",
            id: "res"
        },
        precio: 175
    },
    {
        id: "2",
        titulo: "Lomito 2lb",
        imagen: "productos/lomito.JPEG",
        categoria: {
            nombre:"Res",
            id: "res"
        },
        precio: 190
    },
    {
        id: "3",
        titulo: "Chorizo argentino 1lb",
        imagen: "productos/chorizo.JPEG",
        categoria: {
            nombre:"Res",
            id: "res"
        },
        precio: 35
    },
    {
        id: "4",
        titulo: "Papas para freir 1lb",
        imagen: "productos/papas.JPEG",
        categoria: {
            nombre:"Complemento",
            id: "complementos"
        },
        precio: 25
    },
    {
        id: "5",
        titulo: "Costilla 2lb",
        imagen: "productos/costilla.JPEG",
        categoria: {
            nombre:"Cerdo",
            id: "cerdo"
        },
        precio: 50
    },
    {
        id: "6",
        titulo: "Costilla sin hueso 2lb",
        imagen: "productos/lomo.jpg",
        categoria: {
            nombre:"Cerdo",
            id: "cerdo"
        },
        precio: 50
    }
    
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".boton-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `   
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">Q${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}


cargarProductos(productos);

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){
    Toastify({
        text: "Agregado al carrito",
        duration: 2000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #963b20, #d8603b)",
          borderRadius: "2rem"
        },
         // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}