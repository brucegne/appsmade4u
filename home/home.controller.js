app.controller('HomeCtrl', ['$scope','CommonProp', '$firebaseArray',
	function($scope, CommonProp, $firebaseArray){
		var ref = firebase.database().ref();
	  blogref = ref.child('blog/posts');
	var postsArr = $firebaseArray(blogref);
	$scope.posts = postsArr;
	$scope.namer = CommonProp.getUser();
}]);

app.controller('PostCtrl', ['$scope','CommonProp', function($scope,CommonProp){
	var ref = firebase.database().ref();
  blogref = ref.child('blog/posts');
	var query = blogref.orderByChild('postID').equalTo($scope.$stateParams.postID);
	query.once('value', function(snapshot){
		snapshot.forEach(function(child){
			$scope.post = child.val();
			$scope.$apply();
			$scope.namer = CommonProp.getUser();
		})
	})
}])
