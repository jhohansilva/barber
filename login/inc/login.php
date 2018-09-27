<?php
  require "../inc/conexion.php";
  $username = $_POST['usuario'];
  $clave =  $_POST['clave'];


  $consultarUsuario = "SELECT clave FROM usuarios WHERE numeroDocumento = '".$username."'";
  $resultado = mysqli_query($conexion,$consultarUsuario);
  if($row = mysqli_fetch_array($resultado)){
    if(password_verify($clave,$row['clave'])){
      echo $row['clave'];
    }else{
      echo "Contraseña incorrecta";
    }

  }else{
    echo "Usuario no existe";
  }
?>
