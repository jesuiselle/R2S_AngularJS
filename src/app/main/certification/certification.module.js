(function () {
    'use strict';

    angular
        .module('app.certification', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider, authProvider, $mdDateLocaleProvider) {

        // State

        $stateProvider.state('app.certification', {
            url: '/certification',
            views: {
                'content@app': {
                    templateUrl: 'app/main/certification/certification.html',
                    controller: 'CertificationController as vm'
                }
            },
            resolve: {},
            bodyClass: 'certification'
        });


        //add to the navigation bar
        msNavigationServiceProvider.saveItem('certification', {
            title: 'Certification',
            icon: 'icon-tile-four',
            state: 'app.certification',
            /*stateParams: {
             'param1': 'page'
             },*/
            weight: 1,
            hidden: function () {
                return authProvider.$get().role != "Candidate";
            }
        });

    }

})();