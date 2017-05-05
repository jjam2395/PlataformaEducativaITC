jQuery(document).ready(function($){
    $('.collapsible').collapsible();
    //SIDENAV 
    $(".button-collapse-sideNav").sideNav({
      menuWidth: 250,
      closeOnClick: true 
    });

    $(".button-collapse").sideNav({
      menuWidth: 250,
      closeOnClick: true 
    });
  });
