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
      showsCtrl.shows.$add(showsCtrl.newShow).then(function(){
        showsCtrl.newShow = {
          date: '',
          pending: false,
          venue: ''
        };
        $state.go('shows');
      });
    };

    // showsCtrl.logout = function(){
    //   Auth.$unauth();
    //   $state.go('home');
    // };
  });

