var barberos = {};
alertError = { titulo: "¡Ha ocurrido un error!", href: '#registrarEmpleadosN', tipo: 'error', mensaje: '' }
alertCorrecto = { titulo: "¡Correcto!", href: '#registrarEmpleadosN', tipo: 'correcto', mensaje: '' }

$(document).ready(function () {
    cargarFecha();

    $("#guardar").click(guardarRegistro);
    $(".number").number(true);
});

function guardarRegistro() {
    tipoDocumentoSel = $('select[name="tipoDocumento"] option:selected').val();
    parametros = { titulo: "¡Advertencia!", href: '#registrarEmpleadosN', tipo: 'advertencia', mensaje: '' };

    if (tipoDocumentoSel == 0) {
        parametros.mensaje = "Debe seleccionar un tipo de documento";
        alerta(parametros);
    } else if ($('input[name="idEmpleado"]').val().length < 1) {
        parametros.mensaje = "Debe digitar numero de documento";
        alerta(parametros);
    } else if ($('input[name="nombreEmpleado"]').val().length < 1) {
        parametros.mensaje = "Ingrese nombre del empleado";
        alerta(parametros);
    } else {
        let documento = $('input[name="idEmpleado"]').val();
        let nombre = $('input[name="nombreEmpleado"]').val();
        var datos = 'tipoDocumento=' + tipoDocumentoSel +
            '&documento=' + documento +
            '&descripcion=' + nombre;

        ajax('inc/registrarEmpleados.php', datos, registroRespuesta);
        //http://80.211.145.146/barber/
    }
}

function registroRespuesta(data) {
    $('.alerta').remove();
    var respuesta = data.split("|");

    if (respuesta[0] == '0') {
        alertCorrecto.href = 'reload';
        alertCorrecto.mensaje = respuesta[1];
        alerta(alertCorrecto);
    } else if (respuesta[0] == '-1') {

        alertError.mensaje = '<b>Descripción: </b>' + respuesta[1];
        alerta(alertError);
    } else {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta;
        alerta(alertError);
    }
}

function cargarFecha() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    $('#fechaActual').html(today);
}


function ajax(url, data, funcion) {
    return $.ajax({
        async: true,
        type: "POST",
        url: url,
        data: data,
        dataType: "html",
        success: function (data) {
            funcion(data);
        }
    });
}