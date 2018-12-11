var empleados = {};
var _CLIENT = './inc/clients/empleados_client.php';
alertError = { titulo: "¡Ha ocurrido un error!", href: '#empleados', tipo: 'error', mensaje: '' }
alertCorrecto = { titulo: "¡Correcto!", href: '#empleados', tipo: 'correcto', mensaje: '' }
alertAdvertencia = { titulo: "¡Advertencia!", href: '#empleados', tipo: 'advertencia', mensaje: '' };

$(document).ready(function () {
    //Cargar empleados
    var datos = new FormData();
    datos.append("opcion", 1);
    ajax(_CLIENT, datos, cargarEmpleados);
    $("#guardar").click(guardarRegistro);
    $(".number").number(true);
});

$(document).on('click', '[data-popup-btn="setEmpleado"]', function () {
    var idEmpleado = $(this).closest('tr').find('td').eq(0).html();
    var estadoParent = $(this).closest('tr').find('td').eq(3).find('.estadoEmpleado');
    var estadoEmpleado = $(estadoParent).is(':checked')
    var estadoTmp = estadoEmpleado ? estado = 1 || estado : 0;
    var infoEmpleado = getEmpleado(idEmpleado);
    if (infoEmpleado) {
        if ($('#setEmpleado').is(':visible')) {            
            $('#setEmpleado input[name="nombreEmpleado"]').val(infoEmpleado.descripcion);
            $('#setEmpleado input[name="idEmpleado"]').val(infoEmpleado.documento);            
            $('select[name="tipoDocumento"]').prop('selectedIndex', infoEmpleado.tipoDocumento - 1).selectric('refresh');
            $('#setEmpleado input[name="fechaEmpleado"]').val(infoEmpleado.fecha);
            if (estadoTmp == 0) {
                $('#setEmpleado .checkbox-btn').removeClass('active');
                $('#setEmpleado .placa').removeClass('combo-color-verde').addClass('combo-color-rojo').html('Inactivo');
                $('#setEmpleado .estadoEmpleado').attr('value', infoEmpleado.idEmpleado).removeAttr('checked');
            } else if (estadoTmp == 1) {
                $('#setEmpleado .checkbox-btn').addClass('active');
                $('#setEmpleado .placa').removeClass('combo-color-rojo').addClass('combo-color-verde').html('Activo');
                $('#setEmpleado .estadoEmpleado').attr('value', infoEmpleado.idEmpleado).attr('checked','true');
            }
        }
    } else {
        alertError.mensaje = 'No existe el usuario solicitado';
        alerta(alertError);
    }
});

function getEmpleado(idEmpleado) {
    var info;
    $.each(empleados, function (e, index) {
        if (index.idEmpleado == idEmpleado) info = this;
    });

    return info || false;
}

function cargarEmpleados(data) {
    var respuesta = data;
    if (respuesta['codigo_error']) {
        alertError.mensaje = '<b>Código: </b>' + respuesta['codigo_error']
            + '</br><b>Descripción: </b>' + respuesta['descripcion'];
        alerta(alertError);
        $('.loader-spinner').hide();
        $('#alert-movimiento').removeClass('display-none');
    } else {
        empleados = respuesta;
        for ($i = 0; $i < empleados.length; $i++) {
            var tipoDocumento = validarTipoDocumento(empleados[$i].tipoDocumento);
            var estado = validarEstado(empleados[$i].estado, empleados[$i].idEmpleado);

            $('#registroEmpleados tbody').append(''
                + '<tr>'
                + ' <td>' + empleados[$i].idEmpleado + '</td>'
                + ' <td>'
                + '     <a class="txt-weight-500">' + empleados[$i].documento + '</a>'
                + '     <br>'
                + '     <a class="font-sz-12">' + tipoDocumento + '</a>'
                + ' </td>'
                + ' <td>' + empleados[$i].descripcion + '</td>'
                + ' <td>' + estado + '</td>'
                + ' <td>' + empleados[$i].fecha + '</td>'
                + ' <td class="td-button">'
                + '     <button type="button" class="btn-circle btn-blanco" data-boton="info-empleados">'
                + '         <i class="material-icons">more_vert</i>'
                + '     </button>'
                + ' </td>'
                + '</tr>'
            );

        }
        $('.loader-spinner').toggle();

        // INICIALIZA EVENTOS
        $('[data-boton~="info-empleados"]').click(infoEmpleados);
        $('.estadoEmpleado').change(function () { setEstado(this) });
    }
}


