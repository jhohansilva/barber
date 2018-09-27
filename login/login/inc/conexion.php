<?php
  $servername = "localhost";
  $user = "root";
  $password = "";
  $database = "condominio";

  $conexion = new mysqli($servername,$user,$password,$database);

  if($conexion -> connect_error){
    die("Error de conexion: " . $conexion -> connect_error);
  }
?>
