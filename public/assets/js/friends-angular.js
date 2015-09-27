var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
  $scope.list=["1","2","1223","qweqwe","asdasd","fdgffgh","kpotipor"];


  $scope.listClick=function (index){
    swal("Good job!", "You clicked on "+$scope.list[index], "success");
  }

  $scope.friendClick=function(e){
    swal( {   
      title: "An input!",   
      text: "Write something interesting:",   
      type: "input",   showCancelButton: true,   
      closeOnConfirm: false,  
      animation: "slide-from-top",   
      inputPlaceholder: "Write something" 
    }, 
    function(inputValue){   
      if (inputValue === false) return false;      
      if (inputValue === "") {     swal.showInputError("You need to write something!");     return false   }      
      swal("Nice!", "You wrote: " + inputValue, "success"); 
    } 
    );
  }

});