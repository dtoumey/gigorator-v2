angular.module('angularfireSlackApp')
  .factory('Shows', function($firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'shows');
    var bandsRef = new Firebase(FirebaseUrl+'bands');
    var now = new Date();
    var today = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() / 1000;
    var upcoming = $firebaseArray(ref.endAt(-today));
    console.log(today);
    var lastSeven = $firebaseArray(ref.startAt(-(today-1)).limitToFirst(7)); // -(today - 1) makes sure if there's a show today, it doesn't repeat

    return {
      upcoming: upcoming,
      lastSeven: lastSeven,
      playedWithBand: function(bandId) {
        debugger;
        var test = $firebaseArray(bandsRef.child(bandId).child('shows'));
        return test;
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
  