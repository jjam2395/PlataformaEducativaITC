
jQuery(document).ready(function($){

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
    
    $('.modal').modal();
});
