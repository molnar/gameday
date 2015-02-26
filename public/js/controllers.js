// var signupController = angular.module('signupController', [])

// function loginCtrl($scope, $http) {
//   $scope.formData = {};

//   $scope.registerUser = function() {
//        $http.post('/api/signup', data)
//             .success(function(data) {
//               console.log('IT WORKED...');
//               })
//          .error(function(data) {
//    console.log('Error: ' + data);
//      });
//   };

// }

'use strict';

// controllers
angular.module('authDemo.controllers', [])
  .controller('HomeController', ['$scope', 'User', '$state' ,function($scope,User,$state) {
      User.getProfile().then(function(user){
          $state.go('app.main');
      },function(err){
          console.log(err.data);
      })

  }])

  .controller('LoginController', ['$scope', 'User', '$state' ,function($scope,User,$state) {

      $scope.user = {};

      $scope.doLogin = function(){
          //console.log('logging in...')
          User.login($scope.user).then(function(user){

              //console.log('signed in ',user);

              if (typeof(Storage) != "undefined") {
                  // Store

                  localStorage.setItem("tkn", JSON.stringify(user));
                  // Retrieve
                  
              } else {
                  alert("Sorry, your browser does not support Web Storage...")
              }

              $state.go('app.main');

          },function(err){
              $scope.error = err.data;
          })
      }

  }])

  .controller('SignupController', ['$scope', 'User', '$state',function($scope,User,$state) {

      $scope.newUser = {};

      $scope.doRegister = function(){
          User.register($scope.newUser).then(function(user){

              $state.go('app.home');

          },function(err){
              $scope.error = err;
          })
      }

  }])

  .controller('ProfileController',['User','$scope',function(User,$scope){

      User.getProfile().then(function(user){
          $scope.user = user;
      })

  }])

  .controller('MainController',['User','$scope',function(User,$scope){
      User.getProfile().then(function(user){
          $scope.hairy = "...splash";
      })
      

  }])

  
