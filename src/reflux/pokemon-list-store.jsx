var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var PokemonListStore = Reflux.createStore({
    listenables: [Actions],

    // Workaround with Reflux to set store state before 1st render. Important!!!
    init: function(){
        this.state = {
            pokemonList: {
                results: []
            },
            nextURL: '/pokemon/?limit=40'
        };
    },

    getInitialState: function(){
        return this.state;
    },

    // Pulls a general list of pokemon from the API.
    // the pokemonList object is structured as follows:
    // pokemonList.results: an array of objects containing a name and url for each pokemon.
    getPokemonList: function(){
        HTTP.get(this.state.nextURL)
        .then(function(json){
            this.state.nextURL = json.next;
            if(json.results){
                for(var index in json.results){
                    this.state.pokemonList.results.push(json.results[index]);
                }
            } else {
                this.state.pokemonList = null;
            }
            this.fireUpdate(this.state.pokemonList, "fireUpdate: fired from getPokemonList");
        }.bind(this));
    },

    // Refresh data function
    fireUpdate: function(data, token){
        console.log(token);
        this.trigger('change', data);
    }
});

module.exports = PokemonListStore;
