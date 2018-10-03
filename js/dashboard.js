$cant_paginacion = 0;
$nro_paginacion = 1;
$opcion = '1';
$nro_registros = 0;
$(document).ready(function () {
    countRegistros();

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
        if ($nro_paginacion === $cant_paginacion) {
            $nro_paginacion = $cant_paginacion;
        }else{
            $nro_paginacion++;
        }
        cargarRegistros();
    });
});

function countRegistros(){
    datos = "nro_pagina=" + $nro_paginacion + '&opc=' + $opcion + "&nro_registros=" +$nro_registros;
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        url:  'http://80.211.145.146/barber/inc/cargarRegistros.php',
        //url:  'inc/cargarRegistros.php',
        success: function (data) {            
            if (data.split('|')[0] === '00') {
                $nro_registros = parseInt(data.split('|')[1]);
                $cant_paginacion = data.split('|')[1] / 5;
                $cant_paginacion = Math.ceil($cant_paginacion);
                $('.historial-registros label').eq(1).html(' / ' + $cant_paginacion);
                $('.grid-a .box-contenido .box-mid .val-reporte').eq(0).html($nro_registros);
                $('.grid-a .box-contenido .box-mid .val-reporte').eq(1).html('$' + numeral(data.split('|')[2]).format('0,0'));                
                cargarRegistros();
            }else{
                alert('Error');
                $(".loader-spinner").toggle();
            }
            
        }
    });
}

function cargarRegistros() {    
    $opcion = '2';
    datos = "nro_pagina=" + $nro_paginacion + '&opc=' + $opcion + "&nro_registros=" +$nro_registros;
    $('.historial-registros label').eq(0).html($nro_paginacion);
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        //url:  'http://80.211.145.146/barber/inc/cargarRegistros.php',
        url:  'inc/cargarRegistros.php',
        success: function (data) {            
            $(".loader-spinner").toggle();
            $registros = $.parseJSON(data);
            if ($registros.length != 0) {
                for (var $i = 0; $i < $registros.length; $i++) {
                    $('#registroServicios tbody').append(
                        '<tr>' +
                        '<td>'+ $registros[$i]['id'] +'</td>'+
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
