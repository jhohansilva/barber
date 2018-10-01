$nro_paginacion = 1;
$(document).ready(function () {
    datos = "nro_pagina=" + $nro_paginacion;
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        url: 'https://80.211.145.146/barber/inc/cargarRegistros.php',
        success: function (data) {
            console.log(data);
            $(".loader-spinner").toggle();
            $registros = $.parseJSON(data);
            console.log($registros);
            if ($registros.length != 0) {
                for (var $i = 0; $i < $registros.length; $i++) {
                    $('#registroServicios tbody').append(
                        '<tr>' +
                            '<td><a class="txt-weight-500">'+$registros[$i]['Servicio']+'</a></td>' +
                            '<td><a class=" txt-azul">'+$registros[$i]['Barbero']+'</a></td>' +
                            '<td>'+$registros[$i]['Fecha']+'</td>' +
                            '<td><a class="txt-weight-600">$'+$registros[$i]['Valor']+'</a></td>' +
                        '</tr>'
                    );
                }
            } else {
                $("#alert-movimiento").toggle();                
            }
        }
    });
});