angular.module('angularfireSlackApp')
  .factory('Shows', function($firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'shows');
    var bandsRef = new Firebase(FirebaseUrl+'bands');
    var shows = $firebaseArray(ref);

    return {
      all: shows,
      playedWithBand: function(bandId) {
        return $firebaseArray(bandsRef.child(bandId).child('shows'));
      }
      // ,
      // byBand: function(bandId) {
      //   var showIds = [];
      //   var shows = [];
      //   bandsRef.child(bandId).child('shows').once('value', function (snapshot) {
      //     showIds = snapshot.val();
      //     function pushFunc (showSnapshot) {
      //       debugger;
      //       shows.push(showSnapshot.val());
      //     }
      //     for (var i = 0; i < showIds.length; i++) {
      //       ref.child(showIds[i]).once('value', pushFunc);
      //     }
      //       debugger;
      //     return shows;
      //   });

      // }
    };
  });
  