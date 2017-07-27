/* ================================
    Basemap Setting
================================ */

var map = L.map('map', {
  center: [39.953679, -75.175125],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/* ================================
    Bootstrap Setting
================================ */

// Initial Display
$('#sidebar2').hide();
$('.page').hide();
$('#item10').show();

// Secondary Slides
$('li[role="presentation"]').click(function(){
  $('#sidebar2').hide();
  $('#map').removeClass('map col-md-7');
  $('#map').addClass('map col-md-9');
});
// Main Slides Switch
$('li[role="presentation"]').click(function() {
  $('li[role="presentation"]').removeClass('active');
  $(this).addClass('active');
});
$('#MP1').click(function(){
  $('#MainPage1').show();
  $('#MainPage2').hide();
  $('#MainPage3').hide();
  $('#item10').show();
});
$('#MP2').click(function(){
  $('#MainPage1').hide();
  $('#MainPage2').show();
  $('#MainPage3').hide();
  $('#item21').show();
});
$('#MP3').click(function(){
  $('#MainPage1').hide();
  $('#MainPage2').hide();
  $('#MainPage3').show();
  // $('#item31').show();
  $('#chart_div').hide();
});


// MainPage1 Subpagers Switch
$('#Modes').click(function(){
  $('.page').hide();
  $('#item10').show();
  resetMap(cGroup);
});
$('li[role="veh"]').click(function(){
  $('.page').hide();
  $('#item11').show();
  resetMap(cGroup);
  traffic_vehicle();
});
$('li[role="bic"]').click(function(){
  $('.page').hide();
  $('#item12').show();
  resetMap(cGroup);
  traffic_bicycle();
});
$('li[role="ped"]').click(function(){
  $('.page').hide();
  $('#item13').show();
  resetMap(cGroup);
  traffic_pedestrian();
});
$('li[role="ResetM"]').click(function(){
  resetMap(cGroup);
});
// MainPage1 Subpage1 Setting
$('#Autoplay').click(function(){
  Autoplay();
});
$('li').click(function(){
  clearInterval(timer);
  resetMap(cGroup);
});

// MainPage2 Subpagers Switch
$('li[role="21"]').click(function(){
  $('.page').hide();
  $('#item21').show();
  resetMap(cGroup);
});
$('li[role="22"]').click(function(){
  $('.page').hide();
  $('#item22').show();
  resetMap(cGroup);
  concept_radius();
});
$('li[role="23"]').click(function(){
  $('.page').hide();
  $('#item23').show();
  resetMap(cGroup);
  StreetDensity();
});
// MainPage2 Subpage2 Setting
$('.pagination').click(function(){
  resetMap(cGroup);
  SelectSD();
  StreetDensity();
});
$('#buttonGroup').click(function(){
  resetMap(cGroup);
  SelectSD();
  StreetDensity();
});

// MainPage3 Setting
$('#AModes').click(function(){
  $('#chart_div').show();
  resetMap(cGroup);
  FlowRegression();
  // GoogleChart();
});
$('#Detial').click(function(){
  $('#sidebar2').toggle();
  $('#map').toggleClass('map col-md-9');
  $('#map').toggleClass('map col-md-7');
});
/* ================================
    Button Setting
================================ */

$(document).ready(function() {
  //traffic_vehicle();
});

// var clickButton = function(){
// }


/* ================================
    Reset Map
================================ */

var resetMap = function(data) {
  _.each(data, function(marker) {
    map.removeLayer(marker);
  });
  map.setView(new L.LatLng(39.953679, -75.175125), 14);
};


/* ================================
    Bootstrap Mapping
================================ */

var countsLayer = [];
var cGroup = [];
var cartoUserName = 'hjx10216';

var traffic_pedestrian = function() {
  countsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [
      {
        sql: 'SELECT d.* From (SELECT cartodb_id, the_geom_webmercator, aadp FROM pedestrian_sel) AS d',
        cartocss: '#pedestrian_sel {marker-width: ramp([aadp],(1,3,5,9,13,17,23,29),quantiles);marker-fill: #FFB927;marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.2;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-allow-overlap: true;}',
        interactivity: ['aadp'], // Define properties you want to be available on interaction
      }
    ]
  }).addTo(map).done(function(layer) {
    cGroup.push(layer);
  });
}

