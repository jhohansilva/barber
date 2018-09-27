$(document).ready(function () {
    $('#ingresarPropiedad').click(function () {
        $(this).prop('disabled', true).html('<div class="loader-spinner"></div>');
        setTimeout(function () {
            $.ajax({
                async: true,
                type: "POST",
                url: 'inc/propiedadesCrear.php',
                data: $('#datosPropiedad').serialize(),
                dataType: "html",
                success: function (data) {                                        
                    $respuesta = data.split("|");                    
                    if ($respuesta[0] == "-1") {
                        $(".span-alert").removeClass("display-none");
                        $(".span-alert span").html($respuesta[1]);
                    } else if ($respuesta[0] == "0") {
                        $(".span-alert").addClass("display-none");
                        parametros = {
                            titulo: "Confimación",
                            mensaje: 'Se ha ingresado correctamente la propiedad',
                            href: '#propiedades'
                        };
                        alerta(parametros);
                    }

                    $('#ingresarPropiedad').removeAttr('disabled').html('Guardar');
                }
            });
        }, 1000);
    });
});