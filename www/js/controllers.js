angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $cordovaGeolocation, $ionicLoading){
    
    ionic.Platform.ready(function(){
        // Code goes here
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
    })   
});