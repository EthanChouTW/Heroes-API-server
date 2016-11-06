const app = require('../app')();
const should = require('should');
const supertest = require('supertest');


function systemError(err, res, done) {
  if (err) throw err; // server error
  if (res.statusCode === 500) throw done('Backend error from hahow api');
}

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


describe('enen how are you ', () => {
  it('enen Im fine thank you and you?', (done) => {
    done();
  });
});

describe('heroList API,', () => {
  it('should get hero list with public data', (done) => {
    supertest(app)
      .get('/heroes').end((err, res) => {
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
      .end((err, res) => {
        systemError(err, res, done);
        res.body.forEach((element, index) => {
          passingCase(element, true, index + 1);
        });
        done();
      });
  });

  it('wrong password', (done) => {
    supertest(app)
      .get('/heroes')
      .set('Name', 'hahow')
      .set('Password', 'rockss')
      .end((err, res) => {
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
      .get('/heroes/1')
      .end((err, res) => {
        systemError(err, res, done);
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
      .end((err, res) => {
        systemError(err, res, done);
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
      .end((err, res) => {
        systemError(err, res, done);
        res.statusCode.should.be.equal(401);
        done();
      });
  });

  it('Name or Password not filled completely ', (done) => {
    supertest(app)
      .get('/heroes/1')
      .set('Name', 'hahow')
      .set('hello', 'hii')
      .end((err, res) => {
        systemError(err, res, done);
        res.statusCode.should.be.equal(400);
        done();
      });
  });

  it('request exceed heroId', (done) => {
    supertest(app)
      .get('/heroes/5')
      .set('Name', 'hahow')
      .set('hello', 'hii')
      .end((err, res) => {
        systemError(err, res, done);
        res.statusCode.should.be.equal(404);
        done();
      });
  });
});
