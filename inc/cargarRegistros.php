<?php
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consulta = "SELECT serviciosfacturados.valor,                        
                        serviciosfacturados.fecha,                        
                        barberos.descripcion AS barbero,
                        servicios.descripcion AS servicio     
                FROM serviciosfacturados 
                INNER JOIN barberos ON serviciosfacturados.idBarbero = barberos.idBarbero
                INNER JOIN servicios ON serviciosfacturados.idServicio = servicios.idServicio";

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
        $lista = "-1|No hay registros";
    }
    print(json_encode($lista));
    mysqli_close($conexion);
?>