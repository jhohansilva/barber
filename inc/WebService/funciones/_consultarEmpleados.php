<?php
    function consultarEmpleados(){
        require 'conexion.php';
        $lista = array();
        $consulta = "SELECT * FROM empleados ORDER BY estado DESC";    
        try{
            if($result = mysqli_query($conexion, $consulta)){        
                $i = 0;
                while($barberos = mysqli_fetch_array($result)){
                    $lista[$i] = array(
                        'idEmpleado' => $barberos['idEmpleado'], 
                        'tipoDocumento' => $barberos['tipoDocumento'], 
                        'Documento' => $barberos['documento'], 
                        'Descripcion' => $barberos['descripcion'],
                        'Fecha' => $barberos['fecha'],
                        'Estado' => $barberos['estado']
                    );
                    $i++;
                }                       
                if($i == 0){
                    $lista = getError('-1',"No hay empleados registrados");
                }
            }else{
                $lista = getError('-1',"No hay empleados registrados");
            } 
        }catch(Exception $e){
            $lista = getError('-1',$e->getMessage());
        }
    
        return json_encode($lista);        
        mysqli_close($conexion);    
    }
?>