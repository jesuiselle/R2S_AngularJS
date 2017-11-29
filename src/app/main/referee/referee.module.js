(function () {
    'use strict';

    angular
        .module('app.referee', [
            "datatables",
            'flow',
            'textAngular',
            'xeditable'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider, $translatePartialLoaderProvider, authProvider) {

        // State

        $stateProvider
            .state('app.referee', {
                url: '/referee',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/referee/referee.html',
                        controller: 'RefereeController as vm'
                    }
                },
                resolve: {
                    Referees: function (Employee) {
                        return Employee.getReferred();
                    }
                },
                bodyClass: 'referee'
            })
            .state('app.referee.detail', {
                url: '/referee/:id',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/referee/referee.detail.html',
                        controller: 'RefereeDetailController as vm'
                    }
                },
                resolve: {
                    CurrentJob: function (Job, $stateParams) {
                        return Job.get({id: $stateParams.id});
                    },
                    JobFields: function (Job, $stateParams) {
                        return Job.getFields({id: $stateParams.id});
                    }
                },
                bodyClass: 'referee'
            });

        $translatePartialLoaderProvider.addPart('app/main/referee');

        //add to the navigation bar
        msNavigationServiceProvider.saveItem('referee', {
            title: 'Referees',
            icon: 'icon-tile-four',
            state: 'app.referee',
            /*stateParams: {
             'param1': 'page'
             },*/
            weight: 1,
            hidden: function () {
                return authProvider.$get().role != "Employee";
            }
        });
    }

})();