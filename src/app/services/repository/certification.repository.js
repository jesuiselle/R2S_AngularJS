(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Certification', CertificationFactory);

    /** @ngInject */
    function CertificationFactory($resource, API) {
        var params = {id: "@id"};
        var customMethods = {
            'update': {
                method: "PUT",
                params: {id: ''}
            }
        };
        var Certification = $resource(API + "/certification/:id", params, customMethods);
        return Certification;
    }

})(angular);