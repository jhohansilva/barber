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

    public function in_empleados_ctr($tipoDocumento, $documento, $descripcion)
    {
        $empleados = new empleados_model();
        $datos = $empleados->in_empleados_mdl(
            filter_var($tipoDocumento, FILTER_SANITIZE_STRING),
            filter_var($documento, FILTER_SANITIZE_STRING),
            filter_var($descripcion, FILTER_SANITIZE_STRING)
        );
        $datos = $empleados->in_empleados_mdl($tipoDocumento,$documento,$descripcion);
        return $datos;                
    }
}
