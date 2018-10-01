$nro_paginacion = 1;
$(document).ready(function () {
    cargarRegistros();

    $('#paginaAtras').click(function () {
        $(".loader-spinner").toggle();
        $('#registroServicios tbody').html('');
        if ($nro_paginacion === 1) {
            $nro_paginacion = 1;
        } else {
            $nro_paginacion = $nro_paginacion - 1;
        }
        cargarRegistros();
    });

    $('#paginaDelante').click(function () {
        $(".loader-spinner").toggle();
        $('#registroServicios tbody').html('');
        $nro_paginacion++;
        cargarRegistros();
    });
});

function cargarRegistros() {
    datos = "nro_pagina=" + $nro_paginacion;
    $('.historial-registros label').eq(0).html($nro_paginacion);
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        url: 'inc/cargarRegistros.php',  //'https://80.211.145.146/barber/inc/cargarRegistros.php',
        success: function (data) {
            $(".loader-spinner").toggle();
            $registros = $.parseJSON(data);
            if ($registros.length != 0) {
                for (var $i = 0; $i < $registros.length; $i++) {
                    $('#registroServicios tbody').append(
                        '<tr>' +
                        '<td><a class="txt-weight-500">' + $registros[$i]['Servicio'] + '</a></td>' +
                        '<td><a class=" txt-azul">' + $registros[$i]['Barbero'] + '</a></td>' +
                        '<td>' + $registros[$i]['Fecha'] + '</td>' +
                        '<td><a class="txt-weight-600">$' + numeral($registros[$i]['Valor']).format('0,0') + '</a></td>' +
                        '</tr>'
                    );
                }
            } else {
                $("#alert-movimiento").toggle();
            }
        }
    });
}