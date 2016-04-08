angular.module('angularfireSlackApp')
  .factory('Shows', function($firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'shows');
    var shows = $firebaseArray(ref);

    return shows;
  });
  