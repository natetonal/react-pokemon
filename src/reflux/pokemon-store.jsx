var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

// If you have multiple stores, put them in separate store files.

// listenables is a reflux property. This tells the store to listen for "Actions".
// create functions in your store with the same name as those listed in Actions.

var PokemonStore = Reflux.createStore({
    listenables: [Actions],

    init: function(){
        this.state = {
            pokemon: {}
        };
    },

    getInitialState: function(){
        return this.state;
    },

    // Pulls a specific pokemon from the API by name.
    // A Pokemon object is pokemon as the key and the corresponding json as a value.
    getPokemon: function(name){
        console.log("getPokemon called with: " + name);
        HTTP.get('/pokemon/' + name)
        .then(function(json){
            console.log("JSON received from httpservice.js: " + JSON.stringify(json));
            this.state.pokemon = json ? json : null;
            this.fireUpdate(this.state.pokemon, "fireUpdate: fired from getPokemon");
        }.bind(this));
    },

    // Refresh data function
    fireUpdate: function(data, token){
        console.log(token);
        this.trigger('change', data);
    }
});

module.exports = PokemonStore;
