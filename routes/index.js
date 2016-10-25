
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

    res.json(result);
  };

  return functions
};