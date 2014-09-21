'use strict';

angular.module('tspApp')
  .directive('raphael', function() {
    return {
      restrict: 'A', 
      scope: {
        cities: '='
      },
      link: function(scope) {

        //inspired by http://raphaeljs.com/touches.html
        var R = Raphael('container', '100%', '100%'),
          circles = [],
          texts = [],
          xPos,
          yPos;

        R.image('/images/map.jpg', 0, 0, '100%', '100%')

        for (var i = 0; i < scope.cities.length; i++) {
          xPos = scope.cities[i].xPos;
          yPos = scope.cities[i].yPos;

          circles[i] = R.circle(xPos, yPos, 10);
          circles[i].attr({
            'stroke': 'none',
            'fill': 'red'
          });
          circles[i].data('index', i);

          //initializes the text label
          texts[i] = R.text(xPos, yPos + 20, scope.cities[i].name);
          texts[i].attr('fill', 'white');

          
          circles[i].drag(moveHandler, startHandler, endHandler);
        };

        //when a city is moved, we update the scope.cities collection directly
        //this will allow us to easily send the data to server on submit
        function moveHandler(dx, dy) {
          var index = this.data('index'),
            newXPos = scope.cities[index].xPos + dx,
            newYPos = scope.cities[index].yPos + dy,
            text = texts[this.data('index')];

          this.attr('cx', newXPos);
          this.attr('cy', newYPos);

          //moves corresponding label
          text.attr('x', newXPos);
          text.attr('y', newYPos + 20);
        };

        function startHandler() {
          var index = this.data('index');
          scope.cities[index].xPos = this.attr('cx');
          scope.cities[index].yPos = this.attr('cy');
        };

        function endHandler() {
          var index = this.data('index');

          scope.cities[index].xPos = this.attr('cx');
          scope.cities[index].yPos = this.attr('cy');
        };
      }
    }
  });