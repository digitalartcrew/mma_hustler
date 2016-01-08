// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu-login.html',
    controller: 'AppCtrl'
  })


      .state('app.gyms', {
      url: '/gyms',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'GymsCtrl'
        }
      }
    })

  .state('app.singlegym', {
    url: '/gyms/:gymId',
    views: {
      'menuContent': {
        templateUrl: 'templates/gyms.html',
        controller: 'GymCtrl'
      }
    }
  })

        .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
    })

  .state('app.singleevent', {
    url: '/events/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/event.html',
        controller: 'EventCtrl'
      }
    }
  })

  .state('app.fighters', {
      url: '/fighters',
      views: {
        'menuContent': {
          templateUrl: 'templates/fighters.html',
          controller: 'FightersCtrl'
        }
      }
    })

  .state('app.singlefighter', {
    url: '/fighters/:fighterId',
    views: {
      'menuContent': {
        templateUrl: 'templates/fighter.html',
        controller: 'FighterCtrl'
      }
    }
  })

   .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
          controller: 'NewsCtrl'
        }
      }
    })

  .state('app.story', {
    url: '/news/:storyId',
    views: {
      'menuContent': {
        templateUrl: 'templates/story.html',
        controller: 'FighterCtrl'
      }
    }
  })

    .state('app.shop', {
    url: '/shop',
    views: {
      'menuContent': {
        templateUrl: 'templates/shop.html',
        controller: 'ShopCtrl'
      }
    }
  });





  


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/gyms');
});
