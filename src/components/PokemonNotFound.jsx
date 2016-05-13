var React = require('react');

var PokemonNotFound = React.createClass({

    render: function(){

        var containerStyle = {
            fontFamily: "'Bangers', cursive",
            borderRadius: 40
        };

        return(
            <div className="col-xs-12" style={containerStyle}>
                <div className="alert alert-danger" role="alert">
                    <h1>Pokemon Not Found!</h1>
                    <hr></hr>
                    <h4>Pro tip: Try searching for something that exists.</h4>
                </div>
            </div>
        );
    }
});

module.exports = PokemonNotFound;
