<?php
    include("conexion.php");
    mysqli_set_charset($conexion, 'utf8');
    $lista = array();
    $consulta = "SELECT propiedades.descripcion,                        
                        propiedades.direccion,
                        propiedades.barrio,
                        propiedades.imagen,
                        propiedades.telefono1,
                        propiedades.telefono2,
                        categorias.descripcion AS categoria,
                        tipopropiedades.descripcion AS tipo     
                FROM propiedades 
                INNER JOIN tipopropiedades ON propiedades.tipo = tipopropiedades.idTipo
                INNER JOIN categorias ON propiedades.categoria = categorias.idCategoria";

    if($result = mysqli_query($conexion, $consulta)){
        $i = 0;
        while($condominios = mysqli_fetch_array($result)){
            $lista[$i] = array(
                'Descripcion' => $condominios['descripcion'], 
                'Tipo' => $condominios['tipo'],
                'Categoria' => $condominios['categoria'],
                'Direccion' => $condominios['direccion'],
                'Barrio' => $condominios['barrio'],
                'Imagen' => $condominios['imagen'],
                'Telefono1' => $condominios['telefono1'],
                'Telefono2' => $condominios['telefono2']
            );
            $i++;
        }
    }else{
        $lista = "-1|No hay condominios";
    }
    print(json_encode($lista));
    mysqli_close($conexion);
?>