var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
  $scope.list=["Sugar","Salt","Cereal"];
  $scope.item='';
  $scope.walList=[];
  $scope.macList=[];
  $scope.walBuyList=[];
  $scope.macBuyList=[];
  $scope.mainList=[];
  $scope.searchName='';
  $scope.listClick=function (index){
    $scope.item=$scope.list[index];
    $('#myModal').modal('toggle');
    console.log($scope.item);
    //get walmart list
    //get macyslist
    $scope.mainList=[];
    $scope.searchName='';

    $http.get('http://localhost:1337/getSuperMarketInfo?name='+$scope.item)
    .success(function(response) {

      $scope.macList=response.splice(0,10);
      console.log($scope.macList);
      $http.get('http://localhost:1337/getWalmartInfo?name='+$scope.item)
      .success(function(response) {
        console.log(response);
        $scope.walList=response.items;
        for (var i = 0; i <$scope.walList.length; i++) {
          var obj={'walImage':$scope.walList[i].thumbnailImage,
          'walName':$scope.walList[i].name,
          'walPrice':$scope.walList[i].salePrice,
          'macImage':$scope.macList[i].ItemImage[0],
          'macName':$scope.macList[i].Itemname[0],
          'macPrice':$scope.macList[i].Pricing[0]
        }
        $scope.mainList.push(obj);
      };
    });
    });
    
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


  $scope.addItems=function(){
    swal( {   
      title: "Add Item",   
      text: "Enter Item Name",   
      type: "input",   showCancelButton: true,   
      closeOnConfirm: true,  
      animation: "slide-from-top",   
      inputPlaceholder: "Write something" 
    }, 
    function(inputValue){   
      if (inputValue === false) return false;      
      if (inputValue === "") {     
        swal.showInputError("You need to write something!");     
        return false;
      }      
      $scope.$apply($scope.list.push(inputValue));
    } 
    );
  }




$scope.addWalmart=function($val){
   swal( {   
      title: "Add Item",   
      text: "Enter Item Name",   
      type: "input",   showCancelButton: true,   
      closeOnConfirm: true,  
      animation: "slide-from-top",   
      inputPlaceholder: "Write something" 
    }, 
    function(inputValue){   
      if (inputValue === false) return false;      
      if (inputValue === "") {     
        swal.showInputError("You need to write something!");     
        return false;
      }      
      $scope.$apply($scope.list.push(inputValue));
    } 
    );
}


$scope.addMacy=function($val){
   swal( {   
      title: "Add Item",   
      text: "Enter Item Name",   
      type: "input",   showCancelButton: true,   
      closeOnConfirm: true,  
      animation: "slide-from-top",   
      inputPlaceholder: "Write something" 
    }, 
    function(inputValue){   
      if (inputValue === false) return false;      
      if (inputValue === "") {     
        swal.showInputError("You need to write something!");     
        return false;
      }      
      $scope.$apply($scope.list.push(inputValue));
    } 
    );
}


});