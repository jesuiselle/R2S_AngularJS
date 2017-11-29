(function () {
    'use strict';

    var role = "";
    angular
        .module('app.dashboard', ['ui.calendar'])
        .config(config)
        .run(run);


    function run(auth, msNavigationService, $rootScope) {

        $rootScope.$on('loggedin', function (event, args) {
            role = args.role;
        });

        if (auth.isAuthorized()) {
            role = auth.getRole();
            msNavigationService.saveItem('apps', {
                title: 'Dashboard',
                icon: 'icon-tile-four',
                state: 'app.dashboard',
                stateParams: {
                    'role': role
                },
                weight: 0
            });
        }
    }

    /** @ngInject */
    function config($stateProvider) {

        // State

        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'content@app': {
                    templateUrl: function (stateParams) {
                        if (!role) {
                            role = stateParams.role;
                        }

                        console.log("in config", role);
                        return 'app/main/dashboard/dashboard.' + role + '.html';
                    },
                    controller: 'DashboardController as vm'
                }
            },
            params: {"role": null},
            resolve: {},
            bodyClass: 'dashboard-project'
        });

    }

})();