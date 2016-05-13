var Reflux = require('reflux');

// Actions for your application, not necessarily tied to an HTTP request.

// When these strings are called, they're called as Functions.
var Actions = Reflux.createActions([
    'getPokemonList',
    'getPokemon',
    'getSpecies',
]);

module.exports = Actions;
