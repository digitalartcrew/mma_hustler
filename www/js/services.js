app.factory('mmaService', function($http, $q) {
	return {
		news: function(){
			return $http.get('https://mma-hustler.herokuapp.com/news');
		},
		media: function(){
			return $http.get('https://mma-hustler.herokuapp.com/media');
		},
		fighters: function(){
			return $http.get('https://mma-hustler.herokuapp.com/fighters');
		},
		events: function(){
			return $http.get('https://mma-hustler.herokuapp.com/events');
		},
		boxing: function(){
			return $http.get('https://mma-hustler.herokuapp.com/boxing');
		},
		mma: function(){
			return $http.get('https://mma-hustler.herokuapp.com/mma');
		},
		bjj: function(){
			return $http.get('https://mma-hustler.herokuapp.com/bjj');
		},
		muaythai: function(){
			return $http.get('https://mma-hustler.herokuapp.com/muaythai');
		},
		yoga: function(){
			return $http.get('https://mma-hustler.herokuapp.com/yoga');
		},
		fitness: function(){
			return $http.get('https://mma-hustler.herokuapp.com/fitness');
		},
		wrestling: function(){
			return $http.get('https://mma-hustler.herokuapp.com/wrestling');
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
