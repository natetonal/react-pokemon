var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

// If you have multiple stores, put them in separate store files.

// listenables is a reflux property. This tells the store to listen for "Actions".
// create functions in your store with the same name as those listed in Actions.

var PokemonSpeciesStore = Reflux.createStore({
    listenables: [Actions],

    init: function(){
        this.state = {
            species: {}
        };
    },

    getInitialState: function(){
        return this.state;
    },

    // Pulls a specific pokemon from the API by name.
    // A Pokemon object is pokemon as the key and the corresponding json as a value.
    getSpecies: function(name){
        console.log("getSpecies called with: " + name);
        HTTP.get('/pokemon-species/' + name)
        .then(function(species){
            this.state.species = species ? species : null;
            this.fireUpdate(this.state.species, "fireUpdate: fired from getSpecies");
        }.bind(this));
    },

    // Refresh data function
    fireUpdate: function(data, token){
        console.log(token);
        this.trigger('change', data);
    }
});

module.exports = PokemonSpeciesStore;
