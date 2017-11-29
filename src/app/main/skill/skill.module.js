(function () {
    'use strict';

    angular
        .module('app.skill', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider, authProvider) {

        // State

        $stateProvider.state('app.skill', {
            url: '/skill',
            views: {
                'content@app': {
                    templateUrl: 'app/main/skill/skill.html',
                    controller: 'SkillController as vm'
                }
            },
            resolve: {
                Skills : function (Skill) {
                    return Skill.query();
                }
            },
            bodyClass: 'skill'
        });


        //add to the navigation bar
        msNavigationServiceProvider.saveItem('skill', {
            title: 'Skill',
            icon: 'icon-tile-four',
            state: 'app.skill',
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