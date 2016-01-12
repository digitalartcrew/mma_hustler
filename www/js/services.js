angular.module('starter.services', [])

.factory('newsService', function($http, $q) {
  debugger
  function getNews (zip) {
    var news = []; 
    var details = {};
    var deferred = $q.defer();
  }

  $http.get('http://ufc-data-api.ufc.com/api/v3/iphone/news')
  .success(function(res){
    news.push(res.results);
    deferred.resolve(news);
    console.log(res);
  }       
  );
});
