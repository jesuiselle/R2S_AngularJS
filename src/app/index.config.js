(function () {
    'use strict';

    angular
        .module('fuse')
        .factory('authInterceptor', authInterceptor)
        .config(config);

    /** @ngInject */
    function config($translateProvider, $httpProvider) {
        // Put your common app configurations here
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('authInterceptor');

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
    }

    /** @ngInject */
    function authInterceptor($injector) {
        return {
            // Authorization Checker
            request: function (config) {
                var stateService = $injector.get('$state');
                var authService = $injector.get('auth');
                var API = $injector.get('API');

                if (config.url.includes("/login/")
                    && config.url.startsWith(API)
                    && !authService.isAuthorized()
                ) {
                    stateService.go('app.login');
                }
                return config;
            }
        }
    }

})();