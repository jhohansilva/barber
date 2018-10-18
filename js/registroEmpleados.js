var barberos = {};
alertError = { titulo: "¡Ha ocurrido un error!", href: '#registrarServicios', tipo: 'error', mensaje: '' }
alertCorrecto = { titulo: "¡Correcto!", href: '#registrarServicios', tipo: 'correcto', mensaje: '' }

$(document).ready(function () {
    //Cargar barberos
    ajax( 'inc/cargarBarberos.php' /*'http://80.211.145.146/barber/inc/cargarBarberos.php'*/, null, cargarBarberos);

    cargarFecha();
    $('select[name="servicios"]').change(function () {
        idServicio = $('select[name="servicios"] option:selected').val();

        if (idServicio == 0) {
            $('input[name="valorServicio"]').val('');
        } else {
            var found = getValServCode(idServicio);
            $('input[name="valorServicio"]').val(found[0].valorSugerido);
        }
    });

    $(".number").number(true);
});


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


function cargarBarberos(data) {
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        alertError.mensaje = '<b>Descripción: </b>' + respuesta[1] + '<br><br>No existen empleados.';
        alerta(alertError);
    } else {
        barberos = $.parseJSON(data);
        for ($i = 0; $i < barberos.length; $i++) {
            $('#registroEmpleados tbody').append(
                '<tr> <td>' + barberos[$i].idBarbero + '</td>' +
                '<td>' + barberos[$i].Descripcion + '</td>' +
                '<td>' + barberos[$i].Estado + '</td>' +
                '<td>' + barberos[$i].Fecha + '</td></tr>'
            );

            $('select[name="barberos"').selectric('refresh');
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