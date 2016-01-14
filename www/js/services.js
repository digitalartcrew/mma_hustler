app.factory('newsService', function($http, $q) {
	return {
	  news: function(){
		  return $http.get('http://localhost:3001/news');
		},
		 fighters: function(){
		  return $http.get('http://localhost:3001/fighters');
		}
	};

});
