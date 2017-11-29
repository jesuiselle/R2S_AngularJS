(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Skill', SkillFactory);

    /** @ngInject */
    function SkillFactory($resource, API) {
        var params = {id: "@id"};
        var Skill = $resource(API + "/skill/:id", params);
        return Skill;
    }

})(angular);