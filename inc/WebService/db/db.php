<?php
class Conectar
{
    public static function conexion()
    {
        try {
            $conexion = new mysqli("80.211.145.146", "diego", "12345678", "barber");
            $conexion->query("SET NAMES 'utf8'");
            if ($conexion->connect_error) {
                die("Error en la conexion " . $conexion->connect_error);
            }
            return $conexion;
        } catch (Exception $e) {
            die("Error en la conexion " . $e->getMessage());
        }

    }
}
