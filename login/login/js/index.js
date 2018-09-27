$(document).ready(function(){
  botones();
  $('#inicioSesion').click(consultaUsuario);
});

function consultaUsuario(){
  $.ajax({
    type: 'POST',
    url: 'inc/login.php',
    data: $('#datosLogin').serialize(),
    success: function(data){
      console.log(data);
    }
  });
}
