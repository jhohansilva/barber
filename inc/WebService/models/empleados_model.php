<?php
require_once './core/_getError.php';
class empleados_model
{
    private $db;
    private $empleados;

    public function __construct()
    {
        $this->db = Conectar::conexion();
        $this->empleados = array();
    }

    public function get_empleados_mdl()
    {
        try {
            $consulta = $this->db->query("SELECT * FROM empleados ORDER BY estado DESC ");
            if ($consulta) {
                if ($consulta->fetch_assoc()) {
                    $i = 0;
                    while ($filas = $consulta->fetch_assoc()) {
                        $this->empleados[] = $filas;
                        $i++;
                    }
                    if ($i == 0) {$this->empleados = getError('-1', "No hay empleados registrados");}
                } else {
                    $this->empleados = getError('-1', "No hay empleados registrados");
                }
            } else {
                $this->empleados = getError('-1', "Ha ocurrido un error en la consulta");
            }
        } catch (Exception $e) {
            $this->empleados = getError('-1', $e->getMessage());
        }

        return json_encode($this->empleados);
    }

}
