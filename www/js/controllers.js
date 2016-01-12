angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {
  $scope.data = {};

  $scope.isLoggedIn = function(){
    return false;
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
         $scope.isLoggedIn = function(){
    return true;
  };
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

 $scope.logOut = function() {
    ref.unauth();
    console.log(authData);
   console.log("Login is working");
 
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
        console.log("Authenticated successfully with payload:", authData);
        console.log("Username:" + authData.facebook.displayName);
        console.log("Profile Image:" + authData.facebook.profileImageURL);
        $scope.displayName = authData.facebook.displayName;
         $scope.modal.hide();
                 $scope.isLoggedIn = function(){
    return true;
  };
  $scope.isLoggedIn();
          // return $state.go('app.gyms');
      }
    });
 
  }
 
};
})


.controller('GymsCtrl', function($scope) {
  $scope.gyms = [
  { title: 'MMA', id: 1 },
  { title: 'Boxing', id: 2 },
  { title: 'Brazilian Jiu Jitsu', id: 3 },
  { title: 'Fitness/Conditioning', id: 4 },
  { title: 'Muay Thai', id: 5 },
  { title: 'Wrestling', id: 6 }
  ];
})



.controller('GymCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', function($scope, $stateParams) {
})

.controller('EventsCtrl', function($scope, $stateParams) {
})

.controller('EventCtrl', function($scope, $stateParams) {
})

.controller('FightersCtrl', function($scope, $stateParams) {
})

.controller('FighterCtrl', function($scope, $stateParams) {
})

.controller('NewsCtrl', function($scope, $stateParams) {
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

.controller('PhotosCtrl', function($scope) {})



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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

$scope.chats = Chats.all();
$scope.remove = function(chat) {
  Chats.remove(chat);
};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
