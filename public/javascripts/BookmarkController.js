app.controller('bookmarkController', function ($scope, $http) {
  $scope.original = [];
  $scope.list = function () {
    var token = getToken();
    $http({
      url: '/api/user/bookmarks',
      method: 'GET',
      headers: {
        authToken: token
      }
    }).success((data) => {
      // console.log(data);
      $scope.original = data.data;
      data.data.map((v, i) => {
        data.data[i].tags = v.tags.join(', ')
      })
      $scope.bookmarks = data.data;
    }).error((err, status) => {
      checkError(err, status);
    })
  }
  $scope.updateRecord = function () {
    if (!$scope.book || !$scope.book.url || !$scope.book.title || !$scope.book.tags) {
      return;
    }
    // console.log($scope.book);
    $scope.book.tags = $scope.book.tags.split(',');
    var token = getToken();
    $http({
      url: '/api/user/bookmark',
      method: 'PUT',
      headers: {
        authToken: token
      },
      data: $scope.book
    }).success((data) => {
      console.log(data);
      $scope.original = data.data;
      data.data.map((v, i) => {
        data.data[i].tags = v.tags.join(', ')
      })
      $scope.book = {};
      $scope.bookmarks = data.data;
      $("#myModal").modal('hide');
    }).error((err, status) => {
      checkError(err, status);
    })
  }
  $scope.changeType = function (type) {
    $scope.type = type;
    let data = $(event.target).attr('data');
    if (type == 'Update') {
      $scope.book = JSON.parse(data);
    }
  }
  $scope.deleteEntry = function () {
    var id = $(event.target).attr('data');
    var token = getToken();
    $http({
      url: '/api/user/deleteBookmark',
      method: 'POST',
      headers: {
        authToken: token
      },
      data: {
        _id: id
      }
    }).success((data) => {
      console.log(data);
      $scope.original = data.data;
      data.data.map((v, i) => {
        data.data[i].tags = v.tags.join(', ')
      })
      $scope.book = {};
      $scope.bookmarks = data.data;
    }).error((err, status) => {
      checkError(err, status);
    })
  }
  $scope.search = function () {
    if (!$scope.searchText) {
      $scope.bookmarks = $scope.original;
      return;
    }
    $scope.temp = [];
    angular.forEach($scope.original, function (value, index) {
      if (value.tags.toString().includes($scope.searchText.toLowerCase())) {
        $scope.temp.push(value);
      }
    });
    $scope.bookmarks = $scope.temp;
  }
  $scope.logout = function(){
    localStorage.removeItem('userToken');
    window.location.href = '/'
  }
})