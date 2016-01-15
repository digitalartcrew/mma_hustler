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


//   var options = {timeout: 10000, enableHighAccuracy: true};

//   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
//       var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;
//         var geolocpoint = new google.maps.LatLng(latitude, longitude);

//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: geolocpoint,
//       zoom: 13
//     });
//     var input = /** @type {!HTMLInputElement} */(
//       document.getElementById('pac-input'));

//     var types = document.getElementById('type-selector');
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

//     var autocomplete = new google.maps.places.Autocomplete(input,{ types: ['(cities)'], componentRestrictions : { country: 'usa' }});
//     autocomplete.bindTo('bounds', map);

//     var infowindow = new google.maps.InfoWindow();
//     var marker = new google.maps.Marker({
//       map: map,
//       anchorPoint: new google.maps.Point(0, -29)
//     });

//     autocomplete.addListener('place_changed', function() {
//       infowindow.close();
//       marker.setVisible(false);
//       var place = autocomplete.getPlace();
//       if (!place.geometry) {
//         window.alert("Autocomplete's returned place contains no geometry");
//         return;
//       }

//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);  // Why 17? Because it looks good.
//     }
//     marker.setIcon(/** @type {google.maps.Icon} */({
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(35, 35)
//     }));
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);

//     var address = '';
//     if (place.address_components) {
//       address = [
//       (place.address_components[0] && place.address_components[0].short_name || ''),
//       (place.address_components[1] && place.address_components[1].short_name || ''),
//       (place.address_components[2] && place.address_components[2].short_name || '')
//       ].join(' ');
//     }

//     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
//     infowindow.open(map, marker);
//   });

//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   function setupClickListener(id, types) {
//     var radioButton = document.getElementById(id);
//     radioButton.addEventListener('click', function() {
//       autocomplete.setTypes(types);
//     });
//   }

//   setupClickListener('changetype-all', []);
//   setupClickListener('changetype-address', ['address']);
//   setupClickListener('changetype-establishment', ['establishment']);
//   setupClickListener('changetype-geocode', ['geocode']);
// });


// }, function(error){
//   console.log("Could not get location");

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

//Fitness Controllers
.controller('BoxingCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.boxing().then(function(res){
  $scope.boxingResults = res.data;
});
})

.controller('BjjCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.bjj().then(function(res){
  $scope.bjjResults = res.data;
});
})

.controller('MmaCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.mma().then(function(res){
  $scope.mmaResults = res.data;
});
})

.controller('YogaCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.yoga().then(function(res){
  $scope.yogaResults = res.data;
});
})

.controller('WrestlingCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.wrestling().then(function(res){
  $scope.wrestlingResults = res.data;
});
})

.controller('FitnessCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.fitness().then(function(res){
  $scope.fitnessResults = res.data;
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
