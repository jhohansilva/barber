<?php
    $usuario = "triana";
    $contrasena = "12345678"; 
    $servidor =  "80.211.145.146";
    $basededatos = "condominio";

    $conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);
    if ($conexion -> connect_error){
        die("Error en la conexion ". $conexion -> connect_error);
    }
    
?>