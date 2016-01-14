app.factory('mmaService', function($http, $q) {
	return {
	  news: function(){
		  return $http.get('http://localhost:3001/news');
		},
		 fighters: function(){
		  return $http.get('http://localhost:3001/fighters');
		},
		 events: function(){
		  return $http.get('http://localhost:3001/events');
		}
	};

});
