var servicios = {};
var barberos = {};

$(document).ready(function () {
    //Cargar barberos
    ajax('inc/cargarBarberos.php', null, cargarBarberos);
    //Cargar servicios
    ajax('inc/cargarServicios.php', null, cargarServicios);
    $('select[name="servicios"]').change(function () {
        idServicio = $('select[name="servicios"] option:selected').val();

        if (idServicio == 0) {
            $('input[name="valorServicio"]').val('');
        } else {
            var found = getValServ(idServicio);
            $('input[name="valorServicio"]').val(found[0].valorSugerido);
        }
    });

    $("#addItmSrv").click(agregarItem);

    $(".number").number(true);
});

function cargarServicios(data) {
    console.log(data);
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        parametros = {
            titulo: "Ha ocurrido un error!",
            href: '#registrarServicios',
            tipo: 'error',
            mensaje:
                '<b>Descripción: </b>' + respuesta[1] +
                '<br><br> Debes registrar al menos un servicio para poder facturar.'

        };
        alerta(parametros);
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

function cargarBarberos(data) {
    var respuesta = data.split("|");
    if (respuesta[0] == '-1') {
        parametros = {
            titulo: "Ha ocurrido un error!",
            href: '#registrarServicios',
            tipo: 'error',
            mensaje:
                '<b>Descripción: </b>' + respuesta[1] +
                '<br><br> Debes registrar barberos para poder facturar un servicio.'

        };
        alerta(parametros);
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

function agregarItem() {
    parametros = {
        titulo: "Advertencia",
        href: '#registrarServicios',
        tipo: 'advertencia',
        mensaje: ''
    };

    if ($('select[name="servicios"] option:selected').val() == 0) {
        parametros.mensaje = 'Debes seleccionar un servicio';
        alerta(parametros);
    } else if ($('input[name="valorServicio"]').val().length < 1) {
        parametros.mensaje = 'Ingresa un valor para el servicio';
        alerta(parametros);
    } else {
        var valorServicio = numeral($('input[name="valorServicio"]').val()).format('0,0');
        $('<tr>' +
            '<td>' + $('select[name="servicios"] option:selected').html() + '</td>' +
            '<td>$ <a class="valorServicioItm">' + valorServicio + '</a></td>' +
            '<td class="td-button">' +
            '<button type="button" class="btn-circle btn-blanco eliminarItem">' +
            '<i class="material-icons">delete</i>' +
            '</button>' +
            '</td>' +
            '</tr>')
            .appendTo($('#detalleRegistro tbody'));


        calcularTotal('sumar', valorServicio);


        // Inicializar entradas
        $('select[name="servicios"').prop('selectedIndex', 0).selectric('refresh');
        $('input[name="valorServicio"]').val('');
        $(".eliminarItem").unbind("click").click(eliminarItem);
        // !Inicializar entradas        
    }
}

function eliminarItem() {
    $(this).closest('tr').hide('fade', 'fast', function () {
        $(this).closest('tr').remove();
    });
    var elemento = $(this).closest('tr');
    var valorItem = elemento.find(".valorServicioItm").html();
    calcularTotal('restar', valorItem);
}


function calcularTotal(operacion, valor) {
    // Calculo valor total            
    var valorTotal = numeral($('#valorTotal').html()).value()
    var nuevoValor = numeral(valor).value();
    if (operacion == "restar") {
        var nuevoTotal = parseInt(valorTotal) - parseInt(nuevoValor);
    } else if (operacion == "sumar") {
        var nuevoTotal = parseInt(valorTotal) + parseInt(nuevoValor);
    }

    $('#valorTotal').html(numeral(nuevoTotal).format('0,0'));
    // !Calculo valor total
}

function getValServ(code) {
    return servicios.filter(
        function (servicios) {
            return servicios.idServicio == code
        }
    );
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