<?php
    class empleados_model{
        private $db;
        private $empleados;
 

        public function __construct(){
            $this->db=Conectar::conexion();
            $this->empleados=array();
        }

        public function get_empleados_mdl(){
            $consulta=$this->db->query("SELECT * FROM empleados ORDER BY estado DESC ");
            if($consulta){
                if($consulta->fetch_assoc()){
                    while($filas=$consulta->fetch_assoc()){
                        $this->empleados[]=$filas;
                    }
                    return json_encode($this->empleados);
                }else{
                    return 'No hay empleados';
                }
            }else{
                return 'Ha ocurrido un error en la consulta';
            }
        }
    
    
    }
?>