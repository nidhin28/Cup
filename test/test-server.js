const {
    app,
    runServer,
    closeServer
} = require('../server');

var chai = require('chai');

var chaiHttp = require('chai-http');

var entry = require('../models/post.js');

var should = chai.should();

chai.use(chaiHttp);

describe('Football-nostalgia-capstone', function () {
    it('should add an entry on POST', function () {
        chai.request(app)
            .post('/entry/create')
            .send({
                entryType: "mustWatch",
                matchDate: "2019-08-08T00:00:00.000Z",
                matchVenue: "Paris",
                matchReferee: "Chris Wagner",
                matchResult: "England 1 Ireland 0",
                matchStadiumType: "Outdoor",
                matchCapacity: "8000",
                matchNotes: "England get Qualified for world cup",
                loggedInUserName: "nidhinpsap@gmail.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Update an entry', function () {
        chai.request(app)
            .put('/entry/:id') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Delete an entry', function () {

        chai.request(app)
            .delete('/entry/:id')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));

    });
    it('Should Get All Users entries', function () {

        chai.request(app)
            .get('/entry-date/:user') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

});