var traffic_bicycle = function() {
  countsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [
      {
        sql: 'SELECT d.* From (SELECT cartodb_id, the_geom_webmercator, aadb FROM bicycle_sel) AS d',
        cartocss: '#bicycle_sel {marker-width: ramp([aadb],(1,3,5,9,13,17,23,29),quantiles);marker-fill: #FFB927;marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.2;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-allow-overlap: true;}',
        interactivity: ['aadb'], // Define properties you want to be available on interaction
      }
    ]
  }).addTo(map).done(function(layer) {
    cGroup.push(layer);
  });
}

var traffic_vehicle = function() {
  countsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [
      {
        sql: 'SELECT d.* From (SELECT cartodb_id, the_geom_webmercator, aadt FROM traffic_sm) AS d',
        cartocss: '#traffic_sm {marker-width: ramp([aadt],(1,3,5,9,13,17,23,29),quantiles);marker-fill: #FFB927;marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.2;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-allow-overlap: true;}',
        interactivity: ['aadt'], // Define properties you want to be available on interaction
      }
    ]
  }).addTo(map).done(function(layer) {
    cGroup.push(layer);
  });
}


/* ================================
    Autoplay Mapping
================================ */

var times = 0;
var RTimes = 0;
var timer ;

var Autoplay = function(){
  clearInterval(timer);
  times = 0;
  timer = setInterval(function(){
    times += 1;
    RTimes = times + 1995;
    resetMap(cGroup);
    YearMap();
    console.log(times);
    $('#Year').val(RTimes);
    if (times >= 21){ clearInterval(timer);};
  }, 2000);
};


var YearMap = function() {
  countsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [{
      sql: 'SELECT d.* From (SELECT cartodb_id, the_geom_webmercator, aadt FROM traffic_s WHERE (setyear = '+ RTimes +' )) AS d ',
      cartocss: '#traffic_s {marker-width: ramp([aadt],(1,3,5,9,13,17,23,29),quantiles);marker-fill: #FFB927;marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.2;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-allow-overlap: true;}',
      interactivity: ['aadt'], // Define properties you want to be available on interaction
    }]
  }).addTo(map).done(function(layer) {cGroup.push(layer);});
}


/* ================================
    Radius Display
================================ */

var num = 1;
var RNum = 400;

$('#slider').on('change', function () {
    num = $(this).val();
    RNum = 400 * num;
    console.log(num);
    $('#Radius').text(RNum);
    resetMap(cGroup);
    concept_radius();
});

 var concept_radius = function() {
   countsLayer = cartodb.createLayer(map, {
     user_name: cartoUserName,
     type: 'cartodb',
     interactivity: true,
     sublayers: [{
       sql: 'SELECT ps.cartodb_id, ps.the_geom_webmercator FROM selecteddistancerp AS ps, (SELECT * FROM traffic_sm WHERE aadt = 13434) AS ts WHERE ST_DWithin (ts.the_geom::geography, ps.the_geom::geography,'+ RNum +') ',
       cartocss: '#selecteddistancerp {line-color: #FFB927; line-width: 1.5; line-opacity: 1;}',
       //interactivity: ['m_c_r04800'], // Define properties you want to be available on interaction
     }]
   }).addTo(map).done(function(layer) {cGroup.push(layer);});
 }


 /* ================================
     Street Density
 ================================ */

var SelNum = 1;
var RadiusSD = '00400';

$('#SBB1').click(function(){SelNum = 1;});
$('#SBB2').click(function(){SelNum = 2;});
$('#SBB13').click(function(){SelNum = 3;});
$('#SBB4').click(function(){SelNum = 4;});
$('#SBB5').click(function(){SelNum = 5;});
$('#SBB6').click(function(){SelNum = 6;});
$('#SBB7').click(function(){SelNum = 7;});
$('#SB1').click(function(){SelNum = 1;});
$('#SB2').click(function(){SelNum = 2;});
$('#SB3').click(function(){SelNum = 3;});
$('#SB4').click(function(){SelNum = 4;});
$('#SB5').click(function(){SelNum = 5;});
$('#SB6').click(function(){SelNum = 6;});
$('#SB7').click(function(){SelNum = 7;});
$('#SBP').click(function(){if (SelNum > 1){SelNum -= 1;}});
$('#SBN').click(function(){if (SelNum < 7){SelNum += 1;}});


