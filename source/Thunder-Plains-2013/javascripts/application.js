$(function () {
  initializeMap();
  initModals();
  initTabs();
  initSmoothScroll();
  initRoomColumnHover();
});


function initTabs() {




}

function initSmoothScroll() {
  // Smooth Scroll
  $('a[href*=#]:not([href=#])').click(function () {
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

    function toggleTab(e) {
      e.preventDefault();

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
        .slideDown();
    }

    var $talk = $(this).clone(),
      $modal = $('#modal-talks');

    $modal
      .modal();

    $modal
      .find('.modal-body')
      .html($talk);

    $modal
      .find('.nav-tabs a')
      .click(toggleTab);
  }
  $('.schedule-talk:not(".no-modal")').on("click", deployModal);
}

// Map
function initializeMap() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(35.467, -97.514),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  //Markers
  var markerPoints = [
    ['Thunder Plains', 'thunderplains', 35.464613, -97.514815, 2],
    ['Sheraton', 'hotel', 35.46665, -97.5152, 1],
    ['Renaissance', 'hotel', 35.466715, -97.514096, 1],
    ['The Skirvin', 'hotel', 35.46875, -97.514160, 1],
    ['Hampton Inn and Suites', 'hotel', 35.4662, -97.50755, 1],
    ['Colcord', 'hotel', 35.466723, -97.516944, 1],
    ['Chelinos Mexican Restaurant', 'food', 35.465511, -97.510845, 1],
    ['Bricktown Brewery', 'food', 35.466603, -97.510877, 1],
    ['Vast', 'food', 35.466517, -97.517615, 1],
    ['Park Avenue Grill', 'food', 35.4678, -97.514171, 1],
  ];

  function setMarkers(map, locations) {
    for (var i = 0, ii = locations.length; i < ii; i++) {
      var point = locations[i];
      var icon = 'images/marker-' + point[1] + '.png'
      var pointLatLong = new google.maps.LatLng(point[2], point[3]);
      var _marker = {
        position: pointLatLong,
        map: map,
        icon: icon,
        title: point[0],
        zIndex: point[4]
      };
      var marker = new google.maps.Marker(_marker);
    }
  }
  setMarkers(map, markerPoints);
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