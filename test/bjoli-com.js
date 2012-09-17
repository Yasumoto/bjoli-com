(function() {
  var bjoli_index, routes, should;
  routes = require('../routes');
  bjoli_index = require('../routes/index.js');
  should = require('chai').should();

  describe('routes', function() {
    return describe('#show_bjoli_index_page',  function() {
      it('should be a function', function() {
        return bjoli_index.index.should.be.a.function
      });
      return it('should return something cool', function() {
        var mockReq, mockRes;
        mockReq = null;
        mockRes = {
          render:  function (viewName) {
            viewName.should.exist;
            return viewName.should.match(/index/);
          }
        };
        return bjoli_index.index(mockReq, mockRes).should.be.an.object;
      });
    });
  });
}).call(this);
