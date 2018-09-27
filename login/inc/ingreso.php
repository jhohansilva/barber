<?php
  session_start();
  require '../inc/conexion.php';
  include './funciones/filtro_caracteres.php';
  $username = $_POST['usuario'];
  $password = $_POST['clave'];

  if(empty($username)){
    echo 'Ingrese un usuario';
  }elseif(strpos($username," ")){
    echo 'El usuario no puede contener espacios';
  }elseif(strlen($username) < '6') {
    echo 'El usuario debe tener mínimo 6 carácteres';
  }elseif (filtrar_caracteres($username) == false){
    echo 'El usuario contiene carácteres especiales';
  }elseif(empty($password)){
    echo 'Ingresa una contraseña';
  }elseif(strlen($password) < '8'){
    echo 'La contraseña debe contener minimo 8 caracteres';
  }elseif(!ctype_alnum($password)){
    echo 'La contraseña solo debe contener letras y números';
  }else{
    $username = strtolower (mysqli_real_escape_string($conexion,$username));
    $consultarUsuario = "SELECT nombreUsuario,claveUsuario,idUsuario,emailUsuario FROM usuarios WHERE nombreUsuario = '".$username."'";
    $resultado = mysqli_query($conexion,$consultarUsuario);
    if($row = mysqli_fetch_array($resultado)){
      if(password_verify($password,$row['claveUsuario'])){
        $_SESSION['id'] = $row['idUsuario'];
        $_SESSION['username'] = $row['nombreUsuario'];
        $_SESSION['email'] = $row['emailUsuario'];
        echo 'Ingresando<meta http-equiv="Refresh" content="0;url=index.php">';
      }else{
        echo 'Contraseña incorrecta';
      }
    }
    else{
      echo "Usuario no existe";
    }
  }


?>
