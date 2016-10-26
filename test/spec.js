let app = require('../app')();

let should = require('should'),
  supertest = require('supertest'),
  request = require('request');

  describe('enen', function () {

    it('enenene',
    function (done) {

    done();
    });
  });

  describe('heroList API,', () => {
    it('is object.', (done) => {
      supertest(app)
      .get('/heroes').end(function(err, res){
        if (err) return done(err); // 與 Server 相關錯誤
        if (res.statusCode !== 200) return done(res.body); // 與 API 有關的錯誤
        const result = res.body;
        result.should.be.Object();
        return done();
      });
    });
  });

  describe('singleHero API,', () => {
    it('singlehero', (done) => {
      supertest(app)
      .get('/heroes/1').end(function(err, res){
        if (err) return done(err); // 與 Server 相關錯誤
        if (res.statusCode !== 200) return done(res.body); // 與 API 有關的錯誤
        const result = res.body;
        result.should.have.keys('id', 'name', 'image');
        result.id.should.be.equal('1');

        return done();
      });
    });
  });
