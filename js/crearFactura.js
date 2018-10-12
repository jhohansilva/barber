var productos = {};
$(document).ready(function () {
    $(".number").number(true);
    cerrarPopUp('[data-box~="info-producto"]');
    ajax('./inc/cargarProductos.php', null, cargarProductos);

    var availableTags = [
        {
            label: 'ABC - Chocorramo',
            value: 'CHOC'
        }
    ];

    $("[name='idProducto']").autocomplete({
        source: availableTags,
        focus: function (e, ui) {
            $(this).val(ui.item.label);
            return false;
        },
        select: function (e, ui) {
            $(this).val(ui.item.label);
            $(this).addClass('input-with-icon');
            var elemento = $(this).closest('td');
            elemento.find('span').removeClass('display-none');
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.label + "</div>")
            .appendTo(ul);
    };
    //

    $('[data-boton~="info-productos"]').click(function () {
        var elemento = $(this).closest('td');
        if (elemento.find('[data-box~="info-producto"]').length == 0) {
            $('[data-box~="info-producto"]').hide('fade', function () {
                $(this).remove();
            });
            $(this).closest('td').append(
                '<div class="tooltip-box-list" style="display:none;margin-top: -5px;width: 15%;" data-box="info-producto">' +
                '<div class="grid-2">' +
                '<div class="box-grid" style="text-align: right; text-overflow:ellipsis;white-space:nowrap; overflow:hidden; ">' +
                'Stock:<br>' +
                'Venta:<br>' +
                'Rentabilidad:<br>' +
                'Impuesto:<br>' +
                'Neto:<br>' +
                '</div>' +
                '<div class="box-grid">' +
                '<b>999</b><br>' +
                '<b>Unidad</b><br>' +
                '<b>10%</b><br>' +
                '<b>19%</b><br>' +
                '<b>$1200</b><br>' +
                '</div>' +
                '</div>     ' +
                '</div>'
            );
            $('[data-box~="info-producto"]').show('fade', 'fast');
        } else {
            $('[data-box~="info-producto"]').hide('fade', 'fast', function () {
                $(this).remove();
            });
        }
    });

    ////
});

function cargarProductos(data){
    console.log(data);
    productos = $.parseJSON(data);
    console.log(productos);
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