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

});

$(function () {
    $(document).on('click', '#addItmSrv', function (e) {
        if ($('select[name="servicios"] option:selected').val() == 0) {
            parametros = {
                titulo: "Advertencia",
                mensaje: 'Debes seleccionar un servicio',
                href: '#registrarServicios'     ,
                tipo: 'advertencia'           
            };
            alerta(parametros);
        } else {
            $('<tr>' +
                '<td>Corte de pelo</td>' +
                '<td>$ 8,000</td>' +
                '<td class="td-button">' +
                '<button id="eliminarItem" type="button" class="btn-circle btn-blanco">' +
                '<i class="material-icons">delete</i>' +
                '</button>' +
                '</td>' +
                '</tr>')
                .appendTo($('#detalleRegistro tbody'));
        }
    });
});

$(function () {
    $(document).on('click', '#eliminarItem', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
    });
});


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