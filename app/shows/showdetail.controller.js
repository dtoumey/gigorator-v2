angular.module('angularfireSlackApp')
  .controller('ShowDetailCtrl', function($scope, showDetail, otherBands, Bands, Priority){
    var showDetailCtrl = this;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    showDetailCtrl.loadBands = function (query) {
      var bands = [];
      return new Promise(function(resolve, reject) {
        var searchStrStart, searchStrEnd;
        function findBands(data) {
          searchStrEnd = data;
          var test = Bands.forPriority(searchStrStart, searchStrEnd).$loaded(function(data) {
            data.forEach(function(band) {
              bands.push({text: band.name});
            });
            resolve(bands);
          });
        }
        function getEndPriority(data) {
          searchStrStart = data;
          Priority.endPriority(query, findBands);
        }
        Priority.startPriority(query, getEndPriority);
      });
    };

    showDetailCtrl.addBand = function () {
      for (var i = 0; i < $scope.tags.length; i++) {
        Bands.add($scope.tags[i].text, showDetail);
      }
      $scope.tags = [];
    };

    showDetailCtrl.deleteBand = function (bandName) {
      Bands.remove(bandName, showDetail.$id);
    };

    showDetailCtrl.showDetail = showDetail;
    showDetailCtrl.otherBands = otherBands;

    var showTimestamp = showDetail.date * 1000;
    showDetailCtrl.status = showTimestamp > today ? 'UPCOMING' :
      showTimestamp === today ? 'TODAY' :
      'COMPLETE';
  });

