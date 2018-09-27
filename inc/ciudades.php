<?php
    $id_departamento = $_POST['id_departamento'];
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consultaDeparta = "SELECT * FROM municipios where departamento_id =" .$id_departamento;
    if($result = mysqli_query($conexion, $consultaDeparta)){
        $i = 0;
        while($ciudades = mysqli_fetch_array($result)){
            $lista[$i] = array('Municipio' => $ciudades['municipio']);
            $i++;
        }
    }else{
        $lista = "No hay resultados";
        echo $lista;
    }
    print(json_encode($lista));
    mysqli_close($conexion);
?>