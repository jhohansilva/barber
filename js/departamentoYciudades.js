$departamentos = '';
$ciudades = '';

$(function(){
    $.ajax({
        url: 'inc/departamentos.php',
        type: 'POST',
        success: function (response, status, jqXHR) {
            if (jqXHR.status === 200) {                
                $departamentos = $.parseJSON(response);
                cargarDepartamentos();
            }
        },
        error: function (jqXHR, status, err) {
            alert(jqXHR.status + ' ' + jqXHR.statusText);
        },
    });

    $("select[name='departamento']").change(function(){
        var datos = 'id_departamento=' + $(this).val();
        if ($(this).val() !== '0'){
            $.ajax({
                url: "inc/ciudades.php",
                type: 'POST',
                data: datos,
                success: function (response, status, jqXHR) {
                    if (jqXHR.status === 200) {
                        $ciudades = $.parseJSON(response);
                        cargarCiudades();
                    }
                },
                error: function (jqXHR, status, err) {
                    alert(jqXHR.status + ' ' + jqXHR.statusText);
                },
            });
        }else{
            $("select[name='ciudad']").html('<option value="0">Selecione</option>');
        }
    });
});

function cargarDepartamentos(){
    $("#departamento").html('<option value="0">Selecione</option>');
    for ($i = 0; $i < $departamentos.length; $i++) {
        $("#departamento").append('<option value="' + $departamentos[$i].Cod + '">' + $departamentos[$i].Departamento + '</option>');
        $('#departamento').selectric('refresh');
    }
}

function cargarCiudades(){
    $("select[name='ciudad']").html('<option value="0">Selecione</option>');
    for ($i = 0; $i < $ciudades.length; $i++) {
        $("select[name='ciudad']").append('<option value="' + $ciudades[$i].Municipio + '">' + $ciudades[$i].Municipio + '</option>');
    }
    $("select[name='ciudad']").selectric('refresh');
}