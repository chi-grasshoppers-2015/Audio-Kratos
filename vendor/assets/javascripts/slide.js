$(function() {
  $(".sub-menu-title").click(function(){
    $(this).siblings(".sub-menu-items").slideToggle();
  })

  function responsiveView() {
    var wSize = $(window).width();
    if (wSize <= 768) {
      $('#main-content').css({'margin-left': '0px'});
      $('#sidebar').css({'margin-left': '-210px'});
      $('#container').addClass('sidebar-close');
      $('#sidebar > ul').hide();
      $('ul.top-menu > li > a').hide();
    }

    if (wSize > 768) {
      $('#main-content').css({'margin-left': '210px'});
      $('#sidebar > ul').show();
      $('#sidebar').css({'margin-left': '0'});
      $('#container').removeClass('sidebar-close');
      $('#sidebar > ul').show();
      $('ul.top-menu > li > a').show();
    }
  }

  $(window).on('load', responsiveView);
  $(window).on('resize', responsiveView);

  $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-210px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '210px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });
});
