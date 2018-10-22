<?php
require_once 'lib/nusoap.php';
$server = new nusoap_server();

// Métodos
require_once 'funciones/_consultarEmpleados.php';
require_once 'funciones/_consultarServicios.php';
require_once 'funciones/_registrarEmpleado.php';

function getError($id, $value)
{
    return array('codigo_error' => $id, 'descripcion' => $value);
}

$namespace = 'http://localhost/barber/inc/webservice/server.php';
$server->configureWSDL('barberServicios', 'urn:barber');
$server->wsdl->schemaTargetNamespace = $namespace;

$server->register('consultarEmpleados',
    array(),
    array('data' => 'xsd:string'),
    'urn:barber',
    'urn:barber#consultarEmpleados'
);

$server->register('consultarServicios',
    array(),
    array('data' => 'xsd:string'),
    'urn:barber',
    'urn:barber#consultarServicios'
);

$server->register('registrarEmpleado',
    array(
        'tipoDocumento' => 'xsd:int',
        'documento' => 'xsd:string',
        'descripcion' => 'xsd:string',
    ),
    array('data' => 'xsd:string'),
    'urn:barber',
    'urn:barber#registrarEmpleado'
);
$server->service(file_get_contents("php://input"));

?>