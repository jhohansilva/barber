<?php
    header("Access-Control-Allow-Origin: *");
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

        if($i == 0){
            echo "-1|No hay servicios registrados";    
        }else{
            print(json_encode($lista));        
        }
    }else{
        $lista = "-1|No hay servicios";
    }    
    mysqli_close($conexion);
?>