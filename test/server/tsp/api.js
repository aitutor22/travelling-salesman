'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../../server');


// describe('POST /api/cities', function() {
//   it('should respond with json', function(done) {
//     request(app)
//       .post('/api/cities')
//       .send({})
//       .expect(200);
//       // .end(function(res) {
//       //   console.log(res)
//       // });
//   });
// });