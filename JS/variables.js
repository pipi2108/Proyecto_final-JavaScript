
const archivoJson= "/productos.json";
let productos;
let productosDelCarrito = [];
let producto;
let pdCarrito;
let carrito= new Carrito();
let vaAlDOM=false;

let valorCarro= document.getElementById("carro");
let span= document.createElement('span');
valorCarro.appendChild(span);