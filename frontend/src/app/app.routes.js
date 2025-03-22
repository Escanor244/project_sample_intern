// src/app/app.routes.js

angular.module('quizApp').config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'src/app/components/login/login.component.html',
        controller: 'LoginController'
    })
    .when('/signup', {
        templateUrl: 'src/app/components/signup/signup.component.html',
        controller: 'SignupController'
    })
    .when('/dashboard', {
        templateUrl: 'src/app/components/dashboard/dashboard.component.html',
        controller: 'DashboardController as vm',
        
    })
    .when('/game', {
        templateUrl: 'src/app/components/game/game.component.html',
        controller: 'GameController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
