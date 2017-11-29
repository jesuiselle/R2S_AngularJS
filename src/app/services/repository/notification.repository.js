(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Notification', NotificationFactory);

    /** @ngInject */
    function NotificationFactory($resource, API) {
        var params = {id: "@id"};
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Notification = $resource(API + "/notification/:id", params, customMethods);
        return Notification;
    }

})(angular);