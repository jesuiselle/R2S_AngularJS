(function () {
    'use strict';

    angular
        .module('app.experience', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider, authProvider) {

        // State

        $stateProvider.state('app.experience', {
            url: '/experience',
            views: {
                'content@app': {
                    templateUrl: 'app/main/experience/experience.html',
                    controller: 'ExperienceController as vm'
                }
            },
            resolve: {},
            bodyClass: 'experience'
        });


        //add to the navigation bar
        msNavigationServiceProvider.saveItem('experience', {
            title: 'Experience',
            icon: 'icon-tile-four',
            state: 'app.experience',
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