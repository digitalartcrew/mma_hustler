angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,$http) {
  $scope.data = {};
  var authData;


  $scope.loggedIn = false;
  $scope.isLoggedIn = function() {
    return $scope.loggedIn;
  };

  
  var ref = new Firebase("https://shining-fire-8120.firebaseio.com");

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signUpData = {};

  //Form for Facebook
   var fbData = [];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  $scope.signupEmail = function(data){  
   
    ref.createUser({
      email    : data.email,
      password : data.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);

      } else {
        console.log("Successfully created user account with uid:", userData.uid);

        return $state.go('app.gyms');
        
      }
    });
    
  };

  $scope.loginEmail = function(data){

    ref.authWithPassword({
      email    : data.email,
      password : data.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:");
        $scope.isLoggedIn = true;
        $scope.isLoggedIn();
        return $state.go('app.gyms');
        
      }
    });

     // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
    
  };


  $scope.loginFacebook = function(){
   
    if(ionic.Platform.isWebView()){
     
      $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
       
        console.log(success);
        
        ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
          if (error) {
            console.log('Firebase login failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData);

            return $state.go('app.gyms');
          }
        });
        
      }, function(error){
        console.log(error);
      });        
      
    }
    else {
     
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          fbData.push(authData);
          $scope.displayName = authData.facebook.displayName;
          $scope.profileImageURL = authData.facebook.profileImageURL;
          $scope.modal.hide();
          $scope.loggedIn = true;
        
        }
      });
      
    }
    
  };


  $scope.logoutFacebook = function(){
    ref.unauth();
    $scope.loggedIn = false;
    console.log("Should be loggin out!");
       return $state.go('app.gyms');
    };
  })





.controller('GymsCtrl', function($scope) {
  })

.controller('GymCtrl', function($scope, $stateParams) {
})

.controller('YogaCtrl', function($scope, $stateParams) {
})

.controller('mmaCtrl', function($scope, $stateParams) {
})

.controller('WrestlingCtrl', function($scope, $stateParams) {
})

.controller('BjjCtrl', function($scope, $stateParams) {
})

.controller('BoxingCtrl', function($scope, $stateParams) {
})

.controller('AcCtrl', function($scope, $stateParams,$ionicLoading, $compile) {
  
  

      //   $scope.map = map;
    
      // google.maps.event.addDomListener(window, 'load', initialize);
      
      // $scope.centerOnMe = function() {
      //   if(!$scope.map) {
      //     return;
      //   }

      //   $scope.loading = $ionicLoading.show({
      //     content: 'Getting current location...',
      //     showBackdrop: false
      //   });

      //   navigator.geolocation.getCurrentPosition(function(pos) {
      //     $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //     $scope.loading.hide();
      //   }, function(error) {
      //     alert('Unable to get location: ' + error.message);
      //   });
      // };
      
      // $scope.clickTest = function() {
      //   alert('Example of infowindow with ng-click');
      // };


      })
      

.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('EventsCtrl', function($scope, $stateParams,mmaService) {
   mmaService.events().then(function(res){
    $scope.eventResults = res.data;
  });
})

.controller('EventCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $stateParams,$cordovaGeolocation) {


  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
  var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
 
});

    

  }, function(error){
    console.log("Could not get location");
  });


})

.controller('FightersCtrl', function($scope, $stateParams,$http, mmaService) {
   mmaService.fighters().then(function(res){
    $scope.fighterResults = res.data;
  });
     
})

.controller('FighterCtrl', function($scope, $stateParams) {
})

.controller('NewsCtrl',function($scope, $stateParams,$http, mmaService) {
  mmaService.news().then(function(res){
    $scope.newsResults = res.data;
  });
})

.controller('StoryCtrl', function($scope, $stateParams) {
})

.controller('ShopCtrl', function($scope) {})

.controller('ProgressCtrl', function($scope) {})

.controller('GoalsCtrl', function($scope) {})

.controller('FilmsCtrl', function($scope) {})

.controller('BlogCtrl', function($scope) {})

.controller('UsersCtrl', function($scope) {})

.controller('UserCtrl', function($scope) {})

.controller('FriendCtrl', function($scope) {})

.controller('FriendsCtrl', function($scope) {})

.controller('InstructionsCtrl', function($scope) {})

.controller('MediaCtrl', function($scope, $stateParams,$http, mmaService) {
   mmaService.media().then(function(res){
    $scope.mediaResults = res.data;
  });
})



.controller('DashCtrl', function($scope) {
  var deploy = new Ionic.Deploy();
  
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  };
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
