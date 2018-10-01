<?php    
    header("Access-Control-Allow-Origin: *");
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

    require_once("conexion.php");  
    
    for($i = 0; $i < count($obj); $i++){

        $idServicio = $obj[$i]['servicio'];
        $valor = $obj[$i]['valor'];        

        $sql = "CALL insertarServicio($idServicio,$valor,$idBarbero)";

        $ejecutar = mysqli_query($conexion,$sql);     
        if(!$ejecutar){
            echo '-1|Ha ocurrido un error en la siguiente consulta:<br>'. $sql;
        }
        
    }
    
    echo "0|Se han ingresado correctamente <b>" . count($obj) . "</b> servicios";
    $conexion->close();
?>