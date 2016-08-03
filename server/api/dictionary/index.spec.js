'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dictionaryCtrlStub = {
  index: 'dictionaryCtrl.index',
  indexPublic: 'dictionaryCtrl.indexPublic',
  show: 'dictionaryCtrl.show',
  create: 'dictionaryCtrl.create',
  upload: 'dictionaryCtrl.create',
  update: 'dictionaryCtrl.update',
  destroy: 'dictionaryCtrl.destroy',
  createCard: 'dictionaryCtrl.createCard',
  updateCard: 'dictionaryCtrl.updateCard',
  destroyCard: 'dictionaryCtrl.destroyCard'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var uploadServiceStub = {
  fileToReqBody(){
    return 'uploadService.fileToReqBody';
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
  '../../auth/auth.service': authServiceStub,
  '../../upload/upload.service': uploadServiceStub
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

  describe('GET /api/dictionarys/public', function() {

    it('should route to dictionary.controller.indexPublic', function() {
      routerStub.get
        .withArgs('/public', 'authService.isAuthenticated', 'dictionaryCtrl.indexPublic')
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

  describe('POST /api/dictionarys/upload', function() {

    it('should route to dictionary.controller.create', function() {
      routerStub.post
        .withArgs('/upload', 'authService.isAuthenticated', 'uploadService.fileToReqBody', 'dictionaryCtrl.create')
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


  describe('POST /api/dictionarys/:id/cards', function() {

    it('should route to dictionary.controller.createCard', function() {
      routerStub.post
        .withArgs('/:id/cards', 'authService.isAuthenticated', 'dictionaryCtrl.createCard')
        .should.have.been.calledOnce;
    });

  });
  
  describe('PUT /api/dictionarys/:id/cards/:cardId', function() {

    it('should route to dictionary.controller.updateCard', function() {
      routerStub.put
        .withArgs('/:id/cards/:cardId', 'authService.isAuthenticated', 'dictionaryCtrl.updateCard')
        .should.have.been.calledOnce;
    });

  });
  
  describe('DELETE /api/dictionarys/:id/cards/:cardId', function() {

    it('should route to dictionary.controller.destroyCard', function() {
      routerStub.delete
        .withArgs('/:id/cards/:cardId', 'authService.isAuthenticated', 'dictionaryCtrl.destroyCard')
        .should.have.been.calledOnce;
    });

  });
});
