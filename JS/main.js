// INICIA LA FUNCION
$(document).ready(function () {
    inicioFuncion();
});

async function inicioFuncion(){
    await cargarProductos();
};

// CARGO LOS PRODUCTOS
async function cargarProductos (){ 
    await $.getJSON(archivoJson, 
        function (data, textStatus) {
            if (textStatus==="success"){
                productos=data;
                for (producto of productos) {
                    
                    $(".cards").append(
                        `<div class="card card2" id="${producto.id}">
                            <div class="cont-img">
                                <img src="${producto.imagen}" class="card-img-top img-responsive" alt="...">     
                            </div>    
                            <div class="card-body card-productos">
                                <h5 class="card-title">${producto.producto} ${producto.fragancia}</h5>
                                <h6>$ ${producto.precio}</h6>
                                <p class="card-text"> Tipo de pelo: ${producto.tipo}</B></p>
                                <div id="msjAgregado${producto.id}" class="msjAgregado"></div>
                                <div class="card-boton">
                                    <a id="btn${producto.id}" href="#" class="btn btn-primary">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>`
                    );

                    let indice= `${producto.id}`;   
                
                    //BOTON PARA AGREGAR LOS PROCUTOS AL CARRITO
                    $(`#btn${producto.id}`).click((e)=> {   
                        e.preventDefault();
                        eleccion(indice);
                        
                        if (vaAlDOM){
                            infoEnElDom();
                        };
                        
                        mensaje(e, indice);

                        let sidebar= document.getElementById("sidebar");
                        if (sidebar.style.display=="none" || sidebar.style.display==""){
                            $("#sidebar").css({"right":"0px"}).toggle(500);
                        };
                    });
                };
            };
        },
    );
};


function eleccion(ind) {    
    for (const prod of productos) {
        if (prod.id == ind) {
            pdCarrito = new prodDelCarrito (prod.id, prod.producto, prod.tipo, prod.fragancia, prod.precio, prod.imagen);
        };
    };
    
    productosDelCarrito.push(pdCarrito);   
    validarRepeticion(pdCarrito);           
    carrito.incrementarCarrito();
    
    return pdCarrito
};

function validarRepeticion(obj) {
    let contadorRepeticiones= 0;
    
    for (let i=0; i< productosDelCarrito.length; i++) {
        if (obj.id == productosDelCarrito[i].id){
            contadorRepeticiones +=1;
        };  
        if (contadorRepeticiones>1){
            Swal.fire({
                icon: 'error',
                title: '<h2 class="p-sweetAlert">Producto Repetido</h2>',
                html: '<p class="p-sweetAlert">Este producto ya fue agregado. Por favor modifique la cantidad desde el carrito de compras</p>',
                background: '#777',
                position:'center',
                allowOutsideClick: "true",
                customClass: "SeewAlert"
            });
            productosDelCarrito.splice(i,1);
            carrito.decrementarCarrito();
            vaAlDOM=false;
        } else {
            obj.agregar();
            vaAlDOM=true;
        }; 
    };
};

// Mostramos info en el sidebar
function infoEnElDom() {   
     $("#cont-sidebar").prepend(
        `<ol id="${pdCarrito.id}" class="list-group prod-seleccionado${pdCarrito.id}">
            <li class="list-group-item d-flex align-items-start">
            <div class="ms-1 me-auto">
                <div class="fw-bold">${pdCarrito.producto} ${pdCarrito.fragancia}</div>
                <p>$${pdCarrito.precio}</p>
                <img src="${pdCarrito.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="trash">
                <span id="badge${pdCarrito.id}" class="badge bg-primary rounded-pill">Cantidad: ${pdCarrito.cantidad}</span>
                <div class="MasMenos">
                    <i type="button" id="menos${pdCarrito.id}" class="fas fa-minus-square"></i>
                    <i id="mas${pdCarrito.id}" class="fas fa-plus-square"></i>
                </div>
                <i id="btn-trash${pdCarrito.id}" class="far fa-trash-alt"></i>
            </div>
            </li>
        </ol>`
    ); 

    //BOTON P/ELIMINAR PRODUCTO SELECCIONADO
    $(`#btn-trash${pdCarrito.id}`).click( (e) => { 
    e.preventDefault();
    let indiceParaEliminar= e.target.parentNode.parentNode.parentNode.getAttribute("id");
    eliminarDelCarrito(e.target, indiceParaEliminar);
    eliminarDelArray(indiceParaEliminar);
    });

    //BOTON PARA DECREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#menos${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

        for (const prod in productosDelCarrito) {
            if (productosDelCarrito[prod].cantidad==1){
                e.target.style.visibility="hidden".toggle;
            }else{
                if (identificador == productosDelCarrito[prod].id){
                    productosDelCarrito[prod].decrementarCantidad();

                    carrito.decrementarCarrito();
            
                    let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                    document.getElementById(`badge${identificador}`).innerHTML= contenido;
                };
            };
        };
    });

    //BOTON PARA INCREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#mas${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        carrito.incrementarCarrito();

        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
        for (const prod in productosDelCarrito){
            if (identificador == productosDelCarrito[prod].id){
                productosDelCarrito[prod].aumentarCantidad();
        
                let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                document.getElementById(`badge${identificador}`).innerHTML= contenido;
            };
        };
    });
};

