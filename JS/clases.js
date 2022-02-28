
class prodDelCarrito {
    constructor (id, producto, tipo, fragancia, precio, imagen) {
        this.id = id;
        this.producto = producto;
        this.tipo = tipo;
        this.fragancia = fragancia;
        this.precio = precio;
        this.imagen= imagen;
        this.cantidad = 1;
        this.agregado = false;
    };

    aumentarCantidad () {
        this.cantidad+=1;
        return this.cantidad;
    };

    decrementarCantidad () {
        if (this.cantidad > 1) {
            this.cantidad-=1;
        };
        return this.cantidad;
    };
    
    agregar () {
        if (this.agregado === false){
            this.agregado = true;
        };
    };
};


class Carrito {
    cantidad = 0;
    
    incrementarCarrito () {
        this.cantidad +=1;
        span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
    };

    decrementarCarrito () {
        if (this.cantidad > 0){
            this.cantidad -=1;
            span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
        };
    };

    resetearCarrito (){
        this.cantidad = 0;
        span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
    };
};












