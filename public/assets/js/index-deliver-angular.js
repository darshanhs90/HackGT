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
  $scope.Approval;
  $scope.listClick=function (index){
    $scope.item=0;
	$('#myModal').modal('toggle');
    //console.log($scope.item);
    //get walmart list
    //get macyslist
    $scope.mainList=$scope.Requests[index].Walmart;
    $scope.searchName=index;
    
    
  }
  $scope.listClick2=function (index){
    $scope.item=1;
    $('#myModal').modal('toggle');
    //console.log($scope.item);
    //get walmart list
    //get macyslist
    $scope.mainList=$scope.Requests[index].Macys;
    $scope.searchName=index;
    
    
  }

	$scope.ListAccepted=function (key,val){
		//alert("key:"+key+"val:"+val);
		/*$scope.Requests[key].approved[0]=(val ==0)? 1: 0;
		$scope.Requests[key].approved[1]=(val ==1)? 1: 0;*/
		$http.get('http://localhost:1337/setApprovedList?keyName='+key+'&shopName='+val)
			.success(function(response) {
				
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
	$scope.init = function(){
		function poll(){
			$http.get('http://localhost:1337/getDeliverRequirements')
			.success(function(response) {
				$scope.Requests = response;
			});
			//window.setInterval(poll,10000);
		}
		poll();
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