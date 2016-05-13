var React = require('react');

var PokemonListItem = React.createClass({

    // image:
    // http://img.pokemondb.net/artwork/{name}.jpg

    render: function() {

        var outerContainerStyle = {
            padding: 30
        };

        var innerContainerStyle = {
            cursor: 'pointer',
            fontFamily: "'Bangers', cursive",
            border: '20px solid rgba(255,255,0,0.5)',
            borderRadius: 40,
            color: 'white',
            background: '#d6c400 url("http://www.transparenttextures.com/patterns/diagmonds-light.png")',
            boxShadow: '3px 3px 6px 2px rgba(0,0,0,0.3), inset 1px 1px 2px 1px rgba(0,0,0,0.3)',
            padding: 20
        };

        var headerTextStyle = {
            textIndent: 10,
            marginTop: -5
        };

        var subheaderTextStyle = {
            marginTop: -12,
            textIndent: 16,
            color: '#3f7a99'
        };

        var imgContainerStyle = {
            background: 'white url("http://www.transparenttextures.com/patterns/brushed-alum.png") repeat',
            boxShadow: '2px 2px 5px 4px rgba(0,0,0,0.5)',
            border: '5px solid #ffb600',
            borderRadius: 5,
            padding: 15
        };

        var mainImgStyle = {
            background: 'white url("' + this.props.pokemon.img + '") no-repeat center center',
            backgroundSize: 'contain',
            borderRadius: 20,
            border: '2px solid #ccc',
            height: 200
        };

        var imgHeaderText = {
            textIndent: 0,
            marginBottom: -1,
            marginLeft: -5,
            color: 'black',
        };

        var spriteFrontStyle = {
            background: '#bbb url("' + this.props.pokemon.front + '") no-repeat center center',
            backgroundSize: 'cover',
            border: '2px solid #333',
            borderRadius: 10,
            height: 50
        };

        var spriteBackStyle = {
            background: '#888 url("' + this.props.pokemon.back + '") no-repeat center center',
            backgroundSize: 'cover',
            border: '2px solid #333',
            borderRadius: 10,
            height: 50
        };

        var pokeBall = {
            position: 'absolute',
            top: -25,
            right: -20,
            height: 50,
            width: 50,
            fontSize: 30,
            zIndex: 5000,
            background: 'white url("img/pokeball.png") no-repeat center center',
            backgroundSize: 'cover',
            border: '5px solid #ffb600',
            borderRadius: '50%',
            boxShadow: '2px -2px 5px 0px rgba(0,0,0,0.5)',
        };

        var numberBall = {
            position: 'absolute',
            bottom: -20,
            left: -20,
            height: 40,
            width: 40,
            fontSize: 15,
            paddingTop: 5,
            zIndex: 5000,
            background: '#333',
            color: 'white',
            border: '5px solid #ffb600',
            borderRadius: '50%',
            textAlign: 'center'
        };

        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" style={outerContainerStyle}>
                <div className="row">
                    <div className="col-xs-12" style={innerContainerStyle} id={this.props.pokemon.name} onClick={this.props.detailClick}>
                        <div className="row">
                            <div className="col-xs-12"><h1 style={headerTextStyle}>{this.props.pokemon.name}</h1></div>
                            <div className="col-xs-12"><h5 style={subheaderTextStyle}>{"Pokemon #" + this.props.pokemon.id}</h5></div>
                            <div className="col-xs-10 col-xs-offset-1" style={imgContainerStyle}>
                            <div style={pokeBall}></div>
                            <div style={numberBall}>{this.props.pokemon.id}</div>
                                <div className="row">
                                    <div className="col-xs-10 col-xs-offset-1" style={mainImgStyle}></div>
                                    <div className="col-xs-4 col-xs-offset-1"><h6 style={imgHeaderText}>Front</h6></div>
                                    <div className="col-xs-4 col-xs-offset-2"><h6 style={imgHeaderText}>Back</h6></div>
                                    <div className="col-xs-4 col-xs-offset-1" style={spriteFrontStyle}></div>
                                    <div className="col-xs-4 col-xs-offset-2" style={spriteBackStyle}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PokemonListItem;
