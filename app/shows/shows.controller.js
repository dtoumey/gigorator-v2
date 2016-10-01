angular.module('angularfireSlackApp')
  .controller('ShowsCtrl', function($state, upcomingShows, lastSevenShows, FirebaseUrl){
    var showsCtrl = this;
    var ref = new Firebase(FirebaseUrl+'shows');
    var now = new Date();

    showsCtrl.upcomingShows = upcomingShows;
    showsCtrl.lastSevenShows = lastSevenShows;
    showsCtrl.newShow = {
      date: '',
      pending: false,
      venue: ''
    };
    showsCtrl.error = '';
    showsCtrl.today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    showsCtrl.createShow = function(){
      var date = (new Date(showsCtrl.newShow.date).valueOf() / 1000).toString(); // store date in timestamp format
      ref.once("value", function(snapshot) {
        var showExists = snapshot.child(date).exists();
        if (!showExists) {
          showsCtrl.newShow.date = date;
          ref.child(date).setWithPriority(showsCtrl.newShow, -date).then(function(){
            showsCtrl.newShow = {
              date: '',
              pending: false,
              venue: ''
            };
            $state.go('shows');
          });
        } else {
          showsCtrl.error = 'Show already exists.';
        }
      });
    };
  });

