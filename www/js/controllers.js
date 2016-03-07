angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state){
        
    $scope.createTextMemory = function(){
        $state.go('addTextMemory')
    }
    
    $scope.createPhotoMemory = function(){
        $state.go('addPhotoMemory')
    }
})
.controller('addMemoryCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $http ){
        
        $scope.lat = ""
        $scope.long = ""
        $scope.page_message = ""
        $scope.textmemory = {message:""}
        
        ionic.Platform.ready(function(){
//            
//            $ionicLoading.show({
//                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
//            });
 
            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };

            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){

                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;

                    $scope.lat = lat.toString();
                    $scope.long = long.toString();
                    //$ionicLoading.hide();                
                
        }, function(err){
                
                //$ionicLoading.hide();
                console.log(err);
        });
            
        $scope.saveTextMemory = function(){
            
            var eventObj = {
                
                text : $scope.textmemory.message,
                latitude : $scope.lat,
                longitude : $scope.long,     
            };
            
            var res = $http({
                
                url: 'http://52.35.133.122:8080/v1/textmemory',
                method: 'POST',
                data: JSON.stringify(eventObj),
                headers: {'Content-Type':'application/json'}
            })
            
            // On success
            res.success(function(data, status, headers, config) {

                // Remove error msg
                $scope.page_message = "Added your event"
                $state.go('home')

           });

            // on Failure
            res.error(function(data, status, headers, config) {

                $scope.page_message = "Something went wrong. Try later"
                $state.go('home')
                
            });

        }
    })
})

.controller('mainCtrl', function($scope, $state){
    $scope.home = function(){
        $state.go('home')
    }
    
    $scope.nearby = function() {
        $state.go('nearby')
    }
})


.controller('nearybyCtrl', function($state, $scope, $http){
    
    $scope.memories = [{"text":"Test 1"}, {"text":"Test Test test"}, {"text":"I am here in 2336"}]
    
    var res = $http({
                
            url: 'http://52.35.133.122:8080/v1/textmemories',
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })

        // On success
        res.success(function(data, status, headers, config) {

            $scope.memories=data.memories

       });

        // on Failure
        res.error(function(data, status, headers, config) {

            $scope.page_message = "Something went wrong. Try later"
            $state.go('home')

        });
});