<?php
header("Access-Control-Allow-Origin: *");
//error_reporting(E_ERROR | E_PARSE);
require_once '../webservice/core/_getError.php';
require_once '../webservice/core/lib/nusoap.php';

$_WSDL = "http://localhost/barber/inc/webservice/server.php?wsdl";
$client = new nusoap_client($_WSDL, true);
$err = $client->getError();

if ($err) {
    $error = getErrorJson('empleados_cliente : 13', 'Constructor error: ' . $err);
    print_r($error);
    exit();
} else {
    try {
        $_OPCION = $_POST['opcion'];
        switch ($_OPCION) {
            case 1:
                $result = $client->call('consultarEmpleados');
                print_r($result);
                break;
            case 2:
                $parametros = array(
                    'tipoDocumento' => $_POST['tipoDocumento'],
                    'documento' => $_POST['documento'],
                    'descripcion' => $_POST['descripcion'],
                );
                $result = $client->call('registrarEmpleado',$parametros);
                print_r($result);                     
                break;
            default:
                $error = getErrorJson('empleados_cliente : 27', 'Opción indefinida: ' . $_OPCION);
                print_r($error);
                break;
        }
    } catch (Exception $e) {
        $error = getErrorJson('empleados_cliente : 13', 'Caught exception: ' . $e->getMessage());
        print_r($error);
    }
}
