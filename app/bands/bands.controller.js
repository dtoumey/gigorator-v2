angular.module('angularfireSlackApp')
  .controller('BandsCtrl', function(bands){
    var bandsCtrl = this;

    bandsCtrl.bands = bands;
  });

