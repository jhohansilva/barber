<?php
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consulta = "SELECT * FROM servicios";

    if($result = mysqli_query($conexion, $consulta)){
        $i = 0;
        while($servicios = mysqli_fetch_array($result)){
            $lista[$i] = array(
                'idServicio' => $servicios['idServicio'], 
                'Descripcion' => $servicios['descripcion'],
                'valorSugerido' => $servicios['valorSugerido']                
            );
            $i++;
        }
    }else{
        $lista = "-1|No hay servicios";
    }
    print(json_encode($lista));
    mysqli_close($conexion);
?>