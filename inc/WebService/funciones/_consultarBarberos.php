<?php
    function consultarBarberos(){
        require 'conexion.php';
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
                $lista = getError('-1',"No hay barberos registrados");
            }
        }else{
            $lista = getError('-1',"No hay barberos registrados");
        }     
        return json_encode($lista);        
        mysqli_close($conexion);    
    }
?>