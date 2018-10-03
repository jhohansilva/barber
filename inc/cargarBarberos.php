<?php
    header("Access-Control-Allow-Origin: *");
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consulta = "SELECT * FROM barberos";

    if($result = mysqli_query($conexion, $consulta)){
        $i = 0;
        while($barberos = mysqli_fetch_array($result)){
            $lista[$i] = array(
                'idBarbero' => $barberos['idBarbero'], 
                'Descripcion' => $barberos['descripcion'],
                'Fecha' => $barberos['fecha'],
                'Estado' => $barberos['estado']
            );
            $i++;
        }
        if($i == 0){
            echo "-1|No hay barberos registrados";    
        }else{
            print(json_encode($lista));        
        }
    }else{
        $lista = "-1|No hay barberos";
    }    
    mysqli_close($conexion);
?>