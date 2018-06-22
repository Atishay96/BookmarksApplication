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
      alert(data.message);
      window.location.href = '/list';
    }).error( function(err, status){
      return checkError(err, status);
    })
  }
  $scope.signmeup = function(){
    if(!$scope.password || !$scope.email || !$scope.name) {
      return;
    }
    if($scope.password <= 6){
      return alert('Password should be greater than 6')
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
      alert(data.message);
      window.location.href = '/list';
    }).error( function(err, status){
      return checkError(err, status);
    })
  }
  $scope.verifyToken = function(){
    var token = getToken();
    $http({
      url: '/api/user/verifyToken',
      method: 'GET',
      headers:{
        AuthToken: token
      }
    }).success(function(data){ 
      return window.location.href = '/list'
    }).error(function(err){
      // do nothing
    })
  }
})