'use strict';

angular.module('tspApp')
  .directive('raphael', function() {
    return {
      restrict: 'A', 
      scope: {
        cities: '=',
        moves: '='
      },
      controller: ['$scope', function($scope) {

        //inspired by http://raphaeljs.com/touches.html
        var R = Raphael('container', '100%', '100%'),
          circles = [],
          texts = [],
          vals = [],
          xPos,
          yPos;

        R.image('http://static.planetminecraft.com/files/resource_media/screenshot/1232/WorldMap-World_3162678.jpg', 0, 0, '100%', '100%')

        for (var i = 0; i < $scope.cities.length; i++) {
          xPos = $scope.cities[i].xPos;
          yPos = $scope.cities[i].yPos;

          circles[i] = R.circle(xPos, yPos, 10);
          circles[i].attr({
            'stroke': 'none',
            'fill': 'red'
          });
          circles[i].data('index', i);

          //initializes the text label
          texts[i] = R.text(xPos, yPos + 20, $scope.cities[i].name);
          texts[i].attr('fill', 'white');

          vals[i] = R.text(xPos, yPos, '');
          
          circles[i].drag(moveHandler, startHandler, endHandler);
        };

        //when a city is moved, we update the scope.cities collection directly
        //this will allow us to easily send the data to server on submit
        function moveHandler(dx, dy) {
          var index = this.data('index'),
            newXPos = $scope.cities[index].xPos + dx,
            newYPos = $scope.cities[index].yPos + dy,
            text = texts[this.data('index')],
            val = vals[this.data('index')];

          this.attr('cx', newXPos);
          this.attr('cy', newYPos);

          //moves corresponding label
          text.attr('x', newXPos);
          text.attr('y', newYPos + 20);

          //moves corresponding label
          val.attr('x', newXPos);
          val.attr('y', newYPos);          
        };

        function startHandler() {
          var index = this.data('index');
          $scope.cities[index].xPos = this.attr('cx');
          $scope.cities[index].yPos = this.attr('cy');

        };

        function endHandler() {
          var index = this.data('index');

          $scope.cities[index].xPos = this.attr('cx');
          $scope.cities[index].yPos = this.attr('cy');
        };

        $scope.$watch('moves', function(arr) {
          if (typeof arr === 'undefined') return;

          for (var i = 0; i < vals.length; i++) {
            vals[arr[i]].attr('text', i + 1);
          }
        });
      }],
      link: function() {

      
      }
    }
  });