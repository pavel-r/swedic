'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dictionaryCtrlStub = {
  index: 'dictionaryCtrl.index',
  show: 'dictionaryCtrl.show',
  create: 'dictionaryCtrl.create',
  update: 'dictionaryCtrl.update',
  destroy: 'dictionaryCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dictionaryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dictionary.controller': dictionaryCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Dictionary API Router:', function() {

  it('should return an express router instance', function() {
    dictionaryIndex.should.equal(routerStub);
  });

  describe('GET /api/dictionarys', function() {

    it('should route to dictionary.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'dictionaryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/dictionarys/:id', function() {

    it('should route to dictionary.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'dictionaryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/dictionarys', function() {

    it('should route to dictionary.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'dictionaryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/dictionarys/:id', function() {

    it('should route to dictionary.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'dictionaryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dictionarys/:id', function() {

    it('should route to dictionary.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.isAuthenticated', 'dictionaryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dictionarys/:id', function() {

    it('should route to dictionary.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'dictionaryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
