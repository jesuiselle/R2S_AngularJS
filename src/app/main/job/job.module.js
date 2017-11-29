(function () {
    'use strict';

    angular
        .module('app.job', [
            "datatables",
            'flow',
            'textAngular',
            'xeditable'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider, $translatePartialLoaderProvider, authProvider) {

        // State

        $stateProvider
            .state('app.job', {
                url: '/job',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/job/job.html',
                        controller: 'JobController as vm'
                    }
                },
                resolve: {
                    Jobs: function (Job) {
                        return Job.query();
                    }
                },
                bodyClass: 'job'
            })
            .state('app.job.detail', {
                url: '/job/:id',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/job/job.detail.html',
                        controller: 'JobDetailController as vm'
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
                bodyClass: 'job'
            });

        $translatePartialLoaderProvider.addPart('app/main/job');

        //add to the navigation bar
        msNavigationServiceProvider.saveItem('job', {
            title: 'Jobs',
            icon: 'icon-tile-four',
            state: 'app.job',
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