var SelectSD = function(){
  if (SelNum == 1){RadiusSD='00400';}
  else if (SelNum == 2){RadiusSD='00800';}
  else if (SelNum == 3){RadiusSD='01200';}
  else if (SelNum == 4){RadiusSD='01600';}
  else if (SelNum == 5){RadiusSD='02400';}
  else if (SelNum == 6){RadiusSD='04800';}
  else if (SelNum == 7){RadiusSD='09600';}
};


var StreetDensity = function() {
 countsLayer = cartodb.createLayer(map, {
   user_name: cartoUserName,
   type: 'cartodb',
   interactivity: true,
   sublayers: [{
     sql: 'SELECT * FROM selecteddistancerp',
     cartocss: '#selecteddistancerp {line-color: ramp([mmd_r'+ RadiusSD +'],(#d62f27,#e86646,#f59869,#fccb92,#ffffbf,#d0d9bf,#a2b4bd,#7393ba,#4575b5),quantiles);line-width: 1.5;line-opacity: 1;}',
     //interactivity: ['m_c_r04800'], // Define properties you want to be available on interaction
   }]
 }).addTo(map).done(function(layer) {cGroup.push(layer);});
};

/* ================================
    Analysis
================================ */
var TrafficModes;
var infowindowTemplate;
var Flows;


$('#PM').click(function(){TrafficModes = 'pedestrian';});
$('#BM').click(function(){TrafficModes = 'bicycle';});
$('#VM').click(function(){TrafficModes = 'vehicle';});

var iTF = function(){
  infowindowTemplate =
  '<div class="cartodb-popup v2"> \
    <div class="infowindow-custom"> \
      <a href="#close" class="cartodb-popup-close-button close">x</a> \
        <div class="cartodb-popup-content-wrapper"> \
          <div class="cartodb-popup-content"> \
            <h2>Flows: {{content.data.'+ TrafficModes +'}}</h2> \
            <p>The number above shows the traffic flows of '+ TrafficModes +'mode.</p> \
          </div> \
        </div> \
      </div> \
    <div class="cartodb-popup-tip-container"></div> \
  </div>';
  return infowindowTemplate;
};


var FlowRegression = function(){
  countsLayer = cartodb.createLayer(map, {
    user_name: cartoUserName,
    type: 'cartodb',
    interactivity: true,
    sublayers: [{
      sql: 'SELECT * FROM street_sjtm',
      cartocss: '#street_sjtm {line-color: #FFB927;line-width: ramp(['+ TrafficModes +'],(0.1,0.2,0.3,0.5,0.7,0.9,1.1,1.4,1.7,2.6),quantiles);line-opacity: 1;}',
      interactivity: [TrafficModes], // Define properties you want to be available on interaction
    }]
  }).addTo(map).done(function(layer) {
    var sublayer = layer.getSubLayer(0);
    sublayer.on('featureClick', function(e, latlng, pos, data) {
      Flows = data[TrafficModes];
      GoogleChart();
    });

    cGroup.push(layer);
    //Function
    layer.setInteraction(true);
    //console.log(layer);
    //<script>alert("Hey");</script>\
    cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), [TrafficModes], {
      infowindowTemplate: iTF(),
      templateType: 'mustache'
    });
  });
};

