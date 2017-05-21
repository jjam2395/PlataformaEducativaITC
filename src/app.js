
jQuery(document).ready(function($){
    $('.collapsible').collapsible();

    //SIDENAV (barra de navegacion izquierda del usuario)
    $(".button-collapse-sideNav").sideNav({
      menuWidth: 250,
      closeOnClick: true,
      hover:true
    });

    $(".button-collapse").sideNav({
      menuWidth: 250,
      closeOnClick: true
    });

    $('.chips').material_chip();

    $('.chips').on('chip.add', function(e, chip){
    // you have the added chip here
    });

      $('.modal').modal();
});
