<?php

function consultarEmpleados2()
{
    require_once "controller/empleados_controller.php";
    $per = new empleados_controller();
    $datos = $per->get_empleados_ctr();
    return $datos;
}
