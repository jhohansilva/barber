<?php
require_once "models/empleados_model.php";
class empleados_controller
{
    private $empleadosObj;

    public function __construct()
    {
        $this->empleadosObj = new empleados_model();
    }

    public function get_empleados_ctr()
    {
        $respuesta = $this->empleadosObj->get_empleados_mdl();
        return $respuesta;
    }

    public function in_empleados_ctr($tipoDocumento, $documento, $descripcion)
    {
        if (!ctype_alnum(str_replace(' ', '', $descripcion))) {
            return '-1|El nombre no puede contener carácteres especiales';
        } else {
            // return 'Prueba';
            $respuesta = $this->empleadosObj->in_empleados_mdl(
                filter_var($tipoDocumento, FILTER_SANITIZE_STRING),
                filter_var($documento, FILTER_SANITIZE_STRING),
                filter_var($descripcion, FILTER_SANITIZE_STRING)
            );
            return $respuesta;
        }
    }

    public function set_estado_empleados_ctr($idEmpleado, $estado){
        $column = 'estado';
        $respuesta = $this->empleadosObj->set_column_empleados_mdl($column,$idEmpleado,$estado);        
        return $respuesta;
    }
}
