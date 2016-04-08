angular.module('angularfireSlackApp')
  .controller('ShowsCtrl', function($state, shows){
    var showsCtrl = this;

    showsCtrl.shows = shows;
    showsCtrl.newShow = {
      date: '',
      pending: false,
      venue: ''
    };

    showsCtrl.createShow = function(){
      showsCtrl.channels.$add(showsCtrl.newShow).then(function(){
        showsCtrl.newShow = {
          date: '',
          pending: false,
          venue: ''
        };
      });
    };

    // showsCtrl.logout = function(){
    //   Auth.$unauth();
    //   $state.go('home');
    // };
  });

