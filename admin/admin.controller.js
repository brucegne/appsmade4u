app.controller('AdminCtrl', ['$scope', 'CommonProp', '$firebaseArray',
	function($scope, CommonProp, $firebaseArray){
		var ref = firebase.database().ref();
	  blogref = ref.child('blog/posts');
		var adminPostsArr = $firebaseArray(blogref);
		$scope.posts = adminPostsArr;
		$scope.namer = CommonProp.getUser();

	$scope.createPost = function(){
		if($scope.data.newPostID){
			var ref = firebase.database().ref();
		    blogref = ref.child('blog/posts');
			var adminPostsArr = $firebaseArray(blogref);
			adminPostsArr.$add({
				postID: $scope.data.newPostID,
				createDate: Math.floor(Date.now()) }).then(function(newPost){
				$scope.$state.go('edit', {postKey: newPost.key()})
			});
		}
	}
    $scope.deletePost = function(post){
    	adminPostsArr.$remove(post)
    }
}])

app.controller('EditCtrl', ['$scope','CommonProp', '$firebaseObject', function($scope,CommonProp, $firebaseObject){
//	var ref = new Firebase('https://brucegne.firebaseio.com/blog/posts/');
    var ref = firebase.database().ref();
    blogref = ref.child('blog/posts');
    var postObj = $firebaseObject(blogref.child($scope.$stateParams.postKey));
    postObj.$bindTo($scope, 'post');
	$scope.namer = CommonProp.getUser();
}])

app.controller('basisCtrl', function($scope, $http) {
  $http.get("http://wt-9bf94d1b39dd624e4ca77a2e9249d4f0-0.sandbox.auth0-extend.com/emongo?commodity=corn").then(function (response) {
      $scope.myData = response.data;
  });
});

