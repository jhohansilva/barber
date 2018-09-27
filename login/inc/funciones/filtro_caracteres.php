<?php
function filtrar_caracteres($nombre){
$permitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.";
for ($i=0; $i<strlen($nombre); $i++)
{
	if (strpos($permitidos, substr($nombre,$i,1))===false)
	{
        return false;
        echo "Error";
    }
}
return true;
};
?>
