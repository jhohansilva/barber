<?php    
    $categoria = $_POST["categoria"];
    $descripcion = $_POST["nombre"];
    $registroNacional = $_POST["registroNacional"];
    $tipoPropiedad =  $_POST["tipoPropiedad"];
    $direccion =  $_POST["direccion"];
    $barrio =  $_POST["barrio"];
    $departamento = $_POST["departamento"];
    $ciudad = $_POST["ciudad"];
    $telefono1 =  $_POST["telefono1"];
    $telefono2 =  $_POST["telefono2"];
    $imagen = "condominio.jpg";

    if(empty($categoria)){
        echo "-1|Selecciona una <b>categoría</b>";
    }elseif(empty($descripcion)){
        echo "-1|Ingresa un <b>nombre</b>";
    }elseif(filtrar($descripcion) == false){
        echo "-1|El <b>nombre</b> no puede contener carácteres especiales";
    }elseif(empty($tipoPropiedad)){
        echo "-1|Selecciona un <b>tipo de propiedad</b>";
    }elseif(empty($direccion)){
        echo "-1|Ingresa una <b>dirección</b>";
    }elseif(empty($barrio)){
        echo "-1|Ingresa un <b>barrio</b>";
    }elseif(empty($departamento)){
        echo "-1|Selecciona un <b>departamento</b>";
    }elseif(empty($ciudad)){
        echo "-1|Selecciona una <b>ciudad</b>";
    }elseif(empty($telefono1)){
        echo "-1|Ingresa al menos un número de <b>contacto</b>";
    }else{        
        require_once("conexion.php");  
        
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
    }

    function filtrar($nombre){
        $permitidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-_. "; 
        for ($i=0; $i<strlen($_POST['nombre']); $i++)
        { 
            if (strpos($permitidos, substr($_POST['nombre'],$i,1))===false)
            { 
                return false;
                echo "Error";
            } 
        } 
        return true;
    };
?>