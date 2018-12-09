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
                    if ($i == 0) {$this->empleados = getError('Empleados_25', "No hay empleados registrados");}
                } else {
                    $this->empleados = getError('Empleados_27', "No hay empleados registrados");
                }
            } else {
                $this->empleados = getError('Empleados_30', "Ha ocurrido un error en la consulta");
            }
        } catch (Exception $e) {
            $this->empleados = getError('Empleados_33', $e->getMessage());
        }

        $this->db->close();
        return json_encode($this->empleados);
    }

    public function in_empleados_mdl($tipoDocumento, $documento, $descripcion)
    {
        try {  
            $con = $this->db;
            $sql = "CALL insertarEmpleados(?,?,?,@respuesta)";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("iss", $tipoDocumento, $documento, $descripcion);
            $stmt->execute();
            
            $select = $con->query('SELECT @respuesta AS respuesta');
            $result = $select->fetch_assoc();            
            
            // return $stmt->debugDumpParams();
            // return $tipoDocumento . ' - ' . $documento . ' - ' . $descripcion . ' = ' . $result['respuesta'];          
            return $result['respuesta'];

        } catch (Exception $e) {
            return getError('-1', $e->getMessage());
        }

        $this->db->close();
    }
}
