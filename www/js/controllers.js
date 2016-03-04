angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state){
        
    $scope.createTextMemory = function(){
        $state.go('addTextMemory')
    }
    
    $scope.createPhotoMemory = function(){
        $state.go('addPhotoMemory')
    }
})
.controller('addMemoryCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading ){
        
        $scope.lat = ""
        $scope.long = ""
        $scope.textmemory = {message:""}
        
        ionic.Platform.ready(function(){

            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });
 
            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };

            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){

                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;

                    $scope.lat = lat
                    $scope.long = long
                    $ionicLoading.hide();                
                
        }, function(err){
                $ionicLoading.hide();
                console.log(err);
        });
            
        $scope.saveTextMemory = function(){
            
            alert($scope.lat)
            alert($scope.long)
            alert($scope.textmemory.message)
        }
    })
});