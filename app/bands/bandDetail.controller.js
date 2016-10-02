angular.module('angularfireSlackApp')
  .controller('BandDetailCtrl', function(band, showsPlayed){
    var bandDetailCtrl = this;

    bandDetailCtrl.band = band;
  });

