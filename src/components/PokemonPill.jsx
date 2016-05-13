var React = require('react');

var PokemonPill = React.createClass({

    render: function(){

        var pillStyle = {
            display: 'inline',
            borderRadius: 10,
            backgroundColor: this.props.color,
            color: '#fff',
            paddingLeft: 20,
            paddingRight: 20,
            marginLeft: 10
        };

        return(
            <div style={pillStyle}>{this.props.text}</div>
        );
    }
});

module.exports = PokemonPill;
