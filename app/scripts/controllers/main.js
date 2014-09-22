'use strict';

angular.module('tspApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.data = {
      cities: [
        {
          name: 'Orgrimmar',
          xPos: 50,
          yPos: 50
        },
        {
          name: 'Stormwind',
          xPos: 300,
          yPos: 20
        },
        {
          name: 'Darnassus',
          xPos: 550,
          yPos: 50
        },
        {
          name: 'Ironforge',
          xPos: 900,
          yPos: 500
        },
        {
          name: 'Silvermoon',
          xPos: 650,
          yPos: 450
        },
        {
          name: 'Undercity',
          xPos: 350,
          yPos: 250
        },
        {
          name: 'Thunder Bluff',
          xPos: 550,
          yPos: 400
        },
        {
          name: 'Gadgetzan‎',
          xPos: 585,
          yPos: 35
        },
        {
          name: 'Stratholme',
          xPos: 250,
          yPos: 350
        },
        {
          name: 'Black Temple',
          xPos: 190,
          yPos: 300
        }                                    
      ]
    };

    $scope.findShortestPath = function() {
      $http.post('/api/cities', $scope.data.cities).then(function(response) {
        $scope.data.moves = response.data.moves;
        console.log($scope.data.moves)
      });
    };
  }]);
