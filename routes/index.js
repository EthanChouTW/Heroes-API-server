var request = require('request');

module.exports = function(seed){

  let functions = {};

  functions.heroes = function (req, res) {

    console.log(req.isAuthenticate);
    let heroId = req.params["heroId"];
    let result; //can be an array(all heroes list) or dictionary(only one hero)

    if (typeof heroId === 'undefined') { //no heroId, show all heroes
      result = seed;
    } else {
          result = seed.filter((element) =>{ // get hero with da heroId
            return element["id"] == heroId
          });
        };

        let promises = []
        if (req.isAuthenticate) {


         promises = result.map(function(element){

                const heroId = element['id'];

                return  getHeroesProfile(heroId)
                            .then(function(profile){

                                  element["profile"] = JSON.parse(profile);
                                  console.log(element);
                                  return element;
                            })
                            .catch(function(errorMessage){
                                  console.log("error" + errorMessage);
                                  return element;
                            });

        });
       }

       Promise.all(promises)
       .then(results => {
          res.json(result);
      })
       .catch(e => {

        res.json({status: e});
      })

     };

     return functions
   };

   function getHeroesProfile(heroId) {
    return new Promise(function(resolve, reject){

      request.get(
        `http://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,{},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {

            resolve(body);
          } else {

            reject(body);
          }
        }
        );
    });
  }

  function getHeroeslist(heroId) {
    return new Promise(function(resolve, reject){

      request.get(
        `http://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,{},
        function (error, response, body) {
          if (!error && response.statusCode == 200) {

            resolve(body);
          } else {

            reject(body);
          }
        }
        );
    });
  }