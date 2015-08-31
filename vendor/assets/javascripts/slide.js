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
    }

    if (wSize > 768) {
      $('#main-content').css({'margin-left': '210px'});
      $('#sidebar > ul').show();
      $('#sidebar').css({'margin-left': '0'});
      $('#container').removeClass('sidebar-close');
      $('#sidebar > ul').show();
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

// var responsiveView = function(event){
//   console.log("here")
//   var viewerWidth = $(document).width();
//   console.log(viewerWidth)
//   if (viewerWidth <= 768) {
//     $('#container').addClass('sidebar-close');
//     $('#sidebar > ul').hide();
//     $('#main-content').css({
//       'margin-left': '0px'
//     });
//     $('#sidebar').css({
//       'margin-left': '-210px'
//     });
//   }

//   if (viewerWidth > 768) {
//       $('#container').removeClass('sidebar-close');
//       $('#sidebar > ul').show();
//   }

// };


// $(function() {
//     $('#nav-accordion').dcAccordion({
//         eventType: 'click',
//         autoClose: true,
//         saveState: true,
//         disableLink: true,
//         speed: 'slow',
//         showCount: false,
//         autoExpand: true,
// //        cookie: 'dcjq-accordion-1',
//         classExpand: 'dcjq-current-parent'
//     });
// });

// var Script = function () {


// //    sidebar dropdown menu auto scrolling

//     $('#sidebar .sub-menu > a').click(function () {
//         var o = ($(this).offset());
//         diff = 250 - o.top;
//         if(diff>0)
//             $("#sidebar").scrollTo("-="+Math.abs(diff),500);
//         else
//             $("#sidebar").scrollTo("+="+Math.abs(diff),500);
//     });



// //    sidebar toggle

//     $(function() {
//         function responsiveView() {
//             var wSize = $(window).width();
//             if (wSize <= 768) {
//                 $('#container').addClass('sidebar-close');
//                 $('#sidebar > ul').hide();
//             }

//             if (wSize > 768) {
//                 $('#container').removeClass('sidebar-close');
//                 $('#sidebar > ul').show();
//             }
//         }
//         $(window).on('load', responsiveView);
//         $(window).on('resize', responsiveView);
//     });

//     $('.fa-bars').click(function () {
//         console.log("here")
//         if ($('#sidebar > ul').is(":visible") === true) {
//             $('#main-content').css({
//                 'margin-left': '0px'
//             });
//             $('#sidebar').css({
//                 'margin-left': '-210px'
//             });
//             $('#sidebar > ul').hide();
//             $("#container").addClass("sidebar-closed");
//         } else {
//             $('#main-content').css({
//                 'margin-left': '210px'
//             });
//             $('#sidebar > ul').show();
//             $('#sidebar').css({
//                 'margin-left': '0'
//             });
//             $("#container").removeClass("sidebar-closed");
//         }
//     });

// // // custom scrollbar
// //     $("#sidebar").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

// //     $("html").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});

// // // widget tools

//     $('.panel .tools .fa-chevron-down').click(function () {
//         var el = $(this).parents(".panel").children(".panel-body");
//         if ($(this).hasClass("fa-chevron-down")) {
//             $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
//             el.slideUp(200);
//         } else {
//             $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
//             el.slideDown(200);
//         }
//     });

//     $('.panel .tools .fa-times').click(function () {
//         $(this).parents(".panel").parent().remove();
//     });


// //    tool tips

//     $('.tooltips').tooltip();

// //    popovers

//     $('.popovers').popover();



// // custom bar chart

//     if ($(".custom-bar-chart")) {
//         $(".bar").each(function () {
//             var i = $(this).find(".value").html();
//             $(this).find(".value").html("");
//             $(this).find(".value").animate({
//                 height: i
//             }, 2000)
//         })
//     }