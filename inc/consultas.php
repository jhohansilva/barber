<?php
    header("Access-Control-Allow-Origin: *");

    $tipoConsulta = $_POST['tipo'];

    error_reporting(E_ERROR | E_PARSE);
    require_once 'WebService/lib/nusoap.php';
    $wsdl = "http:/80.211.145.146/barber/inc/webservice/server.php?wsdl";
    $client = new nusoap_client($wsdl, true);
    $err = $client->getError();

    if ($err) {
        echo '<h2>Constructor error</h2>' . $err;
        exit();
    }
    try {                
        $result = $client->call('consultar'.$tipoConsulta, '');
        print_r($result);        
    } catch (Exception $e) {
        echo 'Caught exception: ', $e->getMessage(), "\n";
    }

    //echo $_SERVER['HTTP_REFERER'];
?>