angular.module('starter.controllers', ['youtube-embed'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,$http,$firebaseAuth) {
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

  $scope.signupEmail = function(username,password){  
   var refAuth = $firebaseAuth(ref);
   refAuth.$createUser({email: username, password: password}).then(function() {
    return refAuth.$authWithPassword({
      email: username,
      password: password
    });
  }).then(function(authData) {
    console.log("Success!");
    return $state.go('app.gyms');
  }).catch(function(error) {
    console.error("ERROR " + error);
  });  
};

$scope.loginEmail = function(username, password){
  var refAuth = $firebaseAuth(ref);
  refAuth.$authWithPassword({
    email: username,
    password: password
  }).then(function(authData) {
   return $state.go('app.gyms');
 }).catch(function(error) {
  console.error("ERROR: " + error);
});
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
  var eventData = JSON.parse(res.data);
  $scope.eventResults = eventData;
   console.log(eventData);
});
})

.controller('EventCtrl', function($scope, $stateParams) {
})

.controller('FightersCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.fighters().then(function(res){
  var fighterData = JSON.parse(res.data);
  $scope.fighterResults = fighterData;
   console.log(fighterData);
});

})

.controller('FighterCtrl', function($scope, $stateParams) {
})

.controller('NewsCtrl',function($scope, $stateParams,$http, mmaService) {
 mmaService.news().then(function(res){
  var newsData = JSON.parse(res.data);
  $scope.newsResults = newsData;
   console.log(newsData);
  });
})

.controller('StoryCtrl', function($scope, $stateParams) {
})

.controller('ShopCtrl', function($scope) {})

.controller('ProgressCtrl', function($scope) {})

.controller('GoalsCtrl', function($scope) {})

.controller('FilmsCtrl', function($scope,$http) {
 $scope.video1 = ['6hK14hRi4Vs'];
 $scope.video2 = ['mpw9ppSDOZY'];
 $scope.video3 = ['9Y-KnFSVTT4'];
})

.controller('BlogCtrl', function($scope) {})

.controller('UsersCtrl', function($scope) {})

.controller('UserCtrl', function($scope) {})

.controller('FriendCtrl', function($scope) {})

.controller('FriendsCtrl', function($scope) {})

.controller('InstructionsCtrl', function($scope) {})

.controller('MediaCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.media().then(function(res){
  var mediaData = JSON.parse(res.data);
  $scope.mediaResults = mediaData;
   console.log(mediaData);
});
})

//Fitness Controllers
.controller('BoxingCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.boxing().then(function(res){
  var boxingData = JSON.parse(res.data);
  $scope.boxingResults = boxingData;
   console.log(boxingData);
});
})

.controller('BjjCtrl', function($scope, $stateParams,$http, mmaService) {
mmaService.bjj().then(function(res){
  var bjjData = JSON.parse(res.data);
  $scope.bjjResults = bjjData;
   console.log(bjjData);
});
})

.controller('MmaCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.mma().then(function(res){
  var mmaData = JSON.parse(res.data);
  $scope.mmaResults = mmaData;
   console.log(mmaData);
});
})

.controller('MuaythaiCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.muaythai().then(function(res){
  var muaythaiData = JSON.parse(res.data);
  $scope.muaythaiResults = muaythaiData;
   console.log(muaythaiData);
});
})

.controller('YogaCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.yoga().then(function(res){
  var yogaData = JSON.parse(res.data);
  $scope.yogaResults = yogaData;
   console.log(yogaData);
});
})

.controller('WrestlingCtrl', function($scope, $stateParams,$http, mmaService) {
  mmaService.wrestling().then(function(res){
  var wrestlingData = JSON.parse(res.data);
  $scope.wrestlingResults = wrestlingData;
   console.log(wrestlingData);
});
})

.controller('FitnessCtrl', function($scope, $stateParams,$http, mmaService) {
 mmaService.fitness().then(function(res){
  var fitnessData = JSON.parse(res.data);
  $scope.fitnessResults = fitnessData;
   console.log(fitnessData);
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
