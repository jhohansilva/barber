<?php
function getError($id, $value){
    return array('codigo_error' => $id, 'descripcion' => $value);
}

function getErrorJson($id, $value){
    return json_encode(array('codigo_error' => $id, 'descripcion' => $value));
}