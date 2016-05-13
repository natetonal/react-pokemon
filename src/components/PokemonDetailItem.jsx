var React = require('react');
var PokemonPill = require('./PokemonPill.jsx');

var PokemonDetailItem = React.createClass({

    getDefaultProps: function(){
        return {
            typeColors: {
                normal: '#999',
                fighting: '#990000',
                flying: '#33ccff',
                poison: '#00cc00',
                ground: '#663300',
                rock: '#585858',
                bug: '#333',
                ghost: '#000033',
                steel: '#989898',
                fire: '#ff9900',
                water: '#0099ff',
                grass: '#66cc33',
                electric: '#99ffff',
                psychic: '#6600cc',
                ice: '#33ffff',
                dragon: '#ff3366',
                dark: 'black',
                fairy: '#ffccff',
                unknown: '#c0c0c0',
                shadow: '#282828'
            }
        };
    },

    render: function(){

        console.log("render called from PokemonDetailItem.");
        var alertStyle = {
            fontFamily: "'Bangers', cursive",
            borderRadius: 40
        };

        var displayStyle = {
            fontFamily: "'Bangers', cursive",
            color: '#333'
        };

        var pageControls = {
            fontSize: 24
        };

        var hiddenArrow = {
            display: 'none'
        };

        var prevArrow = {
            textAlign: 'left',
            cursor: 'pointer'
        };

        var midArrowSpace = {
            textAlign: 'center'
        };

        var nextArrow = {
            textAlign: 'right',
            cursor: 'pointer'
        };

        var numberStyle = {
            background: '#333',
            fontSize: 36,
            padding: 20,
            color: 'white',
            border: '10px solid #ffb600',
            borderRadius: 15,
            boxShadow: '2px 2px 5px 4px rgba(0,0,0,0.5)'
        };

        var textSpacer = {
            paddingLeft: 20
        };

        var titleStyle = {
            textAlign: 'center',
            fontSize: 72
        };

        var mainContentStyle = {
            border: '20px solid rgba(255,255,0,0.5)',
            borderRadius: 40,
            color: 'white',
            background: '#d6c400 url("http://www.transparenttextures.com/patterns/diagmonds-light.png")',
            boxShadow: '3px 3px 6px 2px rgba(0,0,0,0.3), inset 1px 1px 2px 1px rgba(0,0,0,0.3)',
            padding: 20,
            marginTop: -10
        };

        var mainImgStyle = {
            height: 300,
            marginTop: 10,
            background: 'white url("' + this.props.mainImg + '") no-repeat center center',
            backgroundSize: 'contain',
            border: '5px solid #333',
            borderRadius: 10
        };

        var mainStatsStyle = {
            minHeight: 300,
            marginTop: 10,
            padding: 15,
            background: '#8c8225 url("http://www.transparenttextures.com/patterns/cross-scratches.png")',
            borderRadius: 10
        };

        var statText = {
            color: "#333",
            marginLeft: 10
        };

        var statSpacing = {
            marginTop: -5,
            marginBottom: -5
        };

        var descriptionStyle = {
            marginTop: 15,
            marginBottom: 15,
            padding: 10,
            background: '#42b7cc url("http://www.transparenttextures.com/patterns/cross-scratches.png")',
            borderRadius: 10
        };

        var attributesStyle = {
            marginTop: 15,
            marginBottom: 15,
            padding: 10,
            background: '#fffbf4 url("http://www.transparenttextures.com/patterns/cross-scratches.png")',
            borderRadius: 10
        };

        if(this.props.pokemon.name && (this.props.species.name == this.props.pokemon.name)){

            var pillStyle = {
                borderRadius: 10,
                backgroundColor: this.props.species.color.name,
                color: '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 10
            };

            var typePillStyle = {
                borderRadius: 10,
                backgroundColor: this.props.species.color.name,
                color: '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 10
            };

            var flavorTexts = this.props.species.flavor_text_entries.map(function(item){
                return item.language.name == "en" ? item.flavor_text : "";
            }.bind(this));

            var createBlurb = [];
            for(var index in flavorTexts){
                if(!createBlurb.includes(flavorTexts[index])){
                    createBlurb.push(flavorTexts[index]);
                }
            };

            var typeItems = this.props.pokemon.types.map(function(item){
                return <PokemonPill
                            key={"type_" + item.type.name}
                            color={this.props.typeColors[item.type.name]}
                            text={item.type.name} />;
            }.bind(this));

            var isIt = function(thing){
                return thing ? thing.name : "N/A";
            };

            return(
                <div className="col-xs-12" style={displayStyle}>
                    <div className="row" style={pageControls}>
                        <div className="col-xs-4" id={this.props.pokemon.id - 1} style={this.props.pokemon.id > 1 ? prevArrow : hiddenArrow} onClick={this.props.handleClick}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i><span style={textSpacer}></span>#{this.props.pokemon.id - 1}
                        </div>
                        <div className="col-xs-4" style={midArrowSpace}><span style={numberStyle}>#{this.props.pokemon.id}</span></div>
                        <div className="col-xs-4" id={this.props.pokemon.id + 1} style={nextArrow} onClick={this.props.handleClick}>
                            #{this.props.pokemon.id + 1}<span style={textSpacer}></span><i className="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="row" style={mainContentStyle}>
                        <div className="col-xs-12"><h1 style={titleStyle}>{this.props.pokemon.name}</h1></div>
                        <div className="col-xs-12 col-sm-4" style={mainImgStyle}></div>
                        <div className="col-xs-12 col-sm-1"></div>
                        <div className="col-xs-12 col-sm-7" style={mainStatsStyle}>
                            <div className="row">
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Height: <span style={statText}>{this.props.pokemon.height / 10}m</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Weight: <span style={statText}>{this.props.pokemon.weight / 10}kg</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Category: <span style={statText}>{this.props.species.genera[0].genus}</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Color: <span style={pillStyle}>{isIt(this.props.species.color)}</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Shape: <span style={statText}>{isIt(this.props.species.shape)}</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Habitat: <span style={statText}>{isIt(this.props.species.habitat)}</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Growth Rate: <span style={statText}>{isIt(this.props.species.growth_rate)}</span></h3></div>
                                <div className="col-xs-12 col-md-6" style={statSpacing}><h3>Capture Rate: <span style={statText}>{this.props.species.capture_rate}</span></h3></div>
                                <div className="col-xs-12" style={statSpacing}><h3>Types: {typeItems}</h3></div>
                            </div>
                        </div>
                        <div className="col-xs-12" style={descriptionStyle}>
                            <h2 style={{fontSize: 36}}>Description</h2>
                            <hr />
                            <p style={{fontSize: 22}}>{createBlurb[0] + ' ' + createBlurb[1]}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="col-xs-12" style={alertStyle}>
                    <div className="alert alert-info" role="alert">
                        <h1><i className="fa fa-refresh fa-spin fa-fw "></i>&nbsp;&nbsp;Pulling info...</h1>
                        <hr></hr>
                        <h4>Your patience is appreciated while we contact the mothership.</h4>
                    </div>
                </div>
            );
        }
    }
});

module.exports = PokemonDetailItem;
