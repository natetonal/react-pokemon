var Fetch = require('whatwg-fetch');
var baseUrl = 'http://pokeapi.co/api/v2'; // live IP address of service.

var service = {
    // REST design pattern (?)
    get: function(url){

        function handleErrors(response){
            if (!response.ok){ throw Error(response.statusText); }
            return response;
        }

        console.log("making get request");
        return fetch(this.checkURL(url))
        // fetch immediately returns a promise - function called at a later point in time (async).
        // "response" holds headers, status code, json, etc...
        .then(handleErrors)
        .then(function(response) {
            console.log("get request successful!");
            return response.json(); //
        })
        .catch(function(error) {
            console.log("get request threw an error.");
            return null;
        });
    },

    post: function(url, ingredient){
        return fetch(this.checkURL(url), {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(ingredient)
        }).then(function(response){
            console.log("post successful!");
            return response;
        });
    },

    // Since the Pokemon API returns full addresses, this checks whether a URL stem was passed in or a full URL and returns the correct format.
    checkURL: function(url){
        var fullUrl = url;
        var urlReg = new RegExp(baseUrl, "i");
        if(!url.match(urlReg)) { fullUrl = baseUrl + url; }
        return fullUrl;
    }
};

module.exports = service;
