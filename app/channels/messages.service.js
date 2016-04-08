angular.module('angularfireSlackApp')
  .factory('Messages', function($firebaseArray, FirebaseUrl){
    var channelMessagesRef = new Firebase(FirebaseUrl+'channelsMessages');

    return {
      forChannel: function(channelId){
        return $firebaseArray(channelMessagesRef.child(channelId));
      }
    };
  });

