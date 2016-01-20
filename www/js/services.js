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

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
