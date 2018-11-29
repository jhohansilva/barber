<?php
header("Access-Control-Allow-Origin: *");
require_once('../webservice/core/_getError.php');

//error_reporting(E_ERROR | E_PARSE);
require_once('../webservice/core/lib/nusoap.php');
$wsdl = "http://localhost/barber/inc/webservice/server.php?wsdl";
$client = new nusoap_client($wsdl, true);
$err = $client->getError();

if ($err) {    
    $error = getError('empleados_cliente : 13', 'Constructor error: ' . $err);
    print_r($error);
    exit();
}
try {    
    $result = $client->call('consultarEmpleados');
    print_r($result);        

} catch (Exception $e) {
    $error = getError('empleados_cliente : 13', 'Caught exception: ' . $e->getMessage());
    print_r($error);
}
