$(document).ready(function () {
    $.ajax({
        async: true,
        type: "POST",
        url: 'inc/cargarRegistros.php',
        success: function (data) {            
            $registros = $.parseJSON(data);
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
                alert('No hay registros');
            }
        }
    });
});