function setEstado(e) {
    var mainParent = $(e).parent('.checkbox-btn');
    var checkbox = $(mainParent).find('input.estadoEmpleado');
    var placaEstado = $(mainParent).next('span.placa');    
    var idEmpleado = $(checkbox).val();

    var origen = $(e).closest('div#setEmpleado');    
    if(origen.length > 0) alertCorrecto.href = 'reload';

    var datos = new FormData();
    datos.append("opcion", 3);
    datos.append("idEmpleado", idEmpleado);

    if ($(checkbox).is(':checked')) {
        datos.append("estado", 1);
        $(mainParent).addClass('active');
        $(placaEstado).html('Activo').removeClass('combo-color-rojo').addClass('combo-color-verde');
        $(checkbox).attr('checked','true');
    } else {
        datos.append("estado", 0);
        $(mainParent).removeClass('active');
        $(placaEstado).html('Inactivo').removeClass('combo-color-verde').addClass('combo-color-rojo');
        $(checkbox).removeAttr('checked');
    }

    parametros = { titulo: "Procesando solicitud", tipo: 'loader', mensaje: '<div class="loader-spinner"></div>' };
    alerta(parametros);
    ajax(_CLIENT, datos, function (data) {
        $('.alerta').remove();
        var respuesta = data;
        if (respuesta['codigo_error']) {
            alertError.href = 'reload';
            alertError.mensaje = '<b>Código: </b>' + respuesta['codigo_error']
                + '</br></br>' + respuesta['descripcion'];
            alerta(alertError);
        } else if (respuesta['codigo_success']) {
            alertCorrecto.mensaje = respuesta['descripcion'];
            alerta(alertCorrecto);
        }
    });
}

function guardarRegistro() {
    var tipoDocumentoSel = $('select[name="tipoDocumento"] option:selected').val();
    var documento = $('input[name="idEmpleado"]').val();
    var nombre = $('input[name="nombreEmpleado"]').val();

    if (tipoDocumentoSel == 0) {
        alertAdvertencia.mensaje = "Debe seleccionar un tipo de documento";
        alerta(alertAdvertencia);
    } else if (documento.length < 1) {
        alertAdvertencia.mensaje = "Debe digitar número de documento";
        alerta(alertAdvertencia);
    } else if (nombre.length < 1) {
        alertAdvertencia.mensaje = "Ingrese nombre del empleado";
        alerta(alertAdvertencia);
    } else {

        var datos = new FormData();
        datos.append("opcion", 2);
        datos.append("tipoDocumento", tipoDocumentoSel);
        datos.append("documento", documento);
        datos.append("descripcion", nombre);

        parametros = { titulo: "Procesando solicitud", tipo: 'loader', mensaje: '<div class="loader-spinner"></div>' };
        alerta(parametros);

        ajax(_CLIENT, datos, registroRespuesta);
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
    var elemento = $(this).closest('tr');
    var bottomElement = $(this).position().top + $(this).outerHeight(true);
    var bottom = document.body.scrollHeight - bottomElement;
    if (elemento.find('div.tooltip-box-list').length == 0) {
        $('[data-boton-box~="opciones"]').remove();
        $(this).closest('tr').append(
            '<div class="tooltip-box-list" style="display:block!important" data-boton-box="opciones">'
            + '<ul class="ripple">'
            + '<li data-popup-btn="setEmpleado">Modificar</li>'
            + '</ul>'
            + '</div>'
        );

        if (elemento.offset().left < 100) {
            $('.tooltip-box-list').css({
                'right': elemento.offset().left - 5,
                'width': '30%',
                'margin-top': '-3px'
            });

            if (screen.width > 447) {
                $('.tooltip-box-list').css({
                    'margin-top': elemento.height()
                });
            } else {
                if (bottom < 50) {
                    $('.tooltip-box-list').css({
                        'margin-top': elemento.height() * -1
                    });
                }
            }
        }
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

function validarEstado(estado, idEmpleado) {
    switch (parseInt(estado)) {
        case 0:
            return ''
                + '<div class="checkbox-btn">'
                + ' <input type="checkbox" value="' + idEmpleado + '" class="estadoEmpleado" />'
                + ' <span class="round-btn"></span>'
                + '</div>'
                + '<span class="placa combo-color-rojo">Inactivo</span>';
        // return '<span class="placa combo-color-rojo">Inactivo</span>';            
        case 1:
            return ''
                + '<div class="checkbox-btn active">'
                + ' <input type="checkbox" value="' + idEmpleado + '" class="estadoEmpleado" checked/>'
                + ' <span class="round-btn"></span>'
                + '</div>'
                + '<span class="placa combo-color-verde">activo</span>';
        default: return 'Null';
    }
}