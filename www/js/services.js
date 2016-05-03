app.factory('mmaService', function($http, $q) {
	return {
		news: function(){
			return $http.get('http://mma-hustler.herokuapp.com/news',{ cache: true});
		},
		media: function(){
			return $http.get('http://mma-hustler.herokuapp.com/media',{ cache: true});
		},
		fighters: function(){
			return $http.get('http://mma-hustler.herokuapp.com/fighters',{ cache: true});
		},
		events: function(){
			return $http.get('http://mma-hustler.herokuapp.com/events',{ cache: true});
		},
		boxing: function(){
			return $http.get('http://mma-hustler.herokuapp.com/boxing',{ cache: true});
		},
		mma: function(){
			return $http.get('http://mma-hustler.herokuapp.com/mma',{ cache: true});
		},
		bjj: function(){
			return $http.get('http://mma-hustler.herokuapp.com/bjj',{ cache: true});
		},
		muaythai: function(){
			return $http.get('http://mma-hustler.herokuapp.com/muaythai',{ cache: true});
		},
		yoga: function(){
			return $http.get('http://mma-hustler.herokuapp.com/yoga',{ cache: true});
		},
		fitness: function(){
			return $http.get('http://mma-hustler.herokuapp.com/fitness',{ cache: true});
		},
		wrestling: function(){
			return $http.get('http://mma-hustler.herokuapp.com/wrestling',{ cache: true});
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

