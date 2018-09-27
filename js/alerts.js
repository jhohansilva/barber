function alerta(parametros) {    
    var href = "window.location.hash='"+parametros.href+"'";
    
    if(parametros.titulo == false){
        $displayTitle = "display-none";
    }else{
        $displayTitle = "display-block";
    }

    $('main').append(
        '<div class="alerta">' +
            '<div class="alert-box">' +
                '<div class="alert-mid">' +
'                    <div class="title-alert '+ $displayTitle +'">'+parametros.titulo+'</div>'+
                    '<div class="content-alert">' +
                        parametros.mensaje +
                    '</div>'+
                '</div>'+
                '<div class="alert-foot">'+
                    '<button id="btn-alert" onclick="'+href+'" type="button" class="btn float-right width-auto btn-verde">'+
                        'Aceptar'+
                     ' </button>'+
                    '<div class="clear-both"></div>'+
                '</div>'+
            '</div>'+
        '</div>'
    );
}

$(function () {
    $(document).on('click', '#btn-alert', function (e) {        
        $('.alerta').remove();
    });
});
