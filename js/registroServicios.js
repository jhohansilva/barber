var servicios = {};

$(document).ready(function () {
    cargarServicios();

    $('select[name="servicios"]').change(function () {
        idServicio = $('select[name="servicios"] option:selected').val();

        if (idServicio == 0) {
            $('input[name="valorServicio"]').val('');
        } else {
            var found = getValServ(idServicio);
            $('input[name="valorServicio"]').val(found[0].valorSugerido);
        }
    });

    $(".number").number(true);
});

$(function () {
    $(document).on('click', '#addItmSrv', function (e) {

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
                '<button id="eliminarItem" type="button" class="btn-circle btn-blanco">' +
                '<i class="material-icons">delete</i>' +
                '</button>' +
                '</td>' +
                '</tr>')
                .appendTo($('#detalleRegistro tbody'));

            
            calcularTotal('sumar', valorServicio);
            
            // Inicializar entradas
            $('select[name="servicios"').prop('selectedIndex', 0).selectric('refresh');
            $('input[name="valorServicio"]').val('');
            // !Inicializar entradas
        }
    });
});

$(function () {
    $(document).on('click', '#eliminarItem', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        var elemento = $(this).closest('tr').remove();
        var valorItem = elemento.find(".valorServicioItm").html();
        calcularTotal('restar', valorItem);
    });
});

function calcularTotal(operacion, valor) {
    // Calculo valor total            
    var valorTotal = numeral($('#valorTotal').html()).value()
    var nuevoValor = numeral(valor).value();
    if (operacion == "restar") {
        var nuevoTotal = parseInt(valorTotal) - parseInt(nuevoValor);
    }else if(operacion == "sumar"){
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


function cargarServicios() {
    $.ajax({
        async: true,
        type: "POST",
        url: 'inc/cargarServicios.php',
        success: function (data) {
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
    });


}