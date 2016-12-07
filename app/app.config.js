'use strict';

angular.
  module('EduCenterApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);
      // $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/students', {
          template: '<students></students>'
        }).
        when('/dashboard', {
          template: '<dashboard></dashboard>'
        }).
        otherwise('/students');
    }
  ]);
