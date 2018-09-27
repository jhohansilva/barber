$(document).ready(function(){

$('#fechaServicio').val(new Date().toDateInputValue());
$(".number").number(true);

if($(window).width() <= '425'){
  $('#nav-left').attr('class','display-none');
}

window.onscroll = function(){topNavStyle()};

function topNavStyle(){
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        $("#nav-top").attr('style','background:#222;box-shadow: 0 0 3px 0px #00000040;');
        $("#btn-nav").attr('style','color: #b5b2b2');

    } else {
        $("#nav-top").attr('style','background:transparent;box-shadow: none');
        $("#btn-nav").attr('style','color: #FFF');
    }
}

$('#corteCabello').change(function(){
  console.log($('#valorCorteCabello').css('display'));
  if($('#valorCorteCabello').css('display') == 'none'){
    $valorCorte = $('#valorCorteCabello').val();
    $('#totalServicio').html($valorCorte);
  }else if($('#valorCorteCabello').css('display') == 'inline-block'){
        $('#totalServicio').html('0');
  }
  $('#valorCorteCabello').fadeToggle('fast');
});

$('#valorCorteCabello').keydown(function(){
    setTimeout(function(){
      $valorCorte = $('#valorCorteCabello').val();
      console.log($valorCorte);
      $('#totalServicio').html($valorCorte);
    }, 100);
});

$("#itmFacturacion").click( function(){
    $("#subFacturacion").toggle("fast",function(){
        if($("#itmFacturacion").hasClass('active')){
            $("#itmFacturacion").removeClass('active');
            $("#expand").attr('style','transform:rotate(0deg)');
        }else{
            $("#itmFacturacion").addClass('active');
            $("#expand").attr('style','transform:rotate(-90deg)');
        }
    });
});

$("#btn-nav").click(function(){
    if($("#nav-left").hasClass('display-block')){
        $("#nav-left").attr('class','display-none');
        $("main").attr('style','padding-left: 0;');
    }else if($("#nav-left").hasClass('display-none')){
        $("#nav-left").attr('class','display-block');
        $("main").attr('style','padding-left: 20%;');
        if($(window).width() <= '425'){
          $('#bg-black').attr('class','display-block');
        };
    }
});

$('#bg-black').click(function(){
  $('#nav-left').attr('class','display-none');
  $('#bg-black').attr('class','display-none');
});

}); //Fin escript document.ready

$(function () {
    $(document).on('click', '#eliminarItem', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        $numItemsTable = $("#productos tr").length - 1;
        var i =1;
        $("#productos td#idItemTable").each(function(){
            $(this).html(i++);
        });
    });
});

function calcValProductos($idItem){
    $valorProducto = $("#valorProducto-"+$idItem+"").val();
    $cantidadProducto = $("#cantProducto-"+$idItem+"").val();
    $valorTotal = parseFloat($valorProducto) * parseFloat($cantidadProducto);
    $("#totalProducto-"+$idItem+"").val($valorTotal);
}

  Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });
