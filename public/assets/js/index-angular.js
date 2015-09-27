var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {


  $scope.list=[];
  $http.get('http://localhost:1337/getItems')
  .success(function(response) {
    $scope.list=response;
  });
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
      $http.get('http://localhost:1337/setItems?itemName='+inputValue)
      .success(function(response) {

      });
    } 
    );
  }




  $scope.addWalmart=function($val1,$val2){
    var balance=0;
    //alert($val1);
    $http.get('http://localhost:1337/getBalance')
    .success(function(response){
      balance=response.balance;
      console.log(balance);
      var tempBalance=parseFloat(balance)-parseFloat($val2);
      console.log(tempBalance);
      swal({   title: "Are you sure you want to order "+$val1+" of price $"+$val2+" from Walmart?", 
        text: "You will not be able to change the order.Your Current balance is $"+balance,
        type: "warning", 
        showCancelButton: true, 
        confirmButtonColor: "#DD6B55",  
        confirmButtonText: "Yes, Place the order",  
        cancelButtonText: "No, cancel the order!",  
        closeOnConfirm: false, 
        closeOnCancel: false },
        function(isConfirm){   
          if (isConfirm) {    
           swal("Order Placed", "Your Order has been placed ", "success"); 
           alertify.log("Your transaction is processed and your balance is "+tempBalance, "", "");
           $http.get('http://localhost:1337/setBalance?balance='+tempBalance)
           .success(function(response){
           });

           $http.get('http://localhost:1337/addToWalmart?itemName='+$val1)
           .success(function(response){
           });

         } else 
         {     
          swal("Cancelled", "Your Order is cancelled", "error");   
        }
      });
});
}


$scope.addMacy=function($val1,$val2){
 var balance=0;
 $http.get('http://localhost:1337/getBalance')
 .success(function(response){
  balance=response.balance;
  console.log(balance);
  var tempBalance=parseFloat(balance)-parseFloat($val2);
  console.log(tempBalance);
  swal({   title: "Are you sure you want to order "+$val1+" of price $"+$val2+" from Macy's?", 
    text: "You will not be able to change the order.Your Current balance is $"+balance,
    type: "warning", 
    showCancelButton: true, 
    confirmButtonColor: "#DD6B55",  
    confirmButtonText: "Yes, Place the order",  
    cancelButtonText: "No, cancel the order!",  
    closeOnConfirm: false, 
    closeOnCancel: false },
    function(isConfirm){   
      if (isConfirm) {    
       swal("Order Placed", "Your Order has been placed ", "success"); 
       alertify.log("Your transaction is processed and your balance is "+tempBalance, "", "");
       $http.get('http://localhost:1337/setBalance?balance='+tempBalance)
       .success(function(response){
       });

       $http.get('http://localhost:1337/addToMacys?itemName='+$val1)
       .success(function(response){
       });


     } else 
     {     
      swal("Cancelled", "Your Order is cancelled", "error");   
    }
  });
});
}


  $("#demo01").animatedModal();
  $scope.filList='';
$scope.fetchBestDeals=function()
{

 $http.get('http://localhost:1337/getDeals1')
 .success(function(response){
  console.log(response);
  $scope.filList=response;
  /*for (var i = 0; i < response.length; i++) {
     $scope.$apply($scope.filList.push(response[i]));
  };
 */
});
}

$scope.finalisePayment=function()
{
  var amountVal=Math.random() * (100 - 1) + 1;

  $http.get('http://localhost:1337/finalisePayments?amount='+amountVal)
  .success(function(response){
    alertify.success(response);
  });
}

$scope.refresh=function()
{

 $http.get('http://localhost:1337/getDeliverRequirements')
 .success(function(response){
  console.log(response);

  if(response.user1.approved[0]==1){
    swal("Order Accepted", "Your Order has been accepted ", "success"); 
  }

});

}






});