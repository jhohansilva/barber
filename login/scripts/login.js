$(document).ready(principal);

function principal(){
    $('#toogleClave').click(toogleClave);
    $('#validarForm').click(cargarPeticion);
}

function cargarPeticion(){
  $('#validarForm').removeClass('btn-marron-barber');
  $('#validarForm').addClass('disabled-button-login');
  $('#validarForm').text('');
  $('#validarForm').html('<div class="loader"></div>');
  $('#validarForm').attr('disabled','true');
  setTimeout(function(){enviarformulario()}, 1000);
  return false;
}

function enviarformulario(){
  var delay = 20000;
  $.ajax({
    type:'POST',
    url: 'inc/ingreso.php',
    data: $("#login").serialize(),
    timeout: 30000,
    success: function(data){
      $('#validarForm').addClass('btn-marron-barber');
      $('#validarForm').removeClass('disabled-button-login');
      $('#validarForm').text('');
      $('#validarForm').html('Iniciar sesión');
      $('#validarForm').removeAttr('disabled');
      $("#mensaje-error").attr("class","display-block");
      $("#mensaje-error").html(data);
    }
  });

  return false;
}

function toogleClave(){
    var passwordField = document.getElementById('clave');
	var value = passwordField.value;

	if(passwordField.type == 'password') {
		passwordField.type = 'text';
        $('#toogleClave').attr('class','lsf-icon passwordActive');
	}
	else {
		passwordField.type = 'password';         $('#toogleClave').attr('class','lsf-icon password');
	}

	passwordField.value = value;
}
