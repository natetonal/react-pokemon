var React = require('react');
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');

var PokemonStore = require('../reflux/pokemon-store.jsx');
var PokemonListStore = require('../reflux/pokemon-list-store.jsx');
var PokemonSpeciesStore = require('../reflux/pokemon-species-store.jsx');

var PokemonDetailItem = require('./PokemonDetailItem.jsx');
var PokemonListItem = require('./PokemonListItem.jsx');
var PokemonNotFound = require('./PokemonNotFound.jsx');

var PokemonApp = React.createClass({

    mixins: [
            Reflux.listenTo(PokemonStore, 'onPokemonChange'),
            Reflux.listenTo(PokemonListStore, 'onListChange'),
            Reflux.listenTo(PokemonSpeciesStore, 'onSpeciesChange')
    ],

    getInitialState: function() {
        return {
            pokemonList: {loading: null},
            displayList: {loading: null},
            displayLoader: 'block',
            currentView: 'list',
            sortMethod: 'Sort_12',
            pokemon: {},
            species: {},
            newText: ""
        };
    },

    // Immutable
    getDefaultProps: function(){
        return {
            artworkURL: 'http://img.pokemondb.net/artwork/',
            pokemonURL: 'http://pokeapi.co/media/sprites/pokemon/'
        };
    },

    componentWillMount: function(){
        Actions.getPokemonList();
    },

    // Top-level component can add event listeners from the DOM.
    componentDidMount: function(){
        window.addEventListener('scroll', this.handleScroll);
    },

    componentWillUnmount: function(){
        window.removeEventListener('scroll', this.handleScroll);
    },

    // Load more list data when the user scrolls to the bottom of the page.
    // We don't want to load more if the user has started searching for something already.
    handleScroll: function(){
        if (!this.state.newText && this.state.currentView == 'list' && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.setState({displayLoader: 'block'});
            Actions.getPokemonList();
        }
    },

    // A pokemonList is an object with names as keys and data as values (immutable).
    // A displayList is a mirrored, mutable object.
    onListChange: function(event, pokemonList){
        var formattedList = null;
        if(pokemonList){
            formattedList = {};
            var pokemonID = 0;
            for(var item in pokemonList.results){
                var pokemonObj = {};
                pokemonID++;
                pokemonObj.name = pokemonList.results[item].name;
                pokemonObj.id = pokemonID;
                pokemonObj.img = this.props.artworkURL + pokemonList.results[item].name + ".jpg";
                pokemonObj.front = this.props.pokemonURL + pokemonID + ".png";
                pokemonObj.back = this.props.pokemonURL + "back/" + pokemonID + ".png";
                formattedList[pokemonObj.name] = pokemonObj;
            }
        }

        var sortedList = this.sortDisplayList(formattedList, this.state.sortMethod);

        this.setState({
            pokemonList: sortedList,
            displayList: sortedList,
            displayLoader: 'none'
         });
    },

    onPokemonChange: function(event, pokemon){
        if(pokemon){
            console.log("Pokemon changed. setting state.");
            pokemon.mainImg = this.props.artworkURL + pokemon.name + ".jpg";
            this.setState({
                pokemon: pokemon
            });
        } else {
            this.setState({
                pokemon: null
            });
        }
    },

    onSpeciesChange: function(event, species){
        if(species){
            console.log("Species changed. setting state.");
            this.setState({
                species: species,
                currentView: 'detail',
                displayLoader: 'none'
            });
        } else {
            this.setState({
                species: null,
                displayLoader: 'none'
            });
        }
    },
    // This will allow the component to rerender while the user inputs the search.
    onInputChange: function(event){
        var newList = {}
        if(event.target.value){
            for(var key in this.state.pokemonList){
                var charMatch = new RegExp(event.target.value, "i");
                if(this.state.pokemonList[key].name.match(charMatch) || ("" + this.state.pokemonList[key].id).match(charMatch)){
                    newList[key] = this.state.pokemonList[key];
                }
            }
        } else {
            newList = this.state.pokemonList;
        }
        this.setState({
            displayList: newList,
            currentView: 'list',
            newText: event.target.value
        });

    },
    // Posts the newText (so long as there is text) to actions.jsx.
    onClick: function(event){
        if(this.state.newText){
            Actions.getPokemon(this.state.newText);
            Actions.getSpecies(this.state.newText);
            this.setState({
                currentView: 'detail',
                displayLoader: 'block'
            });
        }
    },

    onGettingLucky: function(event){
        this.setState({
            currentView: 'detail',
            displayLoader: 'block'
        })
        var luckyNumber = Math.floor(Math.random() * (720 - 1)) + 1;
        Actions.getPokemon(luckyNumber);
        Actions.getSpecies(luckyNumber);

    },

    // Don't ever forget this - this is how you pass event listeners to children!!!
    clickHandler: function(event){
        console.log("clickHandler called.");
        this.setState({
            displayLoader: 'block'
        });
        event.preventDefault();
        Actions.getPokemon(event.currentTarget.id);
        Actions.getSpecies(event.currentTarget.id);
    },

    sortHandler: function(event){
        event.preventDefault();
        if(this.state.currentView == 'list'){
            var newObj = this.sortDisplayList(this.state.displayList, event.currentTarget.id);
            this.setState({
                displayList: newObj,
                sortMethod: event.currentTarget.id
            });
        }
    },

    sortDisplayList: function(displayList, sortMethod){
        var keys = Object.keys(displayList);

        if(sortMethod == "Sort_12"){
            keys.sort(function(a,b){ return displayList[a].id - displayList[b].id; });
        } else if(sortMethod == "Sort_21"){
            keys.sort(function(a,b){ return displayList[b].id - displayList[a].id; });
        } else if(sortMethod == "Sort_AZ"){
            keys.sort();
        } else if(sortMethod == "Sort_ZA"){
            keys.sort().reverse();
        }

        var newObj = {};
        for(var key in keys){
            newObj[keys[key]] = displayList[keys[key]];
        }

        return newObj;
    },

    render: function() {

        console.log("render called from PokemonApp.");
        // Style Objects

        var headerSpacer = {
            paddingTop: 225,
            paddingLeft: 10,
            paddingRight: 10,
            background: 'white url("http://www.transparenttextures.com/patterns/batthern.png") fixed repeat',
            boxShadow: '1px 1px 10px 10px rgba(0,0,0,0.2)',
        };

        var mainBg = {
            minHeight: 500,
            background: 'white url("http://www.transparenttextures.com/patterns/ag-square.png") fixed repeat'
        };

        var headerStyle = {
            minHeight: 150,
            paddingBottom: 10,
            position: 'fixed',
            color: 'white',
            fontFamily: "'Bangers', cursive",
            zIndex: 10000,
            background: '#40a7ff url("http://www.transparenttextures.com/patterns/brushed-alum.png") repeat',
            boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.5)'
        };

        var titleStyle = {
            fontSize: 36,
            textAlign: 'center'
        };

        var luckyBtnStyle = {
            fontSize: 24,
            width: '100%',
            outline: 'none'
        };

        var btnStyle = {
            height: 40,
            width:  40,
            color: 'white',
            outline: 'none',
        };

        var optionsRow = {
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center'
        };

        var inputStyle = {
            height: 40,
            width: '100%',
            color: 'white',
            fontSize: 18,
            textIndent: 10,
            background: '#3f7a99',
            border: '3px solid #adc8d6',
            borderRadius: 20,
            outline: 'none'
        };

        var loadingBar = {
            display: this.state.displayLoader,
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 10000,
            background: '#3d3d3d url("http://www.transparenttextures.com/patterns/crossword.png") repeat',
            color: 'white',
            height: 100,
            fontSize: 36,
            textAlign: 'center',
            fontFamily: "'Bangers', cursive",
            opacity: 0.9
        };

        // Display state handlers

        var listItems,
            detailItem;

        if(Object.keys(this.state.displayList).length > 0){
            console.log("Displaying list.");
            listItems = Object.keys(this.state.displayList).map(function(pokemon) {
                if(this.state.displayList[pokemon]){
                    return <PokemonListItem
                        key={"pokemonListItem_" + pokemon}
                        pokemon={this.state.displayList[pokemon]}
                        detailClick={this.clickHandler} />;
                }
            }.bind(this));
        } else {
            console.log("List not found.");
            listItems = <PokemonNotFound />
        }

        if(this.state.pokemon && this.state.species){
            console.log("Getting ready to display detail item.");
            detailItem = <PokemonDetailItem
                key={"pokemonDetailItem_" + this.state.pokemon.name}
                pokemon={this.state.pokemon}
                species={this.state.species}
                mainImg={this.state.pokemon.mainImg}
                handleClick={this.clickHandler} />;
        } else {
            console.log("Pokemon not found.");
            detailItem = <PokemonNotFound />
        }

        var displayItem = this.state.currentView == 'list' ? listItems : detailItem;

        return (
            <div style={mainBg}>
                <div className="col-xs-12" style={loadingBar}>
                    <i className="fa fa-cog fa-spin fa-fw"></i>Loading...
                </div>
                <div className="col-xs-12" style={headerStyle}>
                    <h1 style={titleStyle}>Pokemon Research Institute</h1>
                    <div className="row">
                        <div className="col-xs-1 col-sm-3"></div>
                        <div className="col-xs-8 col-sm-5">
                            <input
                            style={inputStyle}
                            placeholder="Search Pokemon"
                            value={this.state.newText}
                            onChange={this.onInputChange} />
                        </div>
                        <div className="col-xs-2 col-sm-1">
                            <button type="button" className="btn btn-primary" style={btnStyle} onClick={this.onClick}><i className="fa fa-lg fa-search" aria-hidden="true">&nbsp;</i></button>
                        </div>
                        <div className="col-xs-1 col-sm-3"></div>
                    </div>
                    <div className="row" style={optionsRow}>
                        <div className="col-xs-0 col-sm-3"></div>
                        <div className="col-xs-9 col-sm-4">
                            <button style={luckyBtnStyle} type="button" className="btn btn-success" onClick={this.onGettingLucky}><i className="fa fa-rocket" aria-hidden="true"></i>&nbsp;&nbsp;Random!</button>
                        </div>
                        <div className="col-xs-3 col-sm-2">
                            <div className="btn-group">
                                <button style={luckyBtnStyle} type="button" className={this.state.currentView == 'list' ? "btn btn-info dropdown-toggle" : "btn btn-info dropdown-toggle disabled"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort&nbsp;&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li id="Sort_12" onClick={this.sortHandler}><a href="#">Numerical (Small-Large)</a></li>
                                    <li id="Sort_21" onClick={this.sortHandler}><a href="#">Numerical (Large-Small)</a></li>
                                    <li id="Sort_AZ" onClick={this.sortHandler}><a href="#">Alphabetical (A-Z)</a></li>
                                    <li id="Sort_ZA" onClick={this.sortHandler}><a href="#">Alphabetical (Z-A)</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-0 col-sm-3"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="row" style={headerSpacer}>
                        {displayItem}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PokemonApp;
