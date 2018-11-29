<?php
require_once "models/empleados_model.php";
class empleados_controller
{
    public function get_empleados_ctr()
    {
        $empleados = new empleados_model();
        $datos = $empleados->get_empleados_mdl();
        return $datos;
    }
}
