angular.module('angularfireSlackApp')
  .factory('ShowDetail', function($firebaseObject, $firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'shows');

    return {
      forShow: function(showId){
        return $firebaseObject(ref.child(showId));
      },
      bandsForShow: function(showId){
        return $firebaseArray(ref.child(showId).child('bands'));
      }
    };
  });
  