app.factory('mmaService', function($http, $q) {
	return {
		news: function(){
			return $http.get('http://mma-hustler.herokuapp.com/news');
		},
		media: function(){
			return $http.get('http://mma-hustler.herokuapp.com/media');
		},
		fighters: function(){
			return $http.get('http://mma-hustler.herokuapp.com/fighters');
		},
		events: function(){
			return $http.get('http://mma-hustler.herokuapp.com/events');
		},
		boxing: function(){
			return $http.get('http://mma-hustler.herokuapp.com/boxing');
		},
		mma: function(){
			return $http.get('http://mma-hustler.herokuapp.com/mma');
		},
		bjj: function(){
			return $http.get('http://mma-hustler.herokuapp.com/bjj');
		},
		muaythai: function(){
			return $http.get('http://mma-hustler.herokuapp.com/muaythai');
		},
		yoga: function(){
			return $http.get('http://mma-hustler.herokuapp.com/yoga');
		},
		fitness: function(){
			return $http.get('http://mma-hustler.herokuapp.com/fitness');
		},
		wrestling: function(){
			return $http.get('http://mma-hustler.herokuapp.com/wrestling');
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

