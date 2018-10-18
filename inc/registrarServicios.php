<?php    
    header("Access-Control-Allow-Origin: *");
    $tipoDocumento = $_POST['tipoDocumento'];
    $documento = $_POST['documento'];
    $descripcion = $_POST['descripcion'];

    require_once("WebService/conexion.php");
    
    $sql = "CALL insertarEmpleados($tipoDocumento,$documento,'$descripcion',@respuesta);select @respuesta";    
    $res = $conexion->multi_query($sql);
    if ($res){
        if ($result = $conexion->store_result()){
            while($row = $result->fetch_row()){
                echo $row[0];
            }
            $result->close();
        }
    }
    $conexion->close();        
?>