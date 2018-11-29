function alerta(parametros) {
    if(parametros.href == 'reload'){
        var href = "location.reload()";
    }else if(parametros.href == null){
        var href = "";
    }else{
        var href = "window.location.hash='" + parametros.href + "'";
    }    
    
    if (parametros.titulo == false) {
        $displayTitle = "display-none";
    } else {
        $displayTitle = "display-block";
    }

    if (parametros.tipo != null) {
        if (parametros.tipo.toLowerCase() == "advertencia") {
            $estiloBtn = 'btn-naranja';
            $estiloFoot = 'alert-foot-warn';
        } else if(parametros.tipo.toLowerCase() == "correcto") {
            $estiloBtn = 'btn-verde';
            $estiloFoot = 'alert-foot-sucs';
        } else if(parametros.tipo.toLowerCase() == "error"){
            $estiloBtn = 'btn-rojo-pnt';
            $estiloFoot = 'alert-foot-error';
        }else if(parametros.tipo.toLowerCase() == "loader"){
            $estiloBtn = '';
            $estiloFoot = 'display-none';
        }else{
            $estiloBtn = 'btn-azul-lnkdn';
            $estiloFoot = '';    
        }
    }else{
        $estiloBtn = 'btn-azul-lnkdn';
        $estiloFoot = '';
    }


    $('main').append(
        '<div class="alerta advertencia" style="display:none;">' +
        '<div class="alert-box">' +
        '<div class="alert-mid">' +
        '                    <div class="title-alert ' + $displayTitle + '">' + parametros.titulo + '</div>' +
        '<div class="content-alert">' +
        parametros.mensaje +
        '</div>' +
        '</div>' +
        '<div class="alert-foot ' + $estiloFoot + '">' +
        '<button id="btn-alert" onclick="' + href + '" type="button" class="btn float-right width-auto ' + $estiloBtn + '">' +
        'Aceptar' +
        ' </button>' +
        '<div class="clear-both"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    $(".alerta").fadeIn('fast');
}

$(function () {
    $(document).on('click', '#btn-alert', function (e) {        
        $('.alerta').hide('fade','fast',function(){
            $('.alerta').remove();
        });        
    });
});
