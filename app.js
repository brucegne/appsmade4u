  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4AoZnjRJZ8JxnEjZQI9zzZsk2bGIkFms",
//    authDomain: "bgblog-f5606.firebaseapp.com",
    databaseURL: "https://bgblog-f5606.firebaseio.com",
    storageBucket: "bgblog-f5606.appspot.com",
  };
  firebase.initializeApp(config);

var app = angular.module('app', ['firebase', 'ui.router', 'btford.markdown']);

app.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');
        $stateProvider
            .state("home", {
                url: "/",
                controller: "HomeCtrl",
                templateUrl: "home/home.html"
            }).state("admin", {
                url: "/admin",
                controller: "AdminCtrl",
                templateUrl: "admin/admin.html"
            }).state("edit", {
                url: "/edit/:postKey",
                controller: "EditCtrl",
                templateUrl: "admin/edit.html"
            }).state("post", {
                url: "/post/:postID",
                controller: "PostCtrl",
                templateUrl: "home/post.html"
            }).state("basis", {
                url: "/basis",
                controller: "basisCtrl",
                templateUrl: "home/basis.html"
            });
}]);

app.directive('myFirstDirective', function() {
  return {
    template: "<h4>Made by Bruce E. Gordon</h4>"
  }
})

app.service('CommonProp', function() {
    var user = '';
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});

app.directive('myDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value.indexOf("e") > -1) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
