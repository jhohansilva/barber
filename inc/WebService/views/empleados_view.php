<?php

function consultarEmpleados()
{
    require_once("./controllers/empleados_controller.php");
    $per = new empleados_controller();
    $datos = $per->get_empleados_ctr();
    return $datos;
    //return 'Prueba';
}
