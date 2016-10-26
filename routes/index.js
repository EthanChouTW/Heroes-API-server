var request = require('request');



  let functions = {};

  functions.heroesList = (req, res) => {

    getHeroeslist().then(heroesList => {

      checkAuthorization(heroesList, req, res);

    });


  };

  functions.singleHero = (req, res) => {

    let heroId = req.params["heroId"];

    getSingleHero(heroId).then(heroesList => {

      checkAuthorization(heroesList, req, res);

    });


  };

module.exports = functions;

   function checkAuthorization(result, req, res){
    // collect promises
     let promises;
        if (req.isAuthenticate) {

          if (typeof req.params["heroId"] === 'undefined') {//list all heroes
            // add profile for every hero with secret data
             promises = result.map(function(element){

                    const heroId = element['id'];
                    console.log("hello");
                    return  getHeroesProfile(heroId)
                                .then(function(profile){

                                      element["profile"] = profile;
                                      console.log(element);
                                      return element;
                                })
                                .catch(function(errorMessage){
                                      console.log("error" + errorMessage);
                                      return element;
                                });

            });

          } else {// single heroes
            promises = [getHeroesProfile(req.params["heroId"]).then((profile) => {
              result["profile"] = profile

              return result;
            }).catch((error) => {
              return result;
            })];

          }

             // call the promise there, whether it single or list
           Promise.all(promises)
           .then(results => {

              res.json(result);
          })
           .catch(err => {// if error, send public data for user

            res.json(result);
          });

       } else {// is not authenticate
          res.json(result);
       }


   }

   function getHeroesProfile(heroId) {
    return new Promise((resolve, reject) => {
      console.log(heroId);
      request.get(
        `http://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,{},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("dddd");
            resolve(JSON.parse(body));
          } else {

            reject(error);
          }
        }
      );
    });
  }

  function getHeroeslist() {
    return new Promise((resolve, reject) => {

      request.get(
        `http://hahow-recruit.herokuapp.com/heroes`,{},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {

            resolve(JSON.parse(body));
          } else {

            reject(error);
          }
        }
        );
    });
  };

  function getSingleHero(heroId) {
    return new Promise((resolve, reject) => {

      request.get(
        `http://hahow-recruit.herokuapp.com/heroes/${heroId}`,{},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {

            resolve(JSON.parse(body));
          } else {

            reject(error);
          }
        }
        );
    });
  }