<?php    
    $obj = json_decode($_POST['item'],true);
    $idBarbero = $_POST['barbero'];
  
    /*require_once("conexion.php");  
        
    $sql = "CALL insertarPropiedad('$descripcion','$categoria','$registroNacional','$tipoPropiedad','$direccion','$barrio','$departamento','$ciudad','$telefono1','$telefono2', '$imagen' ,@respuesta);SELECT @respuesta";
    $res = $conexion->multi_query($sql);     
    if($res){                
        if($result = $conexion->store_result()){                
            while( $row = $result->fetch_row()){
                echo $row[0];
            }
            $result->close();                
        }        
    }        
    $conexion->close();
    */
    for($i = 0; $i < count($obj); $i++){

        $idServicio = $obj[$i]['servicio'];
        $valor = $obj[$i]['valor'];        

        $sql = "INSERT INTO serviciosFacturados VALUES(NULL,$idServicio,$valor,$idBarbero,NOW()) \n";
        echo $sql;
    }
?>