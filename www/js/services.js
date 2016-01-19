app.factory('mmaService', function($http, $q) {
	return {
		news: function(){
			return $http.get('http://localhost:3001/news');
		},
		media: function(){
			return $http.get('http://localhost:3001/media');
		},
		fighters: function(){
			return $http.get('http://localhost:3001/fighters');
		},
		events: function(){
			return $http.get('http://localhost:3001/events');
		},
		boxing: function(){
			return $http.get('http://localhost:3001/boxing');
		},
		mma: function(){
			return $http.get('http://localhost:3001/mma');
		},
		bjj: function(){
			return $http.get('http://localhost:3001/bjj');
		},
		muaythai: function(){
			return $http.get('http://localhost:3001/muaythai');
		},
		yoga: function(){
			return $http.get('http://localhost:3001/yoga');
		},
		fitness: function(){
			return $http.get('http://localhost:3001/fitness');
		},
		wrestling: function(){
			return $http.get('http://localhost:3001/wrestling');
		},
	};

});

app.factory('Api', function($http, $q, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint);

  var getApiData = function() {
    var q = $q.defer();

    $http.get(ApiEndpoint.url)
    .success(function(data) {
      console.log('Got some data: ', data);
      q.resolve(data);
    })
    .error(function(error){
      console.log('Had an error');
      q.reject(error);
    });

    return q.promise;
  };

  return {
    getApiData: getApiData
  };
});
