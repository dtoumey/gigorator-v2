angular.module('angularfireSlackApp')
  .factory('Bands', function($firebaseArray, $firebaseObject, FirebaseUrl, Priority){
    var showsRef = new Firebase(FirebaseUrl+'shows');
    var bandsRef = new Firebase(FirebaseUrl+'bands');

    return {
      all: $firebaseArray(bandsRef),
      byId: function(bandId){
        return $firebaseObject(bandsRef.child(bandId));
      },
      forShow: function(showId){
        return $firebaseArray(showsRef.child(showId).child('bands'));
      },
      create: function(bandName){
        var nodeName = bandName.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
        nodeName = encodeURIComponent(nodeName);

        function setBandCallback(bandPriority) {
          bandsRef.child(nodeName).setWithPriority({ name: bandName, p: bandPriority }, bandPriority);
        }

        Priority.startPriority(bandName, setBandCallback);
      },
      forPriority: function (start, end) {
        return $firebaseArray(bandsRef.startAt(start).endAt(end));
      },
      // delete: function (band) {
      //   return bands.$remove(band);
      // },
      add: function (bandName, show) {
        debugger;
        var nodeName = bandName.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
        nodeName = encodeURIComponent(nodeName);
        var bandObj = { 'name' : bandName };
        var showObj = { 'date' : show.date, 'venue' : show.venue };

        function setBandFirstTime(bandPriority) {
          bandsRef.child(nodeName).setWithPriority(bandObj, bandPriority);
          setShow();
        }

        function setShow() {
          bandsRef.child(nodeName).child('shows').child(show.date).setWithPriority(showObj, -show.date);
          showsRef.child(show.$id).child('bands').child(nodeName).set(bandObj);
        }


        bandsRef.child(nodeName).once('value', function (snapshot) {
          if (snapshot.exists()) {
            Priority.startPriority(bandName, setShow);
          } else {
            Priority.startPriority(bandName, setBandFirstTime);
          }
        });

      }
    };
  });
  