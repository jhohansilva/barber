<?php

function consultarEmpleados()
{
    require_once("./controllers/empleados_controller.php");
    $empleadoObj = new empleados_controller();
    $respuesta = $empleadoObj->get_empleados_ctr();
    return $respuesta;    
}

function registrarEmpleado($tipoDocumento, $documento, $descripcion)
{
    require_once("./controllers/empleados_controller.php");
    $empleadoObj = new empleados_controller();
    $respuesta = $empleadoObj->in_empleados_ctr($tipoDocumento, $documento, $descripcion);
    return $respuesta;        
}

function setEstadoEmpleado($idEmpleado, $estado)
{
    require_once("./controllers/empleados_controller.php");
    $empleadoObj = new empleados_controller();
    $respuesta = $empleadoObj->set_estado_empleados_ctr($idEmpleado, $estado);
    return $respuesta;        
}