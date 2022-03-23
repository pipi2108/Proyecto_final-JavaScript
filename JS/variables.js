
const archivoJson= "https://www.mockachino.com/b6702d86-0e21-46/productos";
let productos;
let productosDelCarrito = [];
let producto;
let pdCarrito;
let carrito= new Carrito();
let vaAlDOM=false;

let valorCarro= document.getElementById("carro");
let span= document.createElement('span');
valorCarro.appendChild(span);