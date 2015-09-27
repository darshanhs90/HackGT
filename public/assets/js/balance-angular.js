var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {


  $scope.list=[];
  $http.get('http://localhost:1337/getCustomerInfo')
    .success(function(response){
      console.log(response);
      $scope.list=response;
    });
  $http.get('http://localhost:1337/getItems')
  .success(function(response) {
    console.log(response);
    $scope.list=response;
  });

  $scope.amount=0;
  $http.get('http://localhost:1337/getTransfers')
  .success(function(response) {
    console.log(response);
    $scope.transferList=response;
    for (var i = 0; i < response.length; i++) {
      $scope.amount+=response[i].amount;
    };
  });
  
});