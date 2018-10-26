<?php
header("Access-Control-Allow-Origin: *");
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    include "WebService/conexion.php";
    $nro_pagina = $_POST['nro_pagina'];
    $opc = $_POST['opc'];
    $cant_registros = $_POST['nro_registros'];
    $condicion = $_POST['condicion'];

    $inicial = $nro_pagina * 20;
    $inicial = $cant_registros - $inicial;
    $final = $inicial + 20;

    mysqli_set_charset($conexion, 'utf8');
    $lista = array();        
    switch ($opc) {
        case '1':
            $consulta = "SELECT count(*) AS total FROM serviciosfacturados";
            if($result = mysqli_query($conexion, $consulta)){
                while($registros = mysqli_fetch_array($result)){
                    echo "00|";
                    echo $registros['total'];
                }
            }
            break;
        case '2':
            $consulta = "SELECT serviciosfacturados.idFacturado, serviciosfacturados.valor, serviciosfacturados.fecha,
            empleados.descripcion AS empleados, servicios.descripcion AS servicio FROM serviciosfacturados
            INNER JOIN empleados ON serviciosfacturados.idEmpleado = empleados.idEmpleado
            INNER JOIN servicios ON serviciosfacturados.idServicio = servicios.idServicio
            WHERE serviciosfacturados.idFacturado BETWEEN $inicial and $final ORDER BY serviciosfacturados.idFacturado DESC";

            if ($result = mysqli_query($conexion, $consulta)) {
                $i = 0;
                while ($registros = mysqli_fetch_array($result)) {
                    $lista[$i] = array(
                        'id' => $registros['idFacturado'],
                        'Servicio' => $registros['servicio'],
                        'Barbero' => $registros['empleados'],
                        'Valor' => $registros['valor'],
                        'Fecha' => $registros['fecha']
                    );
                    $i++;
                }
                echo "00|";
            } else {
                $lista = "-1|Sin registros";
            }
            print(json_encode($lista));
            break;
        case '3':
            $consulta = "SELECT serviciosfacturados.idFacturado, serviciosfacturados.valor, serviciosfacturados.fecha,
            empleados.descripcion AS empleados, servicios.descripcion AS servicio FROM serviciosfacturados
            INNER JOIN empleados ON serviciosfacturados.idEmpleado = empleados.idEmpleado
            INNER JOIN servicios ON serviciosfacturados.idServicio = servicios.idServicio
            WHERE $condicion";

            if ($result = mysqli_query($conexion, $consulta)) {
                $i = 0;
                while ($registros = mysqli_fetch_array($result)) {
                    $lista[$i] = array(
                        'id' => $registros['idFacturado'],
                        'Servicio' => $registros['servicio'],
                        'Barbero' => $registros['empleados'],
                        'Valor' => $registros['valor'],
                        'Fecha' => $registros['fecha']
                    );
                    $i++;
                }
                echo "00|";
            } else {
                $lista = "-1|Sin registros";
            }
            print(json_encode($lista));
            break;
    }
    mysqli_close($conexion);
}
?>
