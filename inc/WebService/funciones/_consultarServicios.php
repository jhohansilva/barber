<?php
    function consultarServicios(){
        require 'conexion.php';
        $lista = array();
        $consulta = "SELECT * FROM servicios";
    
        if($result = mysqli_query($conexion, $consulta)){
            $i = 0;
            while($servicios = mysqli_fetch_array($result)){
                $lista[$i] = array(
                    'idServicio' => $servicios['idServicio'], 
                    'Descripcion' => $servicios['descripcion'],
                    'valorSugerido' => $servicios['valorSugerido'],
                    'fecha' => $servicios['fecha'],
                    'estado' => $servicios['estado']
                );
                $i++;
            }            
            if($i == 0){
                $lista = getError('-1',"No hay servicios registrados");                
            }
        }else{
            $lista = getError('-1',"No hay servicios registrados");  
        }    
        return json_encode($lista);        
        mysqli_close($conexion);   
    }
?>