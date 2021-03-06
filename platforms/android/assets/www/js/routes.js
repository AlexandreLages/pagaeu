angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('pagaEu', {
    url: '/listFriends',
    templateUrl: 'templates/pagaEu.html',
    controller: 'pagaEuCtrl'
  })

  .state('maraca', {
    url: '/friend',
    templateUrl: 'templates/maraca.html',
    controller: 'maracaCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('criarConta', {
    url: '/criarconta',
    templateUrl: 'templates/criarConta.html',
    controller: 'criarContaCtrl'
  })

$urlRouterProvider.otherwise('/login')

});