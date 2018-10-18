<?php
require_once 'lib/nusoap.php';
$server = new nusoap_server();

// Métodos
require_once 'funciones/_consultarBarberos.php';
require_once 'funciones/_consultarServicios.php';


function getError($id,$value){
    return array('codigo_error' => $id, 'descripcion' => $value);
}

$namespace = 'http://localhost/barber/inc/webservice/server.php';
$server->configureWSDL('barberServicios', 'urn:barber');
$server->wsdl->schemaTargetNamespace = $namespace;

$server->register('consultarBarberos',
    array(), //parameter
    array('data' => 'xsd:string'), //output
    'urn:barber', //namespace
    'urn:barber#consultarBarberos' //soapaction
);

$server->register('consultarServicios',
    array(), //parameter
    array('data' => 'xsd:string'), //output
    'urn:barber', //namespace
    'urn:barber#consultarServicios' //soapaction
);
$server->service(file_get_contents("php://input"));
?>