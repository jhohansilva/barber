var empleados = {};
alertError = { titulo: "¡Ha ocurrido un error!", href: '#empleados', tipo: 'error', mensaje: '' }
alertCorrecto = { titulo: "¡Correcto!", href: '#empleados', tipo: 'correcto', mensaje: '' }
alertAdvertencia = { titulo: "¡Advertencia!", href: '#empleados', tipo: 'advertencia', mensaje: '' };

$(document).ready(function () {
    //Cargar empleados
    ajax('http://80.211.145.146/barber/inc/consultas.php', 'tipo=Empleados', cargarEmpleados);
    $("#guardar").click(guardarRegistro);
    $(".number").number(true);   
});

function cargarEmpleados(data) {
    var respuesta = $.parseJSON(data);
    if (respuesta['codigo_error']) {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta['descripcion'];
        alerta(alertError);
        $('.loader-spinner').hide();
        $('#alert-movimiento').removeClass('display-none');
    } else {
        empleados = respuesta;
        for ($i = 0; $i < empleados.length; $i++) {

            var tipoDocumento = validarTipoDocumento(empleados[$i].tipoDocumento);
            var estado = validarEstado(empleados[$i].Estado);

            $('#registroEmpleados tbody').append(
                '<tr>'
                + '<td>' + empleados[$i].idEmpleado + '</td>'
                + '<td>'
                + '<a class="txt-weight-500">' + empleados[$i].Documento + '</a>'
                + '<br>'
                + '<a class="font-sz-12">' + tipoDocumento + '</a>'
                + '</td>'
                + '<td>' + empleados[$i].Descripcion + '</td>'
                + '<td>' + estado + '</td>'
                + '<td>' + empleados[$i].Fecha + '</td>'
                + '<td class="td-button">'
                + '<button type="button" class="btn-circle btn-blanco" data-boton="info-empleados">'
                + '<i class="material-icons">more_vert</i>'
                + '</button>'
                + '</td>'
                + '</tr>'
            );

            $('select[name="barberos"').selectric('refresh');
        }
        $('.loader-spinner').toggle();

        $('[data-boton~="info-empleados"]').click(infoEmpleados);
    }
}

function guardarRegistro() {
    tipoDocumentoSel = $('select[name="tipoDocumento"] option:selected').val();

    if (tipoDocumentoSel == 0) {
        alertAdvertencia.mensaje = "Debe seleccionar un tipo de documento";
        alerta(alertAdvertencia);
    } else if ($('input[name="idEmpleado"]').val().length < 1) {
        alertAdvertencia.mensaje = "Debe digitar numero de documento";
        alerta(alertAdvertencia);
    } else if ($('input[name="nombreEmpleado"]').val().length < 1) {
        alertAdvertencia.mensaje = "Ingrese nombre del empleado";
        alerta(alertAdvertencia);
    } else {
        let documento = $('input[name="idEmpleado"]').val();
        let nombre = $('input[name="nombreEmpleado"]').val();
        var datos = 'tipoDocumento=' + tipoDocumentoSel +
            '&documento=' + documento +
            '&descripcion=' + nombre;

        parametros = { titulo: "Procesando solicitud", tipo: 'loader', mensaje: '<div class="loader-spinner"></div>' };
        alerta(parametros);
        ajax('http://80.211.145.146/barber/inc/registrarEmpleados.php', datos, registroRespuesta);
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

function infoEmpleados() {
    console.log('test');
    var elemento = $(this).closest('tr');
    if (elemento.find('div.tooltip-box-list').length == 0) {
        $('[data-boton-box~="opciones"]').remove();
        $(this).closest('tr').append(
            '<div class="tooltip-box-list" style="display:block!important" data-boton-box="opciones">'
            + '<ul class="ripple">'
            + '<li>Modificar</li>'
            + '</ul>'
            + '</div>'
        );
    } else {
        $('[data-boton-box~="opciones"]').remove();
    }

}

function validarTipoDocumento(tipoDocumento) {
    switch (parseInt(tipoDocumento)) {
        case 1: return 'C.C';
        case 2: return 'T.I';
        case 2: return 'C.E';
        default: return 'Null';
    }
}

function validarEstado(estado) {
    switch (parseInt(estado)) {
        case 0: return '<span class="placa combo-color-rojo">Inactivo</span>';
        case 1: return '<span class="placa combo-color-verde">Activo</span>';
        default: return 'Null';
    }
}