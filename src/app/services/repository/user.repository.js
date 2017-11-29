(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('User', UserFactory);

    /** @ngInject */
    function UserFactory($resource, API) {
        var params = {cin: "@cin"};
        var customMethods = {
            'update': {
                method: "PUT"
            },
            'getReferred': {
                isArray: true,
                method: "GET",
                params: {
                    cin: "referred"
                }
            }
        };
        var User = $resource(API + "/users/:cin", params, customMethods);
        return User;
    }

})(angular);