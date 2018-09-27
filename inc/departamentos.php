<?php
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consultaDeparta = "SELECT * FROM departamentos ORDER BY departamento";
    if($result = mysqli_query($conexion, $consultaDeparta)){
        $i = 0;
        while($departamentos = mysqli_fetch_array($result)){
            $lista[$i] = array('Departamento' => $departamentos['departamento'], 'Cod' => $departamentos['id_departamento']);
            $i++;
        }
    }else{
        $lista = "No hay resultados";
    }
    print(json_encode($lista));
    mysqli_close($conexion);
?>