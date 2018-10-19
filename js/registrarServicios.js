var servicios = {};
alertError = { titulo: "¡Ha ocurrido un error!", href: '#registrarServicios', tipo: 'error', mensaje: '' }
alertCorrecto = { titulo: "¡Correcto!", href: '#registrarServicios', tipo: 'correcto', mensaje: '' }

$(document).ready(function () {
    ajax('./inc/consultas.php', 'tipo=Servicios', cargarServicios);

    /*cargarFecha();
    $('select[name="servicios"]').change(function () {
        idServicios = $('select[name="servicios"] option:selected').val();

        if (idServicios == 0) {
            $('input[name="valorServicios"]').val('');
        } else {
            var found = getValServCode(idServicio);
            $('input[name="valorServicios"]').val(found[0].valorSugerido);
        }
    });*/

    $("#guardar").click(guardarRegistro);
    $(".number").number(true);
});

function guardarRegistro() {
    tipoEstadoSel = $('select[name="tipoEstado"] option:selected').val();
    parametros = { titulo: "¡Advertencia!", href: '#registrarServicios', tipo: 'advertencia', mensaje: '' };


    if ($('input[name="nombreServicio"]').val().length < 1) {
        parametros.mensaje = "Ingrese nombre del servicio";
        alerta(parametros);
    } else if ($('input[name="valorServicio"]').val().length == 0) {
        parametros.mensaje = "Ingrese valor del servicio";
        alerta(parametros);
    } else {
        let nombre = $('input[name="nombreServicio"]').val();
        let precio = $('input[name="valorServicio"]').val();
        var datos = '&descripcion=' + nombre
        '&valorSugerido=' + precio +
            'Estado=' + tipoEstadoSel;

        parametros = { titulo: "Procesando solicitud", tipo: 'loader', mensaje: '<div class="loader-spinner"></div>' };
        alerta(parametros);
        ajax('./inc/registrarServicios.php', datos, registroRespuesta);
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

function cargarServicios(data) {
    //console.log(data);   
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta[1] + '<br><br>No existen servicios.';
        alerta(alertError);
    } else {
        servicios = $.parseJSON(data);
        for ($i = 0; $i < servicios.length; $i++) {
            $('#registroServicios tbody').append(
                '<tr> <td>' + servicios[$i].idServicio + '</td>' +
                '<td>' + servicios[$i].Descripcion + '</td>' +
                '<td>' + servicios[$i].valorSugerido + '</td>' +
                '<td>' + servicios[$i].fecha + '</td>' +
                '<td> </td> </tr>'
            );

            $('select[name="servicios"').selectric('refresh');
        }
        $('.loader-spinner').toggle();
    }

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