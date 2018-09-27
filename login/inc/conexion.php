<?php
    $servername = "localhost";
    $user = "root";
    $password = "";
    $database = "barberia";

    $conexion = new mysqli($servername,$user,$password,$database);

    if($conexion -> connect_error){
        die("Error de conexión: " . $conexion ->connect_error);
    }
?>
