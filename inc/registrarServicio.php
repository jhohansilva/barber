<?php    
    $obj = json_decode($_POST['item'],true);
    $idBarbero = $_POST['barbero'];
            
    for($i = 0; $i < count($obj); $i++){

        $idServicio = $obj[$i]['servicio'];
        $valor = $obj[$i]['valor'];        

        $sql = "INSERT INTO serviciosFacturados VALUES(NULL,$idServicio,$valor,$idBarbero,NOW()) \n";
        echo $sql;
    }
?>