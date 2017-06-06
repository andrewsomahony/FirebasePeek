'use strict';

var app = require('./app');

function RouteResolver(state) {
    return {
        // For some reason we have to use $stateParams here
        // instead of our StateService, as our StateService $state
        // object has the old params, not the new ones.

        resolvedState: ['services.data_resolver', '$stateParams',
                        function(DataResolverService, $stateParams) {
                            return DataResolverService(state, $stateParams);
                        }]
    };
}

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise("/login/");

   // The controllers all export the name of the controller,
   // so we just have require here to get that

   $stateProvider.state('main', {
      url: "/",
      templateUrl: "main.html",
      abstract: true
   })

   .state("main.page", {
       url: "",
       abstract: true,
       views: {

       }
   })

   .state("main.page.login", {
      url: "login",
      abstract: true,
       views: {
         "status_bar@main": {
             templateUrl: "partials/main/status_bar.html",
             controller: require('controllers/main/status_bar')
         },
         "content@main": {
             templateUrl: "partials/main/login/login.html"
         }
       }
   })
   .state("main.page.login.default", {
       resolve: RouteResolver("main.page.login.default"),
       url: "/",
       views: {
         "sub_content@main.page.login": {
            templateUrl: "partials/main/login/content.html",
            controller: require('controllers/main/login/default'),
         },
      }
   })

   .state("main.page.home", {
      url: "",
      abstract: true,
       views: {
         "status_bar@main": {
             templateUrl: "partials/main/status_bar.html",
             controller: require('controllers/main/status_bar')
         },
         "content@main": {
             templateUrl: "partials/main/home/home.html"
         }
       }
   })
   .state("main.page.home.default", {
       resolve: RouteResolver("main.page.home.default"),
       url: "",
       views: {
         "sub_content@main.page.home": {
            templateUrl: "partials/main/home/content.html",
            controller: require('controllers/main/home/default'),
         },
      }
   })
}]);
