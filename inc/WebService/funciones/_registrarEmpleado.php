<?php
function registrarEmpleado($tipoDocumento, $documento, $descripcion)
{
    require 'conexion.php';

    $sql = "CALL insertarEmpleados($tipoDocumento,$documento,'$descripcion',@respuesta);select @respuesta";
    $res = $conexion->multi_query($sql);
    if ($res) {
        if ($result = $conexion->store_result()) {
            while ($row = $result->fetch_row()) {
                return $row[0];
            }
            $result->close();
        }
    }
    $conexion->close();
}
?>