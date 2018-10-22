<?php    
    header("Access-Control-Allow-Origin: *");

    require_once 'WebService/lib/nusoap.php';
    $wsdl = "http://localhost/barber/inc/webservice/server.php?wsdl";
    $client = new nusoap_client($wsdl, true);
    $err = $client->getError();

    $parametros = array(
        'tipoDocumento' => $_POST['tipoDocumento'],
        'documento' => $_POST['documento'],
        'descripcion' => $_POST['descripcion']
    );

    if ($err) {
        echo '<h2>Constructor error</h2>' . $err;
        exit();
    }
    
    try {                
        $result = $client->call('registrarEmpleado',$parametros);
        print_r($result);        
    } catch (Exception $e) {
        echo 'Caught exception: ', $e->getMessage(), "\n";
    }      
?>