<?php
    //Llamada al modelo
    function consultarEmpleados2(){
        require_once("models/empleados_model.php");
        $per=new empleados_model();
        $datos=$per->get_empleados();
        //return $datos; 
        return $datos;
    }
?>
