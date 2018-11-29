<?php
header("Access-Control-Allow-Origin: *");
require_once 'core/_getError.php';

//error_reporting(E_ERROR | E_PARSE);
require_once 'WebService/lib/nusoap.php';
$wsdl = "http://localhost/barber/inc/webservice/server.php?wsdl";
$client = new nusoap_client($wsdl, true);
$err = $client->getError();

if ($err) {    
    print_r(getError('empleados_cliente : 13','Constructor error: ' . $err));
    exit();
}
try {
    //$result = $client->call('consultar'.$tipoConsulta);
    $result = $client->call('consultarEmpleados2');
    print_r($result);
} catch (Exception $e) {
    print_r(getError('empleados_cliente : 13','Caught exception: ' . $e->getMessage()));    
}
