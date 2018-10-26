$opcion = 1;
$nro_paginacion = 1;
$nro_registros = 0;
$id_barbero = "";
$id_servicio = "";
$condicion = "";

$(document).ready(function () {
    ajax('http://80.211.145.146/barber/inc/consultas.php', 'tipo=Empleados', cargarEmpleados);    
    ajax('http://80.211.145.146/barber/inc/consultas.php', 'tipo=Servicios', cargarServicios);
    countRegistrosRepot();
    $('#paginaAtras').click(function () {
        $(".loader-spinner").toggle();
        if ($nro_paginacion === 1) {
            $nro_paginacion = 1;
        } else {
            $nro_paginacion = $nro_paginacion - 1;
        }
        cargarRegistros();
    });

    $('#paginaDelante').click(function () {
        $(".loader-spinner").toggle();
        if ($nro_paginacion === $cant_paginacion) {
            $nro_paginacion = $cant_paginacion;
        } else {
            $nro_paginacion++;
        }
        cargarRegistros();
    });
    
    $('select').change(function () {
        $opcion = '3';
        $(".loader-spinner").toggle(); 
        if ($(this).attr('name') === 'barberos'){
            $id_barbero = $(this).val();
        }else if($(this).attr('name') === 'servicios'){
            $id_servicio = $(this).val();
        }
        if ($id_barbero !== "" && $id_servicio !== ""){
            $condicion = "serviciosfacturados.idBarbero = " + $id_barbero + " and serviciosfacturados.idServicio = " + $id_servicio;
        }else if($id_barbero !== ""){
            $condicion = "serviciosfacturados.idBarbero = " + $id_barbero;
        }else if($id_servicio !== ""){
            $condicion = "serviciosfacturados.idServicio = " + $id_servicio;
        }else{
            $opcion = '2';
        }
        cargarRegistros();
    });

    $("#dateRanger").change(function(){
        console.debug($("#dateRanger").val());
    });



});

function cargarEmpleados(data) {
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta[1] + '<br><br> No hay barberos registrados.';
        alerta(alertError);
    } else {
        barberos = $.parseJSON(data);
        for ($i = 0; $i < barberos.length; $i++) {
            $('select[name="barberos"]').append(
                '<option value="' + barberos[$i].idBarbero + '">' +
                barberos[$i].Descripcion +
                '</option>'
            );
            $('select[name="barberos"').selectric('refresh');
        }
    }
}

function cargarServicios(data) {
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta[1] + '<br><br> No hay servicios registrados.';
        alerta(alertError);
    } else {
        servicios = $.parseJSON(data);
        for ($i = 0; $i < servicios.length; $i++) {
            $('select[name="servicios"]').append(
                '<option value="' + servicios[$i].idServicio + '">' +
                servicios[$i].Descripcion +
                '</option>'
            );

            $('select[name="servicios"').selectric('refresh');
        }
    }
}

function countRegistrosRepot() {
    datos = "nro_pagina=" + $nro_paginacion + '&opc=' + $opcion + "&nro_registros=" + $nro_registros + "&condicion=" + $condicion;
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        //url:  'http://80.211.145.146/barber/inc/reportes.php',
        url: 'inc/reportes.php',
        success: function (data) {
            if (data.split('|')[0] === '00') {
                $nro_registros = parseInt(data.split('|')[1]);
                $cant_paginacion = data.split('|')[1] / 20;
                $cant_paginacion = Math.ceil($cant_paginacion);
                $opcion = '2';
                $('.historial-registros label').eq(1).html(' / ' + $cant_paginacion);
                $('.grid-a .box-contenido .box-mid .val-reporte').eq(0).html($nro_registros);
                $('.grid-a .box-contenido .box-mid .val-reporte').eq(1).html('$' + numeral(data.split('|')[2]).format('0,0'));
                cargarRegistros();
            } else {
                alert('Error');
                $(".loader-spinner").toggle();
            }
        }
    });
}

function cargarRegistros() {
    datos = "nro_pagina=" + $nro_paginacion + '&opc=' + $opcion + "&nro_registros=" + $nro_registros + "&condicion=" + $condicion;
    $('.historial-registros label').eq(0).html($nro_paginacion);
    $.ajax({
        async: true,
        type: "POST",
        data: datos,
        //url:  'http://80.211.145.146/barber/inc/reportes.php',
        url: 'inc/reportes.php',
        success: function (data) {
            $(".loader-spinner").toggle();
            $('#reportesBarber tbody').html('');
            if (data.split('|')[0] === '00') {
                $registros = $.parseJSON(data.split('|')[1]);
                mostrarRegistros();
            } else {
                $("#alert-movimiento").toggle();
            }
        }
    });
}

function mostrarRegistros(){
    if($registros.length !== 0){
        $("#alert-movimiento").hide();
        for (var $i = 0; $i < $registros.length; $i++) {
            $('#reportesBarber tbody').append(
                '<tr>' +
                '<td>' + $registros[$i]['id'] + '</td>' +
                '<td><a class="txt-weight-500">' + $registros[$i]['Servicio'] + '</a></td>' +
                '<td><a class=" txt-azul">' + $registros[$i]['Barbero'] + '</a></td>' +
                '<td>' + $registros[$i]['Fecha'] + '</td>' +
                '<td><a class="txt-weight-600">$' + numeral($registros[$i]['Valor']).format('0,0') + '</a></td>' +
                '</tr>'
            );
        }
    }else{
        $("#alert-movimiento").toggle();
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