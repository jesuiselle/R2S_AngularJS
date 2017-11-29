(function () {
    'use strict';

    angular
        .module('app.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.register', {
            url: '/register',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.register': {
                    templateUrl: 'app/main/register/register.html',
                    controller: 'RegisterController as vm'
                }
            },
            resolve: {
                Refered: function ($location, Candidate) {
                    if ($location.$$search.hash) {
                        return Candidate.getHashInfo({cin: "refered", entity: $location.$$search.hash});
                    }
                }
            },
            bodyClass: 'register'
        });

    }

})();
