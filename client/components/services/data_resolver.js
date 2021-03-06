'use strict';

var registerService = require('services/register');

var utils = require('utils');

var name = 'services.data_resolver';

registerService('factory', name, [
    require('services/parallel_promise'),
    require('services/serial_promise'),
    require('services/progress'),
    require('services/promise'),

    function(ParallelPromise, SerialPromise, UserService, WorkoutBuilderService,
    QuestionService, ProgressService, Promise) {
        function DataResolverService(state, params) {
            var promiseFnArray = [];

            function AddServiceResolverFunction(serviceObject) {
                var dataResolverFunctionName = "dataResolverFn";
                if (true ===
                  utils
                  .objectHasFunction(serviceObject, dataResolverFunctionName)) {
                    promiseFnArray
                    .push(serviceObject[dataResolverFunctionName]);
                }
            }

            return ParallelPromise(promiseFnArray.map(function(fn, index) {
                return function(existingData, index, forNotify) {
                    if (true === forNotify) {
                        return ProgressService(0, 1);
                    } else {
                        return Promise.when(fn(state, params));
                    }
                }
            }));
        }

        return DataResolverService;
    }
]);

module.exports = name;
