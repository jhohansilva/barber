<?php
    header("Access-Control-Allow-Origin: *");
    include("conexion.php");
    $nro_pagina = $_POST['nro_pagina'];
    $opc = $_POST['opc'];
    $final = $nro_pagina * 5;
    $inicial = $final - 4;

    
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    switch ($opc) {
        case '1':
            $consulta = "SELECT count(*) AS total FROM serviciosfacturados";
            if($result = mysqli_query($conexion, $consulta)){
                while($registros = mysqli_fetch_array($result)){
                    echo $registros['total'];
                }
            }
            break;
        case '2':
            $consulta = "SELECT serviciosfacturados.idFacturado, serviciosfacturados.valor, serviciosfacturados.fecha,
            barberos.descripcion AS barbero, servicios.descripcion AS servicio FROM serviciosfacturados 
            INNER JOIN barberos ON serviciosfacturados.idBarbero = barberos.idBarbero
            INNER JOIN servicios ON serviciosfacturados.idServicio = servicios.idServicio
            WHERE serviciosfacturados.idFacturado BETWEEN $inicial and $final ORDER BY serviciosfacturados.idFacturado DESC";
        
            if($result = mysqli_query($conexion, $consulta)){
                $i = 0;
                while($registros = mysqli_fetch_array($result)){
                    $lista[$i] = array(
                        'Servicio' => $registros['servicio'], 
                        'Barbero' => $registros['barbero'],
                        'Valor' => $registros['valor'],
                        'Fecha' => $registros['fecha'],                
                    );
                    $i++;
                }
            }else{
                $lista = "-1|Sin registros";
            }
            print(json_encode($lista));
            break;
    }
    mysqli_close($conexion);
?>