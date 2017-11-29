(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Experience', ExperienceFactory);

    /** @ngInject */
    function ExperienceFactory($resource, API) {
        var params = {id: "@id"};
        var customMethods = {
            'update': {
                method: "PUT",
                params: {id: ''}
            }
        };
        var Experience = $resource(API + "/experience/:id", params, customMethods);
        return Experience;
    }

})(angular);