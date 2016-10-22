
module.exports = function(seed){

  var functions = {};

  functions.heroes = function (req, res) {

    res.json(seed);
  }

  return functions
}