/* ================================
    Google Chart
================================ */
var data;
var GoogleChart = function(){
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawBasic);
  function drawBasic() {
    if (TrafficModes == 'pedestrian'){
      data = google.visualization.arrayToDataTable([
        ['', 'Traffic Flow'],
        ['10%', 73],
        ['20%', 761],
        ['30%', 1236],
        ['40%', 1725],
        ['50%', 2226],
        ['60%', 2668],
        ['70%', 3115],
        ['80%', 3626],
        ['90%', 4329],
        ['100%', 7580],
      ]);
    }
    else if (TrafficModes == 'bicycle'){
      data = google.visualization.arrayToDataTable([
        ['', 'Traffic Flow'],
        ['10%', 151],
        ['20%', 224],
        ['30%', 288],
        ['40%', 340],
        ['50%', 391],
        ['60%', 447],
        ['70%', 508],
        ['80%', 586],
        ['90%', 701],
        ['100%', 1547],
      ]);
    }
    if (TrafficModes == 'vehicle'){
      data = google.visualization.arrayToDataTable([
        ['', 'Traffic Flow'],
        ['10%', 65],
        ['20%', 5272],
        ['30%', 9294],
        ['40%', 12864],
        ['50%', 16427],
        ['60%', 20126],
        ['70%', 24401],
        ['80%', 31129],
        ['90%', 45908],
        ['100%', 141600],
      ]);
    }


    var options = {
      legend:{position:'none'},
      width:320,
    };

    //var materialChart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
    materialChart.draw(data, options);
    google.visualization.events.addListener(materialChart, 'ready', readyHandler);
    function readyHandler(e) {
      if (TrafficModes == 'pedestrian'){
        if (Flows < -1426){materialChart.setSelection([{"row":0,"column":1}]);}
        else if (Flows < -738){materialChart.setSelection([{"row":1,"column":1}]);}
        else if (Flows < -263){materialChart.setSelection([{"row":2,"column":1}]);}
        else if (Flows < 225){materialChart.setSelection([{"row":3,"column":1}]);}
        else if (Flows < 726){materialChart.setSelection([{"row":4,"column":1}]);}
        else if (Flows < 1168){materialChart.setSelection([{"row":5,"column":1}]);}
        else if (Flows < 1615){materialChart.setSelection([{"row":6,"column":1}]);}
        else if (Flows < 2126){materialChart.setSelection([{"row":7,"column":1}]);}
        else if (Flows < 2829){materialChart.setSelection([{"row":8,"column":1}]);}
        else if (Flows < 6080){materialChart.setSelection([{"row":9,"column":1}]);}
      }
      else if (TrafficModes == 'bicycle'){
        if (Flows < -148){materialChart.setSelection([{"row":0,"column":1}]);}
        else if (Flows < -75){materialChart.setSelection([{"row":1,"column":1}]);}
        else if (Flows < -11){materialChart.setSelection([{"row":2,"column":1}]);}
        else if (Flows < 40){materialChart.setSelection([{"row":3,"column":1}]);}
        else if (Flows < 91){materialChart.setSelection([{"row":4,"column":1}]);}
        else if (Flows < 147){materialChart.setSelection([{"row":5,"column":1}]);}
        else if (Flows < 208){materialChart.setSelection([{"row":6,"column":1}]);}
        else if (Flows < 286){materialChart.setSelection([{"row":7,"column":1}]);}
        else if (Flows < 401){materialChart.setSelection([{"row":8,"column":1}]);}
        else if (Flows < 1247){materialChart.setSelection([{"row":9,"column":1}]);}
      }
      else if (TrafficModes == 'vehicle'){
        if (Flows < -3334){materialChart.setSelection([{"row":0,"column":1}]);}
        else if (Flows < 1872){materialChart.setSelection([{"row":1,"column":1}]);}
        else if (Flows < 5894){materialChart.setSelection([{"row":2,"column":1}]);}
        else if (Flows < 9464){materialChart.setSelection([{"row":3,"column":1}]);}
        else if (Flows < 13027){materialChart.setSelection([{"row":4,"column":1}]);}
        else if (Flows < 16726){materialChart.setSelection([{"row":5,"column":1}]);}
        else if (Flows < 21001){materialChart.setSelection([{"row":6,"column":1}]);}
        else if (Flows < 27729){materialChart.setSelection([{"row":7,"column":1}]);}
        else if (Flows < 42508){materialChart.setSelection([{"row":8,"column":1}]);}
        else if (Flows < 138200){materialChart.setSelection([{"row":9,"column":1}]);}
      }
      // materialChart.setSelection([{"row":8,"column":1}]);
    }
  }
};
