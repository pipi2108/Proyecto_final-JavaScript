
$("#carrito").click( (e)=> { 
    e.preventDefault();
    $("#sidebar").css({"right":"0px"}).toggle(500);
});

$(".btn-ConfirmarCompra").click( (e) =>{ 
    e.preventDefault();
    let sidebar= document.getElementById("cont-sidebar"); 
    if (sidebar.hasChildNodes()==false){
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Al carrito de compras esta vacío.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: true
        });
    }else {
        $(".compraFinal").css({"display":"flex"});
        sumaFinal();
        mostrarCompraFinal();
        $(".btn-ConfirmarCompra").attr("disabled", "");
    };
});

$("#back").click( (e)=> { 
    e.preventDefault();
    $(".compraFinal").css({"display":"none"});
    limpiarContenedor();
    localStorage.clear();
    $(".btn-ConfirmarCompra").removeAttr("disabled");
});

$(".finalizada").click( (e)=> { 
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: '<h2 class="p-sweetAlert">Muchas gracias por tu compra!</h2>',
        html: '<p class="p-sweetAlert">A la brevedad estarás disfrutando de tu pedido.</p>',
        background: '#777',
        position:'center',
        allowOutsideClick: false
    });
    $(".compraFinal").css({"display":"none"});
    document.getElementById("compraFinalizada").innerHTML=""
    limpiarCarritoEnDOM();
    localStorage.clear();
    $("#sidebar").css({"right":"-450px"}).toggle(500);
    $(".btn-ConfirmarCompra").removeAttr("disabled");
});

$("#enviaFormulario").click( (e)=> { 
    e.preventDefault();
    validarFurmlario();
});

