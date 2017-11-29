(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Job', JobFactory);

    /** @ngInject */
    function JobFactory($resource, API) {
        var params = {id: "@id"};
        var customMethods = {
            'update': {
                method: "PUT"
            },
            'getFields': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "fields"
                }
            },
            'generateReferLink': {
                method: "GET",
                params: {
                    entity: "generate-link"
                }
            }
        };
        var Job = $resource(API + "/job/:id/:entity/:employeeid", params, customMethods);
        return Job;
    }

})(angular);