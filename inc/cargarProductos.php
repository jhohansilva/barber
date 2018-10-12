<?php
$usuario = "triana";
$contrasena = "12345678";
$servidor = "80.211.145.146";
$basededatos = "proyecto_sena";

$conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);
if ($conexion->connect_error) {
    die("Error en la conexion " . $conexion->connect_error);
}

$lista = array();
$consulta = "SELECT categorias.descripcion AS Categoria, 
                    marcas.descripcion AS Marca, 
                    unidadesventa.descripcion AS UnidadVenta,
                    productos.codigoProducto, 
                    productos.descripcion,
                    productos.codigoBarras,
                    iva.descripcion AS Impuesto 
                    FROM productos
                    INNER JOIN categorias ON productos.idCategoria = categorias.idCategoria
                    INNER JOIN marcas ON productos.idMarca = marcas.idMarca
                    INNER JOIN unidadesventa ON productos.idUnidadVenta = unidadesventa.idUnidadVenta
                    INNER JOIN iva ON productos.iva = iva.idIva";



if ($result = mysqli_query($conexion, $consulta)) {
    $i = 0;
    while ($registros = mysqli_fetch_array($result)) {
        $lista[$i] = array(
            'Categoria' => $registros['Categoria'],
            'Marca' => $registros['Marca'],
            'UnidadVenta' => $registros['UnidadVenta'],
            'Codigo' => $registros['codigoProducto'],
            'Descripcion' => $registros['descripcion'],
            'CodigoBarras' => $registros['codigoBarras'],
            'Impuesto' => $registros['Impuesto']            
        );
        $i++;
    }    
    if($i == 0){
        echo "-1|No hay barberos registrados";    
    }else{
        echo $lista[0]['Categoria'];
        print(json_encode($lista));        
    }
} else {
    $lista = "-1|Sin registros";
}

?>

