var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./../server');
var should = chai.should();

chai.use(chaiHttp);

describe('todos', function() {
    it('should list ALL todos on /:user/todos GET');
    // it('should list a SINGLE blob on /blob/<id> GET');
    // it('should add a SINGLE blob on /blobs POST');
    // it('should update a SINGLE blob on /blob/<id> PUT');
    // it('should delete a SINGLE blob on /blob/<id> DELETE');
  });