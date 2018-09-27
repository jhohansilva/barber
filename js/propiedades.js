$(document).ready(function () {
    $.ajax({
        async: true,
        type: "POST",
        url: 'inc/propiedades.php',
        success: function (data) {
            $('.loader-spinner').toggle();
            $condominios = $.parseJSON(data);
            if ($condominios.length != 0) {    
                for (var $i = 0; $i < $condominios.length; $i++) {
                    $('#condominios tbody').append(
                        '<tr>' +
                            '<td>' +
                                "<div class='tabla-imagen' style='background-image:url(content/imagenes-propiedades/" + $condominios[$i]['Imagen'] + ")'></div>" +
                            '</td>' +
                            '<td><a class="txt-weight-600">' + $condominios[$i]['Descripcion'] + '</a></td>' +
                            '<td>' + $condominios[$i]['Categoria'] + '</a></td>' +                            
                            '<td>' + $condominios[$i]['Tipo'] + '</td>' +
                            '<td>' + $condominios[$i]['Direccion'] + '<br>' + $condominios[$i]['Barrio'] + '</td>' +
                            '<td><a class="txt-weight-600">' + $condominios[$i]['Telefono1'] + '</a></td>' +
                            '<td class="td-button">' +
                            '<button type="button" class="btn-circle btn-blanco" data-boton="info-propiedades">' +
                            '<i class="material-icons">more_vert</i>' +
                            '</button>' +
                            '</td>' +
                        '</tr>'
                    ).hide().toggle('fade','fast');
                }
            }else{
                $(".span-alert").fadeToggle("display-none");
            }
        }
    });
});