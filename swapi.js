(function (window, undefined) {
    function makeRequest(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest(),
                baseUrl = 'http://swapi.co/api/';


            xhr.open('GET', (url.indexOf(baseUrl) > -1) ? url : baseUrl + url, true);

            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.onload = function () {
                var response = xhr.response;

                if (xhr.status > 399) {
                    // Error
                    return reject(xhr);
                }

                ['nextPage', 'previousPage'].forEach(function (value) {
                    response[value] = (function () {
                        return function () {
                            var url = response[(value.indexOf('next') > -1) ? 'next' : 'previous'];
                            if (url) {
                                return makeRequest(url);
                            }

                            return Promise.resolve(null);
                        };
                    })();
                });

                return resolve(response);
            };

            xhr.onerror = function () {
                return reject(xhr);
            };

            xhr.send();
        });
    }


    var swapi = {
        //get: function (url) {
            //return makeRequest(url, callback);
        //},
        getPerson: function (id) {
            return makeRequest('people' + (id ? '/' + id + '/' : '/'));
        },
        getStarship: function (id) {
            return makeRequest('starship/' + (id ? '/' + id + '/' : '/'));
        },
        getVehicle: function (id) {
            return makeRequest('vehicles/' + (id ? '/' + id + '/' : '/'));
        },
        getFilm: function (id) {
            return makeRequest('films/' + (id ? '/' + id + '/' : '/'));
        },
        getSpecies: function (id) {
            return makeRequest('species/' + (id ? '/' + id + '/' : '/'));
        }
    };

    window.swapi = swapi;
})(window);