// CARRITO

// Elimina elementos del carrito
function eliminarDelCarrito(valor, elimina) {        
    $(valor).parent().parent().parent().remove();
    
    for (const prod in productosDelCarrito){
            if (elimina == productosDelCarrito[prod].id){
                carrito.cantidad -= parseInt(productosDelCarrito[prod].cantidad);
                span.innerHTML = `<span class="cart__count">${carrito.cantidad}</span>`;
            };
    };
};

function eliminarDelArray(num) {       
    for (let i=0; i < productosDelCarrito.length; i++){   
        if (productosDelCarrito[i].id == num) {
            productosDelCarrito.splice(i,1);
            break;
        };
    };

    let sidebar= document.getElementById("cont-sidebar"); 
    if (sidebar.hasChildNodes()==false){
        productosDelCarrito=[];
        carrito.resetearCarrito();
    };
};

function limpiarCarritoEnDOM (){
    let sidebar= document.getElementById("cont-sidebar");
    sidebar.innerHTML=""
    productosDelCarrito=[];
    carrito.resetearCarrito();
};

// Se muestra un mensaje cada vez que damos agregar al carrito
function mensaje(valor, ind){      
    $(`#msjAgregado${ind}`).append('<p class="mensaje">Producto agregado!</p>');
    $(valor.target.parentNode.parentNode.childNodes[7].children).fadeOut(3000)
};


function agregarAlCarrito (){   
    for (let i=0; i< productosDelCarrito.length; i++) {
        localStorage.setItem(i, JSON.stringify(productosDelCarrito[i]));
    };
};


// COMPRA FINAL
function sumaFinal (){      
    agregarAlCarrito()
    
    let total = 0;
    for (let i=0; i < productosDelCarrito.length; i++){
        total += (productosDelCarrito[i].precio)*(productosDelCarrito[i].cantidad);
    };
    
    return parseFloat(total)
};

// Agregamos costo de envio
function sumarEnvio(){   
    let envio= document.getElementById("envio")
    let compraFinal;
    if (envio.checked==false) {
        compraFinal= sumaFinal();
    } else {
        compraFinal= sumaFinal()+500;
    };

    return compraFinal
};

function mostrarCompraFinal (){ 
    let aPagar= document.getElementById("compraFinalizada");
    let ul= document.createElement('ul');
    aPagar.appendChild(ul);
    for (let i=0; i < productosDelCarrito.length; i++){
        let li= document.createElement('li')
        li.innerHTML= `${productosDelCarrito[i].producto} ${productosDelCarrito[i].fragancia}, Tipo de pelo: ${productosDelCarrito[i].tipo},\nPrecio Unitario: $${productosDelCarrito[i].precio} \nCantidad: ${productosDelCarrito[i].cantidad}`;
        ul.appendChild(li);
    };
    
    let div= document.createElement('div');
    aPagar.appendChild(div);
    div.innerHTML= `<h4>Tu compra total es: <h3>$${sumarEnvio()}</h3></h4>`;
};

function limpiarContenedor() {
    document.getElementById("compraFinalizada").textContent=""
}

//FORMULARIO

function validarFurmlario() {
    let nombre=  document.getElementById("nombre").value;
    let email=  document.getElementById("email").value;
    let telefono=  document.getElementById("celular").value;
    let asunto=  document.getElementById("asunto").value;
    let consulta=  document.getElementById("consulta").value;

    if (nombre=="" || email=="" || telefono=="" || asunto=="" || consulta=="") {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Debes completar todos los campos.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false
        });
    }else if (!(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))) {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">E-mail Incorrecto!</h2>',
            html: '<p class="p-sweetAlert">Introduce un correo válido.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
    }else {
        Swal.fire({
            icon: 'success',
            title: '<h2 class="p-sweetAlert">Mensaje Enviado!</h2>',
            html: '<p class="p-sweetAlert">Su mensaje ha sido enviado!\nA la brevedad te responderemos</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
        document.getElementById("form").reset();
    };
};



















