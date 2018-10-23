<?php
header("Access-Control-Allow-Origin: *");
//if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    include "WebService/conexion.php";
    $nro_pagina = $_POST['nro_pagina'];
    $opc = $_POST['opc'];

    $cant_registros = $_POST['nro_registros'];

    $inicial = $nro_pagina * 5;
    $inicial = $cant_registros - $inicial;
    $final = $inicial + 4;

    mysqli_set_charset($conexion, 'utf8');
    $lista = array();        
    switch ($opc) {
        case '1':
            $consulta = "SELECT count(*) AS total, SUM(valor) AS totalValor FROM serviciosfacturados";
            if($result = mysqli_query($conexion, $consulta)){
                while($registros = mysqli_fetch_array($result)){
                    echo "00|";
                    echo $registros['total'];
                    echo "|";
                    echo $registros['totalValor'];
                }
            }
            break;
        case '2':                        
            $consulta = "SELECT serviciosfacturados.idFacturado, serviciosfacturados.valor, serviciosfacturados.fecha,
                empleados.descripcion AS empleado, servicios.descripcion AS servicio FROM serviciosfacturados
                INNER JOIN empleados ON serviciosfacturados.idEmpleado = empleados.idEmpleado
                INNER JOIN servicios ON serviciosfacturados.idServicio = servicios.idServicio
                WHERE serviciosfacturados.idFacturado BETWEEN $inicial and $final ORDER BY serviciosfacturados.idFacturado DESC";

            if ($result = mysqli_query($conexion, $consulta)) {
                $i = 0;
                while ($registros = mysqli_fetch_array($result)) {
                    $lista[$i] = array(
                        'id' => $registros['idFacturado'],
                        'Servicio' => $registros['servicio'],
                        'Empleado' => $registros['empleado'],
                        'Valor' => $registros['valor'],
                        'Fecha' => $registros['fecha']
                    );
                    $i++;
                }
            } else {
                $lista = "-1|Sin registros";
            }
            print(json_encode($lista));
            break;
    }
    mysqli_close($conexion);
//}
?>
