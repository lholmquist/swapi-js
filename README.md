A Javascript helper library for http://swapi.co/ - the Star Wars API


## Requirements

* love of Star Wars


## Installation

    bower install swapi-js


## Usage

    swapi.getPerson(1).then(function (result) {
        console.log(result);
    });


There is a general `get` method that takes a `url`.  So this is also possible:

    swapi.get('http://swapi.co/api/people/?page=2').then(function (result) {
        console.log(result);
    });

When you call a "Base URL", like http://swapi.co/api/people/, it will include a `next` and `previous` parameter.  These will be the link to the next/previous page of data.

There are helper methods to get results from the next/previous page called `nextPage` and `previousPage`.  Each of these returns a Promise

Here is an example

    swapi.get('http://swapi.co/api/people/').then(function (result) {
        console.log(result);
        return result.nextPage();
    }).then(function (result) {
        console.log(result);
        return result.previousPage();
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });


### Note

This API tries to follow the API for the Python helper lib here: https://github.com/phalt/swapi-python

For documentation on the Star Wars API, check out their docs:  http://swapi.co/documentation
