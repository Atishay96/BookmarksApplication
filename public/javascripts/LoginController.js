app.controller('loginCont',function($scope, $http){
  $scope.submit = function(){
    if(!$scope.password || !$scope.email) {
      return;     
    }
    $http({
      url: '/api/user/login',
      method: 'POST',
      data:{
        email: $scope.email,
        password: $scope.password
      }
    }).success( function(data) {
      localStorage.setItem('userToken', data.data.token);
    }).error( function(err){
      return checkError(err);
    })
  }
  $scope.signmeup = function(){
    if(!$scope.password || !$scope.email || !$scope.name) {
      return;
    }
    $http({
      url: '/api/user/signup',
      method: 'POST',
      data:{
        email: $scope.email,
        password: $scope.password,
        name: $scope.name
      }
    }).success( function(data) {
      console.log(data);
      localStorage.setItem('userToken', data.data.token);
    }).error( function(err){
      return checkError(err);
    })
  }
})