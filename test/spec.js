const app = require('../app')();
const should = require('should');
const supertest = require('supertest');


  describe('enen how are you ', function () {
    it('enen Im fine thank you and you?', (done) => {
    done();
    });
  });

  describe('heroList API,', () => {
    it('should get hero list with public data', (done) => {
      supertest(app)
      .get('/heroes').end((err, res) => {
        systemError(err, res, done);
        const result = res.body;
        res.body.forEach((element, index) => {
          passingCase(element, false, index + 1);
        });

        done();
      });
    });

    it('should get hero list with public data', (done) => {
      supertest(app)
      .get('/heroes')
      .set('Name', 'hahow')
      .set('Password', 'rocks')
      .end(function(err, res){
        systemError(err,res, done);
        const result = res.body;
        res.body.forEach((element, index) => {
          passingCase(element, true, index + 1)

        });

        done();
      });
    });

    it('wrong password', (done) => {
      supertest(app)
      .get('/heroes')
      .set('Name', 'hahow')
      .set('Password', 'rockss')
      .end(function(err, res) {
        res.statusCode.should.be.equal(401);
        done();
      });
    });

    it('Name or Password not filled completely ', (done) => {
      supertest(app)
      .get('/heroes')
      .set('Name', 'hahow')
      .set('hello', 'hii')
      .end((err, res) => {

        res.statusCode.should.be.equal(400);
        done();
      });
    });
  });


  describe('singleHero API,', () => {
    it('should get hero with public data', (done) => {
      supertest(app)
      .get('/heroes/1').end((err, res) => {
        systemError(err,res, done);
        const result = res.body;
        passingCase(result, false, 1);

        done();
      });
    });

    it('should pass auth and get hero with secret data', (done) => {
      supertest(app)
      .get('/heroes/1')
      .set('Name', 'hahow')
      .set('Password', 'rocks')
      .end(function(err, res){
        const result = res.body;
        passingCase(result, true, 1);

        done();
      });
    });

    it('wrong password', (done) => {
      supertest(app)
      .get('/heroes/1')
      .set('Name', 'hahow')
      .set('Password', 'rockss')
      .end(function(err, res){

        res.statusCode.should.be.equal(401);
        done();
      });
    });

    it('Name or Password not filled completely ', (done) => {
      supertest(app)
      .get('/heroes/1')
      .set('Name', 'hahow')
      .set('hello', 'hii')
      .end(function(err, res){

        res.statusCode.should.be.equal(400);
        done();
      });
    });

    it('request exceed heroId', (done) => {
      supertest(app)
      .get('/heroes/5')
      .set('Name', 'hahow')
      .set('hello', 'hii')
      .end(function(err, res){

        res.statusCode.should.be.equal(404);
        done();
      });
    });
  });


  function systemError(err, res, done) {
    if (err) throw err; // server error
    if (res.statusCode !== 200) throw Error(res.body); // api error
    //this only happen randomly in hahow /heroes/:id api
    if (res.body['code'] && res.body['code'] === 1000) throw done(`${res.body.message} from hahow api`);
  };

  function passingCase(element, isAuth, heroId) {

    if (isAuth) {
      element.should.have.keys('profile');
      element.profile.should.have.keys('str', 'int', 'agi', 'luk');
    }
    if (heroId) {
      element.id.should.be.equal(`${heroId}`);
    }
    element.should.have.keys('id', 'name', 'image');
  }

