$(function() {
  initModals();
  initTabs();
  initSmoothScroll();
  initRoomColumnHover();
});


function initTabs() {




}

function initSmoothScroll() {
  // Smooth Scroll
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

}

function initModals() {
  function deployModal() {

    function toggleTab(eve) {
      eve.preventDefault();

      $modal
        .find('.tab-pane')
        .hide()
        .end()
        .find('.nav-tabs li')
        .removeClass('active');

      $(this)
        .parent()
        .addClass('active');

      $modal
        .find($(this).attr('href'))
        .fadeIn(250);
    }

    var $talk = $(this).clone(),
      $modal = $('#modal-talks');

    $modal
      .modal();

    $modal
      .find('.modal-dialog')
      .addClass('modal-lg')

    $modal
      .find('.modal-body')
      .html($talk);

    $modal
      .find('.nav-tabs a')
      .click(toggleTab);
  }

  $('.schedule-talk:not(".no-modal")')
    .on("click", deployModal);
}


function initRoomColumnHover() {
  function attachHandlers(room) {

    var sroom = '.schedule-' + room,
      legend = '.legend-' + room,
      $room = $(sroom),
      $legend = $(legend);

    function lightColumn() {
      $legend.addClass('hover');
      $room.addClass('hover');
    }

    function darkColumn() {
      $legend.addClass('hover');
      $room.removeClass('hover');
    }

    $legend
      .on('mouseenter', lightColumn)
      .on('mouseleave', darkColumn);
  }

  var rooms = ['room1', 'room2', 'room3'];

  for (var i = 0, ii = rooms.length; i < ii; i++) {
    attachHandlers(rooms[i]);
  }
}
