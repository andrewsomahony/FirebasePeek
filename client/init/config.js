'use strict';

var app = require('./app');

app.config(['$httpProvider', function($httpProvider) {

    function newTransform(data, headers) {
        return data;
    }
    $httpProvider.defaults.transformResponse.push(newTransform);

    $httpProvider.defaults.headers.common['X-Requested-With']
      = 'XMLHttpRequest';
}]);
